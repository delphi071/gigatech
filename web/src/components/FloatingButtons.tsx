import Link from "next/link";
import { COMPANY } from "@/lib/site";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2">
      <a
        href={COMPANY.kakaoChat}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fee500] text-xs font-bold text-[#3c1e1e] shadow-lg"
        title="카카오 상담"
      >
        상담
      </a>
      <Link
        href="/contact/quote"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-lg"
        title="견적문의"
      >
        견적
      </Link>
    </div>
  );
}
