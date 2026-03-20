import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { AuthSchema } from "@/lib/validators";
import { verifyPassword } from "@/lib/password";
import { getUserByEmail, createSession } from "@/lib/db";
import { signSession, sessionCookie } from "@/lib/session";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AuthSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const { env } = getRequestContext();

    const user = await getUserByEmail(env.DB, email);
    if (!user) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.hash);
    if (!valid) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }

    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await createSession(env.DB, sessionId, user.id, expiresAt);

    const token = await signSession(
      { sub: user.id, email: user.email, unlocked: Boolean(user.is_unlocked) },
      env.JWT_SECRET
    );

    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", sessionCookie(token));
    return res;
  } catch {
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
