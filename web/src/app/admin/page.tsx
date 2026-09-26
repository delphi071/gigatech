import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";
import PasswordChange from "./PasswordChange";

export const metadata = { title: "관리자" };
export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Date(d).toISOString().slice(0, 16).replace("T", " ");
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  if (!isAdminAuthed()) redirect("/admin/login");

  const tab = searchParams.tab === "quote" ? "quote" : "inquiry";

  const [inquiries, quotes] = await Promise.all([
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.quote.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  return (
    <div className="container-x py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">접수 관리</h1>
        <div className="flex items-center gap-2">
          <PasswordChange />
          <LogoutButton />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Link
          href="/admin?tab=inquiry"
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            tab === "inquiry" ? "bg-brand text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          고객문의 ({inquiries.length})
        </Link>
        <Link
          href="/admin?tab=quote"
          className={`rounded-md px-4 py-2 text-sm font-semibold ${
            tab === "quote" ? "bg-brand text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          견적문의 ({quotes.length})
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        {tab === "inquiry" ? (
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">접수일시</th>
                <th className="px-3 py-2">회사명</th>
                <th className="px-3 py-2">담당자</th>
                <th className="px-3 py-2">연락처</th>
                <th className="px-3 py-2">수신</th>
                <th className="px-3 py-2">제목</th>
                <th className="px-3 py-2">내용</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 align-top">
                  <td className="whitespace-nowrap px-3 py-2 text-slate-500">{fmt(r.createdAt)}</td>
                  <td className="px-3 py-2">{r.company}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="whitespace-nowrap px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.replyMethod}</td>
                  <td className="px-3 py-2">{r.title}</td>
                  <td className="max-w-md px-3 py-2 text-slate-600">{r.content}</td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-slate-400">
                    접수된 고객문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">접수일시</th>
                <th className="px-3 py-2">건물명</th>
                <th className="px-3 py-2">담당자</th>
                <th className="px-3 py-2">연락처</th>
                <th className="px-3 py-2">주소</th>
                <th className="px-3 py-2">대상설비</th>
                <th className="px-3 py-2">요청사항</th>
                <th className="px-3 py-2">첨부</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 align-top">
                  <td className="whitespace-nowrap px-3 py-2 text-slate-500">{fmt(r.createdAt)}</td>
                  <td className="px-3 py-2">{r.building}</td>
                  <td className="px-3 py-2">{r.manager}</td>
                  <td className="whitespace-nowrap px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.address ?? "-"}</td>
                  <td className="max-w-xs px-3 py-2 text-slate-600">
                    {r.targetFacilities.join(", ") || "-"}
                  </td>
                  <td className="max-w-xs px-3 py-2 text-slate-600">{r.request ?? "-"}</td>
                  <td className="px-3 py-2">
                    {r.fileUrl ? (
                      <a href={r.fileUrl} className="text-brand underline" target="_blank" rel="noreferrer">
                        {r.fileName ?? "다운로드"}
                      </a>
                    ) : (
                      r.fileName ?? "-"
                    )}
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-slate-400">
                    접수된 견적문의가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
