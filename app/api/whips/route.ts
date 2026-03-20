import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

// GET /api/whips           → list all job prefixes
// GET /api/whips?job=<id>  → list files under a specific job

async function checkAuth(req: NextRequest) {
  const { env } = getRequestContext();
  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return { env, error: NextResponse.json({ error: "未登录" }, { status: 401 }) };

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return { env, error: NextResponse.json({ error: "无效会话" }, { status: 401 }) };

  const user = await getUserById(env.DB, payload.sub);
  if (!user) return { env, error: NextResponse.json({ error: "用户不存在" }, { status: 404 }) };

  const now = new Date().toISOString();
  const active = Boolean(user.is_unlocked) && (!user.unlocked_until || user.unlocked_until > now);
  if (!active) return { env, error: NextResponse.json({ error: "请先付款解锁" }, { status: 403 }) };

  return { env, error: null };
}

export async function GET(req: NextRequest) {
  const { env, error } = await checkAuth(req);
  if (error) return error;

  const jobId = new URL(req.url).searchParams.get("job");

  if (jobId) {
    // List files under this job: KV prefix = "{jobId}/"
    const list = await env.WHIPS.list({ prefix: `${jobId}/` });
    const files = list.keys.map((k) => k.name.slice(jobId.length + 1)); // strip prefix
    return NextResponse.json({ jobId, files });
  }

  // List all jobs: return unique job IDs from KV keys shaped as "{jobId}/{filename}"
  const list = await env.WHIPS.list();
  const jobs = new Set<string>();
  for (const k of list.keys) {
    const slash = k.name.indexOf("/");
    if (slash !== -1) jobs.add(k.name.slice(0, slash));
  }
  return NextResponse.json({ jobs: Array.from(jobs) });
}
