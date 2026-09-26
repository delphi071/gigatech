"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/lib/site";
import { ArrowUpRight, ChatIcon } from "./DesignIcons";

export default function FloatingButtons() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/contact/")) return null;
  return (
    <aside className="quick-contact" aria-label="빠른 문의">
      <a href={COMPANY.kakaoChat} target="_blank" rel="noreferrer" className="quick-chat"><ChatIcon /><span>카카오 상담</span></a>
      <Link href="/contact/quote" className="quick-quote"><span>견적 문의</span><ArrowUpRight width="18" height="18" /></Link>
    </aside>
  );
}
