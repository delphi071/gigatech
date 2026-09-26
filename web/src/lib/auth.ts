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
