"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const AMOUNT = 145;
const POLL_INTERVAL = 5000; // 5 s

interface Props {
  payTo: string;
  userId: string;
}

export default function PayWithQR({ payTo, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [status, setStatus] = useState<"waiting" | "success" | "error">("waiting");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Build Solana Pay URL
  const memo = encodeURIComponent(`clawfirm:${userId}`);
  const label = encodeURIComponent("ClawFirm");
  const message = encodeURIComponent("解锁 ClawFirm 专属 Skills");
  const solanaPayUrl = `solana:${payTo}?spl-token=${USDC_MINT}&amount=${AMOUNT}&memo=${memo}&label=${label}&message=${message}`;

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(solanaPayUrl, {
      width: 240,
      margin: 2,
      color: { dark: "#1a1a1a", light: "#f0ede5" },
    }).then(setQrDataUrl);
  }, [open, solanaPayUrl]);

  // Start / stop polling
  useEffect(() => {
    if (!open || status !== "waiting") return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch("/api/pay-check");
        if (!res.ok) return;
        const data = await res.json() as { paid: boolean };
        if (data.paid) {
          setStatus("success");
          clearInterval(pollRef.current!);
          setTimeout(() => window.location.reload(), 1500);
        }
      } catch {
        // ignore transient errors
      }
    }, POLL_INTERVAL);

    return () => clearInterval(pollRef.current!);
  }, [open, status]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          gap: "8px", padding: "13px 24px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "14px", color: "rgba(255,255,255,0.75)",
          fontFamily: "Inter, system-ui, sans-serif", fontSize: "14px", fontWeight: 500,
          cursor: "pointer", transition: "background 0.2s",
          minWidth: "280px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="3" height="3" rx="0.5" />
          <rect x="18" y="14" width="3" height="3" rx="0.5" />
          <rect x="14" y="18" width="3" height="3" rx="0.5" />
          <rect x="18" y="18" width="3" height="3" rx="0.5" />
        </svg>
        扫码支付  ·  145 USDC
      </button>
    );
  }

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "16px", padding: "24px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "18px",
    }}>
      {status === "success" ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎉</div>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "15px", fontWeight: 600, color: "#4ade80", margin: 0 }}>
            支付成功！正在解锁…
          </p>
        </div>
      ) : (
        <>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Solana Pay QR"
              style={{ width: 200, height: 200, borderRadius: "12px", display: "block" }}
            />
          ) : (
            <div style={{ width: 200, height: 200, borderRadius: "12px", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>生成中…</span>
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "0 0 4px" }}>
              用 Phantom / Solflare 手机扫码
            </p>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
              支付 145 USDC · 确认后自动解锁
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{
              display: "inline-block", width: 6, height: 6, borderRadius: "50%",
              background: "#4ade80",
              animation: "qrpulse 1.4s ease-in-out infinite",
            }} />
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              等待链上确认中…
            </span>
          </div>

          <button
            onClick={() => { setOpen(false); setStatus("waiting"); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", padding: "4px 8px" }}
          >
            取消
          </button>
        </>
      )}

      <style>{`@keyframes qrpulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
