import Link from "next/link";
import { COMPANY, NAV } from "@/lib/site";
import { ArrowUpRight } from "./DesignIcons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="footer-top">
          <div className="footer-intro">
            <span className="eyebrow">PRECISION IN EVERY DETAIL</span>
            <p>오늘의 정밀함이<br />내일의 안전이 됩니다.</p>
            <Link href="/contact/customer" className="footer-contact-link">기가테크와 이야기하기<ArrowUpRight /></Link>
          </div>
          <div className="footer-nav">
            {NAV.map(group => (
              <div key={group.label}>
                <p>{group.label}</p>
                {group.children.map(child => <Link key={child.href} href={child.href}>{child.label}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="GIGATECH" width="182" height="28" className="footer-logo" />
            <p className="footer-company">{COMPANY.name}</p>
            {(COMPANY.ceo || COMPANY.bizNo) && <p>{COMPANY.ceo && "대표자: " + COMPANY.ceo}{COMPANY.ceo && COMPANY.bizNo && " · "}{COMPANY.bizNo && "사업자등록번호: " + COMPANY.bizNo}</p>}
            {COMPANY.address && <p>{COMPANY.address}</p>}
            <p><a href={"tel:" + COMPANY.tel}>{COMPANY.tel}</a><span className="footer-separator">/</span><a href={"mailto:" + COMPANY.email}>{COMPANY.email}</a></p>
            <p>개인정보처리담당자: {COMPANY.privacyManager}</p>
          </div>
          <div className="footer-legal">
            <div><Link href="/privacy">개인정보처리방침</Link><a href={COMPANY.kakaoChat} target="_blank" rel="noreferrer">카카오톡 상담 ↗</a></div>
            <p>© {new Date().getFullYear()} GIGATECH. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
