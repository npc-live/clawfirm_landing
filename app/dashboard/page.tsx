export const runtime = "edge";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession } from "@/lib/session";
import { getUserById } from "@/lib/db";
import LogoutButton from "./LogoutButton";
import PayWithSolana from "./PayWithSolana";
import GenerateWhip from "./GenerateWhip";

// ── Placeholder skills (fill in real content later) ──
const SKILLS = [
  { icon: "⚡", title: "自动化客户开发", desc: "占位内容，购买后解锁完整工作流模板。" },
  { icon: "🤖", title: "AI 内容矩阵生产", desc: "占位内容，购买后解锁完整工作流模板。" },
  { icon: "📊", title: "数据驱动选品", desc: "占位内容，购买后解锁完整工作流模板。" },
  { icon: "💰", title: "套利交易策略", desc: "占位内容，购买后解锁完整工作流模板。" },
  { icon: "🌐", title: "出海产品落地", desc: "占位内容，购买后解锁完整工作流模板。" },
  { icon: "🔁", title: "全自动运营闭环", desc: "占位内容，购买后解锁完整工作流模板。" },
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cf_session")?.value ?? null;
  if (!token) redirect("/login");

  const { env } = getRequestContext();
  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) redirect("/login");

  const user = await getUserById(env.DB, payload.sub);
  if (!user) redirect("/login");

  const now = new Date().toISOString();
  const unlocked = Boolean(user.is_unlocked) && (!user.unlocked_until || user.unlocked_until > now);
  const unlockedUntil = user.unlocked_until ? new Date(user.unlocked_until + "Z").toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" }) : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary, #1a1a1a)" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px",
        background: "rgba(26,26,26,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#f0ede5", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ClawFirm" style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "6px" }} />
          ClawFirm
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            {user.email}
          </span>
          {unlocked && (
            <span style={{ padding: "3px 10px", background: "rgba(38,200,100,0.15)", border: "1px solid rgba(38,200,100,0.3)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: "#4ade80", letterSpacing: "0.04em" }}>
              已解锁
            </span>
          )}
          <LogoutButton />
        </div>
      </nav>

      <main style={{ paddingTop: "80px", padding: "100px 48px 80px", maxWidth: "960px", margin: "0 auto" }}>

        {unlocked ? (
          /* ══ UNLOCKED: Skills Grid ══ */
          <>
            <div style={{ marginBottom: "48px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px", background: "rgba(38,200,100,0.12)", border: "1px solid rgba(38,200,100,0.25)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: "#4ade80", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
                ✦ 专属 Skills
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em", marginBottom: "12px" }}>
                你的专属工作流
              </h1>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                以下是你解锁的全部 Skills，持续更新中。
              </p>
              {unlockedUntil && (
                <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}>
                  有效期至 {unlockedUntil}
                </p>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {SKILLS.map((s) => (
                <div key={s.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "18px", padding: "28px 24px", backdropFilter: "blur(16px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: "26px", marginBottom: "12px" }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <GenerateWhip />
          </>
        ) : (
          /* ══ LOCKED: Payment ══ */
          <>
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px", background: "rgba(38,136,249,0.12)", border: "1px solid rgba(38,136,249,0.25)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: "#2688f9", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "20px" }}>
                ✦ 专属 Skills
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.95)", letterSpacing: "-0.03em", marginBottom: "12px" }}>
                解锁专属工作流
              </h1>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "500px" }}>
                付款成功后自动解锁，有效期 1 个月，到期后续费继续使用。
              </p>
            </div>

            {/* Payment card */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px", maxWidth: "560px", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "28px" }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", fontWeight: 900, color: "#f0ede5", letterSpacing: "-0.03em" }}>1</span>
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>USDC</span>
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginLeft: "4px" }}>一次性 · 永久有效</span>
              </div>

              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                {[
                  { n: "01", text: "安装 Phantom 钱包并充值 USDC" },
                  { n: "02", text: "点击下方按钮，连接钱包并签名交易" },
                  { n: "03", text: "链上确认后自动解锁，无需等待" },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 900, fontStyle: "italic", color: "#9945FF", opacity: 0.8, flexShrink: 0, lineHeight: 1.1 }}>{s.n}</span>
                    <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <PayWithSolana />

              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "16px", lineHeight: 1.5 }}>
                通过 x402 协议 · Solana 主网 USDC · 由 Coinbase 验证
              </p>
            </div>

            {/* Locked skills preview */}
            <div style={{ marginTop: "56px" }}>
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "16px" }}>付费后解锁</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {SKILLS.map((s) => (
                  <div key={s.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "14px", padding: "20px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(2px)", background: "rgba(26,26,26,0.5)" }} />
                    <div style={{ position: "relative", fontSize: "20px", marginBottom: "8px", opacity: 0.3 }}>{s.icon}</div>
                    <div style={{ position: "relative", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.25)" }}>{s.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
