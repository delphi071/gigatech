import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_PW_KEY,
  hashPassword,
  isAdminAuthed,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req
    .json()
    .catch(() => ({ currentPassword: "", newPassword: "" }));

  if (!newPassword || String(newPassword).length < 6) {
    return NextResponse.json(
      { ok: false, error: "새 비밀번호는 6자 이상이어야 합니다." },
      { status: 400 }
    );
  }

  try {
    // 현재 비밀번호 검증 (DB 우선, 없으면 환경변수)
    const stored = await prisma.setting.findUnique({ where: { key: ADMIN_PW_KEY } });
    let ok = false;
    if (stored) {
      ok = verifyPassword(String(currentPassword ?? ""), stored.value);
    } else {
      ok = !!process.env.ADMIN_PASSWORD && currentPassword === process.env.ADMIN_PASSWORD;
    }
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "현재 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 새 비밀번호 해시 저장
    const value = hashPassword(String(newPassword));
    await prisma.setting.upsert({
      where: { key: ADMIN_PW_KEY },
      create: { key: ADMIN_PW_KEY, value },
      update: { value },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/password]", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
