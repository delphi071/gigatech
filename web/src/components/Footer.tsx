import Link from "next/link";
import { COMPANY } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-50">
      <div className="container-x py-10">
        <p className="text-lg font-bold text-slate-900">{COMPANY.name}</p>
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <p>
            Tel. {COMPANY.tel} &nbsp;·&nbsp; E-mail. {COMPANY.email}
          </p>
          <p>개인정보처리담당자: {COMPANY.privacyManager}</p>
          {/* 확인필요: 대표자·사업자등록번호·주소 추가 */}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href={COMPANY.kakaoChat}
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline"
          >
            카카오톡 상담
          </a>
          <Link href="/privacy" className="text-slate-500 hover:underline">
            개인정보처리방침
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          © {COMPANY.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
