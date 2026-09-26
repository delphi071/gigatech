import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const building = String(fd.get("building") || "").trim();
    const manager = String(fd.get("manager") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const address = String(fd.get("address") || "").trim() || null;
    const request = String(fd.get("request") || "").trim() || null;
    const agreed = fd.get("agreed") != null;
    const targetFacilities = fd.getAll("targetFacilities").map(String);

    if (!building || !manager || !phone || !email || !agreed) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // 첨부파일 업로드 (Vercel Blob)
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    const file = fd.get("file");
    if (file && file instanceof File && file.size > 0) {
      fileName = file.name;
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(`quotes/${Date.now()}-${file.name}`, file, {
          access: "public",
        });
        fileUrl = blob.url;
      } else {
        console.warn("[quote] BLOB_READ_WRITE_TOKEN 미설정 — 첨부 저장 skip");
      }
    }

    const quote = await prisma.quote.create({
      data: {
        building,
        manager,
        phone,
        email,
        address,
        request,
        targetFacilities,
        fileUrl,
        fileName,
        agreed,
      },
    });

    await sendNotification(
      `[견적문의] ${building}`,
      `<h3>새 견적문의</h3>
       <p><b>건물명:</b> ${building}</p>
       <p><b>담당자:</b> ${manager}</p>
       <p><b>연락처:</b> ${phone}</p>
       <p><b>이메일:</b> ${email}</p>
       <p><b>주소:</b> ${address ?? "-"}</p>
       <p><b>대상설비:</b> ${targetFacilities.join(", ") || "-"}</p>
       <p><b>요청사항:</b><br/>${(request ?? "-").replace(/\n/g, "<br/>")}</p>
       <p><b>첨부:</b> ${fileUrl ? `<a href="${fileUrl}">${fileName}</a>` : fileName ?? "-"}</p>`
    );

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (e) {
    console.error("[quote]", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
