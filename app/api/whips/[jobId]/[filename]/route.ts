import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

// GET /api/whips/{jobId}/{filename} → get file content

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string; filename: string }> }
) {
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

  const { jobId, filename } = await params;
  const kvKey = `${jobId}/${filename}`;

  const value = await env.WHIPS.get(kvKey);
  if (value === null) return NextResponse.json({ error: "文件不存在" }, { status: 404 });

  return new NextResponse(value, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
