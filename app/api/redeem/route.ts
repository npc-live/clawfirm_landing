import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies } from "@/lib/session";
import { getUserById } from "@/lib/db";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();

  const token = getTokenFromCookies(req.headers.get("cookie"));
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });

  const payload = await verifySession(token, env.JWT_SECRET);
  if (!payload?.sub) return NextResponse.json({ error: "无效会话" }, { status: 401 });

  const user = await getUserById(env.DB, payload.sub);
  if (!user) return NextResponse.json({ error: "用户不存在" }, { status: 404 });

  if (user.is_unlocked) return NextResponse.json({ ok: true });

  const body = await req.json().catch(() => null) as { code?: string } | null;
  const code = body?.code?.trim().toUpperCase();
  if (!code) return NextResponse.json({ error: "请输入验证码" }, { status: 400 });

  if (!user.unlock_code) {
    return NextResponse.json({ error: "未找到验证码，请先完成付款" }, { status: 400 });
  }

  if (user.unlock_code !== code) {
    return NextResponse.json({ error: "验证码错误" }, { status: 400 });
  }

  await env.DB.prepare(
    "UPDATE users SET is_unlocked = 1, unlock_code = NULL, unlocked_until = datetime('now', '+1 month') WHERE id = ?"
  ).bind(payload.sub).run();

  return NextResponse.json({ ok: true });
}
