"use client";

import { useState } from "react";
import {
  Connection,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const USDC_DECIMALS = 6;
const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=c5ac2832-5f23-470e-a61f-d98b762612ba";

type Status = "idle" | "connecting" | "building" | "signing" | "verifying" | "success" | "error";

const LABELS: Record<Status, string> = {
  idle: "用 Solana 付款解锁  ·  1 USDC",
  connecting: "连接钱包中…",
  building: "准备交易中…",
  signing: "等待 Phantom 签名…",
  verifying: "验证并结算中…",
  success: "🎉 解锁成功！",
  error: "重试支付",
};

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: PublicKey;
  connect(): Promise<{ publicKey: PublicKey }>;
  signTransaction(tx: VersionedTransaction): Promise<VersionedTransaction>;
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export default function PayWithSolana() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handlePay() {
    setErrorMsg("");

    const phantom = (window as unknown as { solana?: PhantomProvider }).solana;
    if (!phantom?.isPhantom) {
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      setStatus("connecting");
      const { publicKey } = await phantom.connect();

      setStatus("building");
      const probeRes = await fetch("/api/unlock", { method: "POST" });

      if (probeRes.ok) {
        setStatus("success");
        setTimeout(() => window.location.reload(), 1000);
        return;
      }

      if (probeRes.status === 401) {
        window.location.href = "/login";
        return;
      }

      const reqRaw = probeRes.headers.get("PAYMENT-REQUIRED");
      if (!reqRaw) {
        const e = await probeRes.json() as { error?: string };
        throw new Error(e.error ?? "请求失败");
      }

      const paymentRequired = JSON.parse(atob(reqRaw)) as {
        x402Version: number;
        accepts: Array<{
          scheme: string; network: string; amount: string; asset: string;
          payTo: string; maxTimeoutSeconds: number; resource: string;
          mimeType: string; extra?: { feePayer?: string };
        }>;
      };

      const accepted = paymentRequired.accepts[0];
      if (!accepted) throw new Error("支付要求格式无效");
      const feePayer = accepted.extra?.feePayer;
      if (!feePayer) throw new Error("未找到 facilitator feePayer");

      const connection = new Connection(RPC_URL, "confirmed");
      const payTo = new PublicKey(accepted.payTo);
      const amount = BigInt(accepted.amount);

      const sourceAta = getAssociatedTokenAddressSync(USDC_MINT, publicKey, false, TOKEN_PROGRAM_ID);
      const destAta = getAssociatedTokenAddressSync(USDC_MINT, payTo, false, TOKEN_PROGRAM_ID);

      const sourceInfo = await connection.getAccountInfo(sourceAta);
      if (!sourceInfo) throw new Error("未找到 USDC 账户，请确认钱包中有 USDC");

      const { blockhash } = await connection.getLatestBlockhash("confirmed");

      const message = new TransactionMessage({
        payerKey: new PublicKey(feePayer),
        recentBlockhash: blockhash,
        instructions: [
          ComputeBudgetProgram.setComputeUnitLimit({ units: 20_000 }),
          ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }),
          createTransferCheckedInstruction(
            sourceAta, USDC_MINT, destAta, publicKey, amount, USDC_DECIMALS, [], TOKEN_PROGRAM_ID,
          ),
        ],
      }).compileToV0Message();

      const tx = new VersionedTransaction(message);

      setStatus("signing");
      const signedTx = await phantom.signTransaction(tx);

      const txBytes = signedTx.serialize();
      let txBinary = "";
      txBytes.forEach((b) => (txBinary += String.fromCharCode(b)));
      const txBase64 = btoa(txBinary);

      const paymentSignatureHeader = toBase64(JSON.stringify({
        x402Version: 2,
        resource: { url: accepted.resource, description: "", mimeType: accepted.mimeType ?? "application/json" },
        accepted,
        payload: { transaction: txBase64 },
      }));

      setStatus("verifying");
      const finalRes = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json", "PAYMENT-SIGNATURE": paymentSignatureHeader },
      });

      if (!finalRes.ok) {
        const e = await finalRes.json() as { error?: string };
        throw new Error(e.error ?? "验证失败");
      }

      setStatus("success");
      setTimeout(() => window.location.reload(), 1500);

    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "支付失败，请重试");
    }
  }

  const busy = !["idle", "error"].includes(status);
  const done = status === "success";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button
        onClick={handlePay}
        disabled={busy || done}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          gap: "10px", padding: "15px 32px",
          background: done ? "rgba(38,200,100,0.18)" : "linear-gradient(135deg, #9945FF 0%, #14F195 100%)",
          border: done ? "1px solid rgba(38,200,100,0.35)" : "none",
          borderRadius: "14px", color: "white",
          fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 600,
          cursor: busy || done ? "default" : "pointer",
          opacity: busy ? 0.75 : 1,
          boxShadow: done ? "none" : "0 4px 24px rgba(153,69,255,0.4)",
          minWidth: "280px", transition: "opacity 0.2s",
        }}
      >
        {busy && (
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            style={{ flexShrink: 0, animation: "x402spin 0.9s linear infinite" }}>
            <circle cx="7.5" cy="7.5" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <path d="M7.5 1.5a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {!busy && !done && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="7.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="3.5" fill="white" fillOpacity="0.85" />
          </svg>
        )}
        {LABELS[status]}
      </button>

      {errorMsg && (
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#ff6b6b", margin: 0, maxWidth: "360px", lineHeight: 1.5, wordBreak: "break-all" }}>
          {errorMsg}
        </p>
      )}

      <style>{`@keyframes x402spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
