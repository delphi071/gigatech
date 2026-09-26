import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/mail";

const schema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  replyMethod: z.enum(["phone", "email", "visit"]),
  title: z.string().min(1),
  content: z.string().optional().default(""),
  agreed: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const inquiry = await prisma.inquiry.create({ data });

    await sendNotification(
      `[고객문의] ${data.company} - ${data.title}`,
      `<h3>새 고객문의</h3>
       <p><b>회사명:</b> ${data.company}</p>
       <p><b>성함/직급:</b> ${data.name}</p>
       <p><b>연락처:</b> ${data.phone}</p>
       <p><b>이메일:</b> ${data.email}</p>
       <p><b>수신방법:</b> ${data.replyMethod}</p>
       <p><b>제목:</b> ${data.title}</p>
       <p><b>내용:</b><br/>${(data.content || "").replace(/\n/g, "<br/>")}</p>`
    );

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    console.error("[inquiry]", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
