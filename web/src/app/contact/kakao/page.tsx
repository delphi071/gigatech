import PageBanner from "@/components/PageBanner";
import { COMPANY } from "@/lib/site";

export const metadata = { title: "카카오채널" };

export default function KakaoPage() {
  return (
    <>
      <PageBanner breadcrumb="문의" title="카카오채널" />
      <section className="section">
        <div className="container-x max-w-xl text-center">
          <p className="text-lg text-slate-700">카카오톡으로 편하게 상담하세요.</p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a href={COMPANY.kakaoChannel} target="_blank" rel="noreferrer" className="btn-kakao w-64">
              카카오톡 채널 추가
            </a>
            <a href={COMPANY.kakaoChat} target="_blank" rel="noreferrer" className="btn-kakao w-64">
              1:1 채팅 상담
            </a>
          </div>
          <p className="mt-6 break-all text-sm text-slate-400">
            {COMPANY.kakaoChannel}
          </p>
        </div>
      </section>
    </>
  );
}
