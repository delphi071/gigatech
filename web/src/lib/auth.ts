import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "gt_admin";

function sign(value: string) {
  const secret = process.env.ADMIN_SECRET ?? "dev-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function makeSession() {
  const payload = "admin";
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token?: string) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  return sign(payload) === sig;
}

export function isAdminAuthed() {
  const token = cookies().get(COOKIE)?.value;
  return verifySession(token);
}

export const ADMIN_COOKIE = COOKIE;

// 비밀번호 해시 (scrypt, 내장 crypto — 외부 의존성 없음)
export function hashPassword(pw: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const h = crypto.scryptSync(pw, salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(h, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const ADMIN_PW_KEY = "admin_password";
