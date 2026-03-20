"use client";

import { useState, useRef } from "react";

type JobStatus = "pending" | "running" | "completed" | "error";

export default function GenerateWhip() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [uiStatus, setUiStatus] = useState<"idle" | "submitting" | "polling" | "done" | "error">("idle");
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [output, setOutput] = useState("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleGenerate() {
    if (!description.trim()) return;
    setUiStatus("submitting");
    setJobStatus(null);
    setOutput("");
    setSavedKey(null);
    setErrorMsg("");

    try {
      // Step 1: Submit job — returns immediately with jobId
      const res = await fetch("/api/generate-whip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), name: name.trim() || undefined }),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const { jobId } = await res.json() as { jobId: string; key: string };

      // Step 2: Poll until completed or error
      setUiStatus("polling");
      setJobStatus("pending");
      poll(jobId);

    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setUiStatus("error");
    }
  }

  function poll(jobId: string, attempt = 0) {
    if (pollTimer.current) clearTimeout(pollTimer.current);

    // Max ~5 minutes (100 × 3s)
    if (attempt >= 100) {
      setErrorMsg("生成超时，请重试（描述可以更简短一些）");
      setUiStatus("error");
      return;
    }

    pollTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/generate-whip?job=${jobId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const job = await res.json() as {
          status: JobStatus;
          whip?: string;
          key?: string;
          error?: string;
        };

        setJobStatus(job.status);

        if (job.status === "completed") {
          setSavedKey(job.key ?? null);
          // Fetch actual whip content via /api/whips?key=xxx
          if (job.key) {
            const whipRes = await fetch(`/api/whips?key=${encodeURIComponent(job.key)}`);
            if (whipRes.ok) setOutput(await whipRes.text());
          }
          setUiStatus("done");
        } else if (job.status === "error") {
          setErrorMsg(job.error ?? "未知错误");
          setUiStatus("error");
        } else {
          // pending or running — keep polling
          poll(jobId, attempt + 1);
        }
      } catch (e) {
        setErrorMsg(e instanceof Error ? e.message : String(e));
        setUiStatus("error");
      }
    }, 3000);
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  const busy = uiStatus === "submitting" || uiStatus === "polling";

  const statusLabel: Record<string, string> = {
    submitting: "提交中…",
    polling: jobStatus === "pending" ? "等待生成…" : "生成中…",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px 14px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
    color: "rgba(255,255,255,0.85)",
    outline: "none",
    boxSizing: "border-box",
    resize: "none" as const,
  };

  return (
    <div style={{ marginTop: "56px" }}>
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px", background: "rgba(153,69,255,0.12)", border: "1px solid rgba(153,69,255,0.25)", borderRadius: "100px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "11px", fontWeight: 600, color: "#c084fc", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
          ✦ AI 生成工作流
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "8px" }}>
          生成自定义 Whip
        </h2>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
          描述你想赚钱的方式，AI 生成完整可运行的 whipflow 工作流文件。
        </p>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "28px", maxWidth: "720px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
            工作流描述 *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：做一个币圈套利策略，自动监控多个交易所价差，回测并自动执行交易…"
            style={inputStyle}
            disabled={busy}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px" }}>
            文件名（可选）
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="my-strategy（留空自动命名）"
            style={{ ...inputStyle, resize: undefined }}
            disabled={busy}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={busy || !description.trim()}
          style={{
            padding: "12px 28px",
            background: busy ? "rgba(153,69,255,0.3)" : "rgba(153,69,255,0.85)",
            border: "1px solid rgba(153,69,255,0.5)",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#fff",
            cursor: busy ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {busy ? (
            <>
              <span style={{ display: "inline-block", width: "12px", height: "12px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              {statusLabel[uiStatus]}
            </>
          ) : "✦ 生成 Whip"}
        </button>

        {uiStatus === "error" && (
          <p style={{ marginTop: "12px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "13px", color: "#f87171" }}>
            错误: {errorMsg}
          </p>
        )}
      </div>

      {uiStatus === "done" && output && (
        <div style={{ marginTop: "24px", maxWidth: "720px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              已保存为 {savedKey}
            </span>
            <button
              onClick={handleCopy}
              style={{ padding: "5px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", fontFamily: "Inter, system-ui, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
            >
              复制
            </button>
          </div>
          <pre
            style={{
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "20px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: "500px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {output}
          </pre>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
