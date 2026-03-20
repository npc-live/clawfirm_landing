import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { env } = getRequestContext();
  const token = getTokenFromCookies(req.headers.get("cookie"));

  if (!token) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) {
    return NextResponse.json({ error: "无效会话" }, { status: 401 });
  }

  const user = await getUserById(env.DB, payload.sub);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const active = Boolean(user.is_unlocked) && (!user.unlocked_until || user.unlocked_until > now);

  return NextResponse.json({
    id: user.id,
    email: user.email,
    unlocked: active,
    unlockedUntil: user.unlocked_until ?? null,
    createdAt: user.created_at,
  });
}
