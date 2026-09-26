// DB 연결·테이블 확인용 (읽기 전용). 실행: node scripts/check-db.mjs
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

// .env 수동 로드
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const prisma = new PrismaClient();
try {
  const [inquiry, quote] = await Promise.all([
    prisma.inquiry.count(),
    prisma.quote.count(),
  ]);
  console.log("DB 연결 성공 ✅");
  console.log("고객문의(Inquiry) 건수:", inquiry);
  console.log("견적문의(Quote) 건수:", quote);
} catch (e) {
  console.error("DB 오류 ❌", e.message);
} finally {
  await prisma.$disconnect();
}
