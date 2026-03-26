import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const runtime = "edge";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const PRICE_USDC = 145;
const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=c5ac2832-5f23-470e-a61f-d98b762612ba";

// Check recent USDC transfers to payTo address, within last N seconds
async function findRecentPayment(
  payTo: string,
  memoPrefix: string,
  windowSec = 600,
): Promise<boolean> {
  const connection = new Connection(RPC_URL, "confirmed");
  const payToKey = new PublicKey(payTo);
  const destAta = getAssociatedTokenAddressSync(USDC_MINT, payToKey, false, TOKEN_PROGRAM_ID);

  // Get recent signatures for the destination token account
  const sigs = await connection.getSignaturesForAddress(destAta, { limit: 20 });
  const cutoff = Date.now() / 1000 - windowSec;

  for (const sigInfo of sigs) {
    if (!sigInfo.blockTime || sigInfo.blockTime < cutoff) continue;
    if (sigInfo.err) continue;

    const tx = await connection.getParsedTransaction(sigInfo.signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
    if (!tx) continue;

    // Check memo matches our user prefix
    const hasMemo = tx.transaction.message.instructions.some((ix) => {
      const parsed = ix as { program?: string; parsed?: string };
      return parsed.program === "spl-memo" && typeof parsed.parsed === "string" && parsed.parsed.startsWith(memoPrefix);
    });
    if (!hasMemo) continue;

    // Check transfer amount
    const meta = tx.meta;
    if (!meta?.postTokenBalances || !meta?.preTokenBalances) continue;

    const destIdx = meta.postTokenBalances.findIndex(
      (b) => b.mint === USDC_MINT.toBase58() && b.owner === payTo,
    );
    if (destIdx === -1) continue;

    const pre = meta.preTokenBalances.find((b) => b.accountIndex === meta.postTokenBalances![destIdx].accountIndex);
    const post = meta.postTokenBalances[destIdx];
    const preAmount = pre ? Number(pre.uiTokenAmount.uiAmount ?? 0) : 0;
    const postAmount = Number(post.uiTokenAmount.uiAmount ?? 0);
    const received = postAmount - preAmount;

    if (received >= PRICE_USDC - 0.01) {
      return true;
    }
  }

  return false;
}

export async function GET(req: NextRequest) {
  const { env } = getRequestContext();

  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return NextResponse.json({ error: "无效会话" }, { status: 401 });

  const user = await getUserById(env.DB, payload.sub);
  if (!user) return NextResponse.json({ error: "用户不存在" }, { status: 404 });

  // Already unlocked
  const now = new Date().toISOString();
  const active = user.is_unlocked && (!user.unlocked_until || user.unlocked_until > now);
  if (active) return NextResponse.json({ paid: true });

  const payTo = env.SOLANA_PAY_TO as string;
  const memoPrefix = `clawfirm:${payload.sub}`;

  // Look for a matching on-chain payment in the last 10 minutes
  let found = false;
  try {
    found = await findRecentPayment(payTo, memoPrefix, 600);
  } catch {
    // RPC error — return pending, client will retry
    return NextResponse.json({ paid: false, error: "rpc" });
  }

  if (!found) return NextResponse.json({ paid: false });

  // Unlock the user
  await env.DB.prepare(
    "UPDATE users SET is_unlocked = 1, unlocked_until = datetime('now', '+1 month'), unlock_code = NULL WHERE id = ?"
  ).bind(payload.sub).run();

  return NextResponse.json({ paid: true });
}
