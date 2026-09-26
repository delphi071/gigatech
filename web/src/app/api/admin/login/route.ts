import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE, ADMIN_PW_KEY, makeSession, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  // 1) DB에 저장된 비밀번호가 있으면 그것으로 검증
  // 2) 없으면 환경변수 ADMIN_PASSWORD (최초 부트스트랩)
  let ok = false;
  try {
    const stored = await prisma.setting.findUnique({ where: { key: ADMIN_PW_KEY } });
    if (stored) {
      ok = verifyPassword(String(password ?? ""), stored.value);
    } else {
      const expected = process.env.ADMIN_PASSWORD;
      if (!expected) {
        return NextResponse.json(
          { ok: false, error: "ADMIN_PASSWORD 미설정" },
          { status: 500 }
        );
      }
      ok = password === expected;
    }
  } catch (e) {
    console.error("[admin/login]", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  if (!ok) {
    return NextResponse.json({ ok: false, error: "비밀번호 오류" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8시간
  });
  return res;
}
