import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

// POST /api/generate-whip
//   Body: { description: string, name?: string, maxTokens?: number }
//   Returns: { jobId: string, key: string }
//   Enqueues a message to Cloudflare Queue; consumer Worker handles generation.
//
// GET /api/generate-whip?job=<jobId>
//   Returns: { status: "pending"|"running"|"completed"|"error", whip?, key?, error? }

const JOB_TTL_SECONDS = 3600;

function jobKey(jobId: string) {
  return `job:${jobId}`;
}

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();

  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return NextResponse.json({ error: "无效会话" }, { status: 401 });

  const user = await getUserById(env.DB, payload.sub);
  if (!user) return NextResponse.json({ error: "用户不存在" }, { status: 404 });

  const now = new Date().toISOString();
  const active = Boolean(user.is_unlocked) && (!user.unlocked_until || user.unlocked_until > now);
  if (!active) return NextResponse.json({ error: "请先付款解锁" }, { status: 403 });

  const body = await req.json().catch(() => null) as {
    description?: string;
    name?: string;
    maxTokens?: number;
    // Multi-file mode: hint the worker which files to generate
    // Worker will also auto-detect from architecture analysis
    extraFiles?: Array<{ key: string; desc: string }>;
  } | null;

  if (!body?.description?.trim()) {
    return NextResponse.json({ error: "请提供工作流描述" }, { status: 400 });
  }

  const slug = body.name?.trim()
    ? body.name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : `generated-${Date.now()}`;
  const savedKey = `${slug}.whip`;

  const maxTokens = Math.min(
    Number.isInteger(body.maxTokens) && (body.maxTokens as number) > 0
      ? (body.maxTokens as number)
      : 16000,
    32000
  );

  // Multi mode: extraFiles array present (even if empty → worker auto-plans via arch analysis)
  const isMulti = Array.isArray(body.extraFiles);

  const jobId = crypto.randomUUID();

  // Store initial pending state in KV
  await env.WHIPS.put(
    jobKey(jobId),
    JSON.stringify({ status: "pending" }),
    { expirationTtl: JOB_TTL_SECONDS }
  );

  // Insert into D1 whip_jobs — local worker polls and processes
  await env.DB.prepare(
    "INSERT INTO whip_jobs (id, saved_key, max_tokens, description, extra_files) VALUES (?, ?, ?, ?, ?)"
  ).bind(
    jobId,
    savedKey,
    maxTokens,
    body.description.trim(),
    isMulti ? JSON.stringify(body.extraFiles) : null,
  ).run();

  return NextResponse.json({
    jobId,
    key: savedKey,
    multi: isMulti,
  });
}

export async function GET(req: NextRequest) {
  const { env } = getRequestContext();

  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return NextResponse.json({ error: "无效会话" }, { status: 401 });

  const jobId = new URL(req.url).searchParams.get("job");
  if (!jobId) return NextResponse.json({ error: "缺少 job 参数" }, { status: 400 });

  const raw = await env.WHIPS.get(jobKey(jobId));
  if (!raw) return NextResponse.json({ error: "job 不存在或已过期" }, { status: 404 });

  let job: { status: string; startedAt?: number; whip?: string; key?: string; error?: string };
  try {
    job = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "job 数据损坏" }, { status: 500 });
  }

  // Fallback: if queue worker was killed before catch could run, detect via startedAt
  if (job.status === "running" && job.startedAt && Date.now() - job.startedAt > 12 * 60 * 1000) {
    const timedOut = { status: "error", error: "生成超时（>12min），请缩短描述后重试" };
    await env.WHIPS.put(jobKey(jobId), JSON.stringify(timedOut), { expirationTtl: JOB_TTL_SECONDS });
    return NextResponse.json(timedOut);
  }

  return NextResponse.json(job);
}
