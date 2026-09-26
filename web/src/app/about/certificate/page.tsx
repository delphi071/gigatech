import PageBanner from "@/components/PageBanner";
import { Crosshair } from "@/components/DesignIcons";

export const metadata = { title: "인증서" };

export default function CertificatePage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="신뢰의 근거를 담습니다" description="기가테크의 인증 및 등록 자료를 안내합니다." />
      <section className="section"><div className="container-x">
        <div className="certificate-empty">
          <div className="certificate-illustration" aria-hidden="true"><Crosshair /><span /><span /><span /></div>
          <div><span className="eyebrow">CERTIFICATES & REGISTRATION</span><h2>인증 자료를 준비하고 있습니다.</h2><p>인증서·등록증 원본을 확인한 후 이곳에 게시하겠습니다. 관련 내용은 담당자에게 문의해 주세요.</p></div>
        </div>
      </div></section>
    </>
  );
}
