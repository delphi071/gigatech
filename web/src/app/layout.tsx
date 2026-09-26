import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} | 기계설비 성능점검 전문`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "주식회사 기가테크는 기계설비 성능점검·유지관리 전문업체입니다. 법정 성능점검, 유지관리점검, 결과보고서 대행을 정확하게 수행합니다.",
  keywords: ["기계설비", "성능점검", "기계설비 성능점검", "유지관리", "기가테크"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">본문 바로가기</a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
