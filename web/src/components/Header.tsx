"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="기가테크 홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="주식회사 기가테크 GIGATECH" className="h-7 w-auto sm:h-8" />
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((group) => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href}
                className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand"
              >
                {group.label}
              </Link>
              <div className="invisible absolute left-0 top-full min-w-44 rounded-md border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                {group.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-brand-light hover:text-brand"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact/quote" className="btn-primary">
            견적문의
          </Link>
        </div>

        {/* 모바일 토글 */}
        <button
          className="lg:hidden"
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
          <span className="mt-1.5 block h-0.5 w-6 bg-slate-800" />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-x py-3">
            {NAV.map((group) => (
              <div key={group.label} className="py-2">
                <p className="px-1 py-1 text-sm font-bold text-slate-900">
                  {group.label}
                </p>
                <div className="flex flex-col">
                  {group.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="rounded px-3 py-2 text-sm text-slate-600 hover:bg-brand-light"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
