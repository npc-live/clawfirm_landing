import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { AuthSchema } from "@/lib/validators";
import { hashPassword } from "@/lib/password";
import { getUserByEmail, createUser } from "@/lib/db";

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

    const existing = await getUserByEmail(env.DB, email);
    if (existing) {
      return NextResponse.json(
        { error: "该邮箱已注册" },
        { status: 409 }
      );
    }

    const id = crypto.randomUUID();
    const hash = await hashPassword(password);
    await createUser(env.DB, id, email, hash);

    return NextResponse.json(
      { message: "注册成功，请登录。" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
