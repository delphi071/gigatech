import { Resend } from "resend";

// 접수 알림 메일 발송 (RESEND_API_KEY 없으면 조용히 skip)
export async function sendNotification(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM ?? "noreply@gigatech.kr";
  if (!key || !to) {
    console.warn("[mail] RESEND_API_KEY/MAIL_TO 미설정 — 메일 발송 skip");
    return;
  }
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from, to, subject, html });
  } catch (e) {
    console.error("[mail] 발송 실패", e);
  }
}
