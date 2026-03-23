"use client";

import { useState, FormEvent } from "react";

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
  boxSizing: "border-box" as const,
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

const tabStyle = (active: boolean): React.CSSProperties => ({
  flex: 1,
  padding: "10px 0",
  background: "transparent",
  border: "none",
  borderBottom: active ? "2px solid #2688f9" : "2px solid transparent",
  color: active ? "var(--text-primary, #f0ede5)" : "rgba(255,255,255,0.4)",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s",
});

export default function AuthModal({
  onClose,
  defaultTab = "login",
  redirectTo,
}: {
  onClose: () => void;
  defaultTab?: "login" | "register";
  redirectTo?: string;
}) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function resetForm() {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
  }

  function switchTab(t: "login" | "register") {
    resetForm();
    setTab(t);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login failed");
      } else {
        onClose();
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          window.location.reload();
        }
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
      } else {
        setSuccess(data.message ?? "Registered! Please log in.");
        setTimeout(() => {
          switchTab("login");
        }, 1500);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(40,40,40,0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "36px 36px 40px",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.12), 0 32px 80px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: "20px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px",
          }}
        >
          ✕
        </button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="ClawFirm"
            style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "8px", margin: "0 auto 8px" }}
          />
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--text-primary, #f0ede5)",
            }}
          >
            ClawFirm
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button style={tabStyle(tab === "login")} onClick={() => switchTab("login")}>
            Log In
          </button>
          <button style={tabStyle(tab === "register")} onClick={() => switchTab("register")}>
            Sign Up
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {error && (
              <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#ff6b6b", margin: 0 }}>
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        ) : (
          <>
            {success ? (
              <div
                style={{
                  padding: "20px",
                  background: "rgba(38,200,100,0.12)",
                  border: "1px solid rgba(38,200,100,0.3)",
                  borderRadius: "12px",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  color: "#4ade80",
                  lineHeight: 1.6,
                }}
              >
                {success}
              </div>
            ) : (
              <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  type="password"
                  placeholder="Password (min 8 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  style={inputStyle}
                />
                {error && (
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#ff6b6b", margin: 0 }}>
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
