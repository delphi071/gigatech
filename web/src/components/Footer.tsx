import Link from "next/link";
import { COMPANY } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-x py-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="주식회사 기가테크 GIGATECH" className="h-6 w-auto" />
        <p className="mt-3 text-base font-bold text-slate-900">{COMPANY.name}</p>
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          {(COMPANY.ceo || COMPANY.bizNo) && (
            <p>
              {COMPANY.ceo && <>대표자: {COMPANY.ceo}</>}
              {COMPANY.ceo && COMPANY.bizNo && " · "}
              {COMPANY.bizNo && <>사업자등록번호: {COMPANY.bizNo}</>}
            </p>
          )}
          {COMPANY.address && <p>주소: {COMPANY.address}</p>}
          <p>
            Tel. {COMPANY.tel} &nbsp;·&nbsp; E-mail. {COMPANY.email}
          </p>
          <p>개인정보처리담당자: {COMPANY.privacyManager}</p>
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
