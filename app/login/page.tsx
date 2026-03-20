"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "10px",
  color: "var(--text-primary, #f0ede5)",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 24px",
  background: "#2688f9",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 24px rgba(38,136,249,0.4)",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "登录失败");
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary, #1a1a1a)",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "48px 40px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>🦞</div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "26px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--text-primary, #f0ede5)",
              marginBottom: "8px",
            }}
          >
            登录 ClawFirm
          </h1>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            会员专区入口
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="邮箱地址"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          {error && (
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "13px",
                color: "#ff6b6b",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}
          <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? "登录中..." : "登录"}
          </button>
        </form>

        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          还没有账号？{" "}
          <a href="/register" style={{ color: "#2688f9", textDecoration: "none" }}>
            立即注册
          </a>
        </p>
      </div>
    </div>
  );
}
