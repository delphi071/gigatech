"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "./DesignIcons";

export default function FloatingButtons() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/contact/")) return null;
  return (
    <aside className="quick-contact" aria-label="빠른 문의">
      <Link href="/contact/quote" className="quick-quote"><span>견적 문의</span><ArrowUpRight width="18" height="18" /></Link>
    </aside>
  );
}
