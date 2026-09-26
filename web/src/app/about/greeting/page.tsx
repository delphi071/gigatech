import PageBanner from "@/components/PageBanner";
import { Crosshair } from "@/components/DesignIcons";
import { COMPANY } from "@/lib/site";

export const metadata = { title: "인사말" };

export default function GreetingPage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="기술을 넘어, 신뢰로" description="보이지 않는 설비의 건강이, 우리가 머무는 공간의 안전이 됩니다." />
      <section className="section"><div className="container-x greeting-layout">
        <div className="greeting-statement"><span className="eyebrow">OUR PROMISE</span><h2>작은 부분의 정밀함이<br /><span>큰 신뢰를 만든다고</span><br />믿습니다.</h2><Crosshair width="75" height="75" /></div>
        <div className="greeting-letter">
          <p>안녕하십니까.<br /><strong>{COMPANY.name}</strong> 홈페이지를 찾아주셔서 진심으로 감사합니다.</p>
          <p>저희 (주)기가테크는 기계설비 성능점검을 비롯한 기계설비 분야의 전문업체로서, 고객 만족을 최우선 가치로 삼고 있습니다. 전문 인력과 검증된 점검 장비를 바탕으로 정확하고 신뢰할 수 있는 서비스를 제공합니다.</p>
          <p>앞으로도 변함없는 고객 여러분의 관심과 성원에 보답하고자, 더욱 정진하여 성심성의껏 우수한 품질의 서비스를 제공하고 고객의 발전에 기여할 수 있도록 최선을 다하겠습니다.</p>
          <p>고객님의 요구에 항상 최선을 다할 것을 약속드립니다.<br />감사합니다.</p>
          <p className="greeting-signature"><strong>{COMPANY.name}</strong> 임직원 일동</p>
        </div>
      </div></section>
    </>
  );
}
