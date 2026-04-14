"use client";

import { useState, useEffect, useRef } from "react";
import AuthModal from "./AuthModal";
import UserMenu from "./UserMenu";

export default function NavAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const userRef = useRef<{ email: string } | null>(null);
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [redirectTo, setRedirectTo] = useState<string | undefined>();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() as Promise<{ email?: string }> : null))
      .then((data) => {
        if (data?.email) {
          setUser({ email: data.email });
          userRef.current = { email: data.email };
        }
      })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  // Expose openModal globally and attach click handlers to [data-auth] elements
  useEffect(() => {
    const openModal = (tab: "login" | "register") => setModal(tab);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__openAuthModal = openModal;

    function handleAuthClick(e: Event) {
      const el = (e.target as HTMLElement).closest("[data-auth]");
      if (!el) return;
      e.preventDefault();
      const authType = el.getAttribute("data-auth") || "login";
      if (userRef.current) {
        // Only payment button redirects to dashboard; other CTAs do nothing
        if (authType === "payment") window.location.href = "/dashboard";
        return;
      }
      const tab = (authType === "payment" ? "login" : authType) as "login" | "register";
      if (authType === "payment") setRedirectTo("/dashboard");
      else setRedirectTo(undefined);
      openModal(tab);
    }
    document.addEventListener("click", handleAuthClick);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).__openAuthModal;
      document.removeEventListener("click", handleAuthClick);
    };
  }, []);

  if (!checked) {
    // Placeholder to avoid layout shift
    return <div style={{ width: "120px", height: "36px" }} />;
  }

  if (user) {
    return <UserMenu email={user.email} />;
  }

  return (
    <>
      <button
        className="cf-auth-btn cf-auth-login"
        onClick={() => setModal("login")}
        style={{
          padding: "7px 18px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "transparent",
          color: "var(--text-muted)",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Log In
      </button>
      <button
        className="cf-auth-btn cf-auth-signup"
        onClick={() => setModal("register")}
        style={{
          padding: "7px 18px",
          borderRadius: "100px",
          border: "none",
          background: "#2688f9",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.04em",
          boxShadow: "0 2px 12px rgba(38,136,249,0.4)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Sign Up
      </button>
      {modal && <AuthModal onClose={() => { setModal(null); setRedirectTo(undefined); }} defaultTab={modal} redirectTo={redirectTo} />}
    </>
  );
}
