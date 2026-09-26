"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { ArrowUpRight } from "./DesignIcons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); setActiveMenu(null); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container-x header-inner">
        <Link href="/" className="brand-lockup" aria-label="기가테크 홈" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="GIGATECH" width="195" height="30" />
          <span>기계설비 성능점검 · 유지관리</span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          {NAV.map((group, index) => (
            <div key={group.label} className="nav-group"
              onPointerEnter={event => { if (event.pointerType === "mouse") setActiveMenu(index); }}
              onPointerLeave={event => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setActiveMenu(null); }}
              onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveMenu(null); }}
              onKeyDown={event => { if (event.key === "Escape") { setActiveMenu(null); event.currentTarget.querySelector("button")?.focus(); } }}>
              <button type="button" className={"nav-link " + (group.children.some(c => pathname === c.href) ? "is-active" : "")}
                aria-expanded={activeMenu === index} aria-controls={"desktop-menu-" + index}
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}>
                {group.label}<span className="nav-chevron" aria-hidden="true">⌄</span>
              </button>
              <div id={"desktop-menu-" + index} className="nav-dropdown" hidden={activeMenu !== index}>
                <span className="nav-dropdown-index">0{index + 1} / {group.label}</span>
                {group.children.map(child => (
                  <Link key={child.href} href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={() => setActiveMenu(null)}>
                    {child.label}<ArrowUpRight width="14" height="14" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Link href="/contact/quote" className="header-cta">견적문의<ArrowUpRight width="18" height="18" /></Link>
        <button ref={toggleRef} type="button" className={"menu-toggle " + (open ? "is-open" : "")} aria-label={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="모바일 메뉴" hidden={!open}>
        <div className="container-x mobile-nav-inner">
          {NAV.map((group, index) => (
            <div key={group.label} className="mobile-nav-group">
              <p><span>0{index + 1}</span>{group.label}</p>
              <div>{group.children.map(child => (
                <Link key={child.href} href={child.href} aria-current={pathname === child.href ? "page" : undefined} onClick={() => setOpen(false)}>{child.label}<ArrowUpRight width="15" height="15" /></Link>
              ))}</div>
            </div>
          ))}
          <Link href="/contact/quote" className="btn-primary mobile-menu-cta" onClick={() => setOpen(false)}>견적문의<ArrowUpRight width="18" height="18" /></Link>
        </div>
      </nav>
    </header>
  );
}
