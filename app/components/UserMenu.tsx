"use client";

import { useState, useRef, useEffect } from "react";

export default function UserMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  }

  const menuItemStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    color: "var(--text-primary, #f0ede5)",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
    borderRadius: "8px",
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "7px 18px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.08)",
          color: "var(--text-primary, #f0ede5)",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {email.split("@")[0]}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "180px",
            background: "rgba(40,40,40,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "6px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            zIndex: 200,
          }}
        >
          <a href="/dashboard" style={menuItemStyle}>
            Dashboard
          </a>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 8px" }} />
          <button
            onClick={handleLogout}
            style={{ ...menuItemStyle, color: "rgba(255,255,255,0.5)" }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
