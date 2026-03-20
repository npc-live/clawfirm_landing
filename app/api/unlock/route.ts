import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const PRICE_USDC_ATOMIC = "1000000"; // 1 USDC (1_000_000 micro-USDC) — test price
const NETWORK = "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"; // Solana mainnet CAIP-2
const FACILITATOR = "https://facilitator.payai.network";
const FACILITATOR_FEE_PAYER = "2wKupLR9q6wXYppw8Gr2NvWxKBUqm4PPJKkQfoxHDBg4";

const MAX_TIMEOUT_SECONDS = 300;

function strToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function toBase64(obj: unknown): string {
  return strToBase64(JSON.stringify(obj));
}

function buildPaymentRequired(payTo: string, resource: string) {
  return toBase64({
    x402Version: 2,
    accepts: [
      {
        scheme: "exact",
        network: NETWORK,
        amount: PRICE_USDC_ATOMIC,
        asset: USDC_MINT,
        payTo,
        maxTimeoutSeconds: MAX_TIMEOUT_SECONDS,
        resource,
        mimeType: "application/json",
        extra: { feePayer: FACILITATOR_FEE_PAYER },
      },
    ],
    extensions: {},
  });
}

async function callFacilitator(
  endpoint: "verify" | "settle",
  paymentPayload: unknown,
  paymentRequirements: unknown,
  keyId: string,
  keySecret: string,
): Promise<{ ok: boolean; body: unknown }> {
  const authHeader = "Basic " + strToBase64(`${keyId}:${keySecret}`);

  const res = await fetch(`${FACILITATOR}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({ paymentPayload, paymentRequirements }),
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    body = { _raw: text };
  }
  return { ok: res.ok, body };
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();

  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return NextResponse.json({ error: "无效会话" }, { status: 401 });

  const user = await getUserById(env.DB, payload.sub);
  if (!user) return NextResponse.json({ error: "用户不存在" }, { status: 404 });

  // Already unlocked and not expired
  const active = user.is_unlocked && (!user.unlocked_until || user.unlocked_until > new Date().toISOString());
  if (active) return NextResponse.json({ ok: true });


  const resource = new URL(req.url).origin + "/api/unlock";
  const paymentRequirements = {
    scheme: "exact",
    network: NETWORK,
    amount: PRICE_USDC_ATOMIC,
    asset: USDC_MINT,
    payTo: env.SOLANA_PAY_TO,
    maxTimeoutSeconds: MAX_TIMEOUT_SECONDS,
    resource,
    mimeType: "application/json",
    extra: { feePayer: FACILITATOR_FEE_PAYER },
  };

  // No payment header → return 402
  const sigHeader = req.headers.get("PAYMENT-SIGNATURE");
  if (!sigHeader) {
    return new NextResponse(JSON.stringify({ error: "Payment required" }), {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "PAYMENT-REQUIRED": buildPaymentRequired(env.SOLANA_PAY_TO, resource),
        "Access-Control-Expose-Headers": "PAYMENT-REQUIRED",
      },
    });
  }

  // Decode and parse payment payload (UTF-8 base64)
  let paymentPayload: unknown;
  try {
    const decoded = new TextDecoder().decode(
      Uint8Array.from(atob(sigHeader), (c) => c.charCodeAt(0))
    );
    paymentPayload = JSON.parse(decoded);
  } catch {
    return NextResponse.json({ error: "无效的支付签名格式" }, { status: 402 });
  }

  // 1. Verify via PayAI facilitator
  const verifyResult = await callFacilitator(
    "verify",
    paymentPayload,
    paymentRequirements,
    env.PAYAI_KEY_ID,
    env.PAYAI_KEY_SECRET,
  );

  const verifyBody = verifyResult.body as { isValid?: boolean; invalidReason?: string; _raw?: string };

  if (!verifyBody.isValid) {
    const reason = verifyBody.invalidReason ?? verifyBody._raw ?? "未知错误";
    return NextResponse.json(
      { error: "支付验证失败: " + reason },
      { status: 402 },
    );
  }

  // 2. Settle via PayAI facilitator
  const settleResult = await callFacilitator(
    "settle",
    paymentPayload,
    paymentRequirements,
    env.PAYAI_KEY_ID,
    env.PAYAI_KEY_SECRET,
  );

  const settleBody = settleResult.body as { success?: boolean; errorReason?: string; transaction?: string; _raw?: string };

  if (!settleBody.success) {
    const reason = settleBody.errorReason ?? settleBody._raw ?? "未知错误";
    return NextResponse.json(
      { error: "支付结算失败: " + reason },
      { status: 402 },
    );
  }

  // 3. Unlock for 1 month
  await env.DB.prepare(
    "UPDATE users SET is_unlocked = 1, unlocked_until = datetime('now', '+1 month'), unlock_code = NULL WHERE id = ?"
  ).bind(payload.sub).run();

  return NextResponse.json({ ok: true, txHash: settleBody.transaction });
}
