import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { verifySession, getTokenFromCookies, clearSessionCookie } from "@/lib/session";
import { deleteSessionsByUserId } from "@/lib/db";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { env } = getRequestContext();
  const token = getTokenFromCookies(req.headers.get("cookie"));

  if (token) {
    const payload = await verifySession(token, env.JWT_SECRET);
    if (payload?.sub) {
      await deleteSessionsByUserId(env.DB, payload.sub);
    }
  }

  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearSessionCookie(req.headers.get("host")));
  return res;
}
