import Link from "next/link";
import { COMPANY, EQUIPMENT } from "@/lib/site";
import BuildingGraphic from "@/components/BuildingGraphic";
import FacilityExplorer from "@/components/FacilityExplorer";
import { ArrowRight, ArrowUpRight, Crosshair } from "@/components/DesignIcons";

const SERVICES = [
  { number: "01", category: "PERFORMANCE INSPECTION", title: "기계설비 성능점검", description: "설비의 현재를 정확히 읽고, 더 나은 성능의 기준을 제시합니다.", tags: ["시스템 검토", "성능개선 계획", "결과보고서"], image: "/business/inspection.jpg", href: "/business/performance" },
  { number: "02", category: "MAINTENANCE & CARE", title: "기계설비 유지관리", description: "정기적인 현장 점검으로, 건물의 일상이 안정적으로 이어지도록.", tags: ["정기 현장점검", "설비 상태 확인", "유지관리 지원"], image: "/facilities/f01.jpg", href: "/business/maintenance" },
];
const STEPS = [
  { title: "현장을 이해합니다", detail: "관리주체와 협의하고 설비 현황과 필요한 자료를 확인합니다.", english: "UNDERSTAND" },
  { title: "계획을 세웁니다", detail: "점검 범위와 현장 조건에 맞춰 계약과 일정을 협의합니다.", english: "PLAN" },
  { title: "정밀하게 살핍니다", detail: "설비의 작동 상태와 성능을 측정하고 개선사항을 확인합니다.", english: "INSPECT" },
  { title: "결과로 답합니다", detail: "점검 결과를 보고서로 정리하고 관리 방향을 안내합니다.", english: "REPORT" },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="container-x">
          <div className="hero-topline"><span>GIGATECH / MECHANICAL ENGINEERING</span><span>정밀한 점검. 지속적인 신뢰.</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker"><span />건물의 내일을 생각하는 기술</p>
              <h1>안전의 기준을,<br /><em>더 정밀하게.</em></h1>
              <p className="hero-description">보이지 않는 설비부터 일상의 쾌적함까지.<br />기가테크의 기계설비 성능점검·유지관리로<br className="desktop-break" /> 건물의 건강한 흐름을 이어갑니다.</p>
              <div className="hero-actions"><Link href="/contact/quote" className="btn-primary">견적문의<ArrowUpRight width="19" height="19" /></Link><Link href="/business/performance" className="text-link">주요업무 알아보기<ArrowRight width="19" height="19" /></Link></div>
              <div className="hero-signature"><Crosshair width="34" height="34" /><span>PRECISION FOR<br /><strong>EVERYDAY SAFETY.</strong></span></div>
            </div>
            <BuildingGraphic />
          </div>
          <div className="hero-index"><span className="hero-index-label">WHAT WE DO</span><Link href="/business/performance"><span>01</span>성능점검<ArrowUpRight width="18" height="18" /></Link><Link href="/business/maintenance"><span>02</span>유지관리<ArrowUpRight width="18" height="18" /></Link><Link href="/equipment"><span>03</span>점검장비<ArrowUpRight width="18" height="18" /></Link></div>
        </div>
      </section>

      <section className="editorial-section services-section" id="expertise">
        <div className="container-x">
          <div className="section-heading"><div><p className="eyebrow">01 — OUR EXPERTISE</p><h2>건물을 이해하는 깊이,<br />관리의 차이를 만듭니다.</h2></div><p className="section-description">설비 하나하나의 상태를 살피는 일에서 시작합니다.<br />점검부터 유지관리까지, 현장에 필요한 기술을 연결합니다.</p></div>
          <div className="service-grid">{SERVICES.map(service => (
            <Link href={service.href} key={service.number} className="service-feature">
              <div className="service-copy"><div className="service-category"><span>{service.number} / {service.category}</span><ArrowUpRight /></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
              <div className="service-image">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={service.image} alt={service.title + " 관련 현장·설비 참고 사진"} width="800" height="460" loading="lazy" /><span className="service-image-label">EXPLORE SERVICE <ArrowRight width="18" height="18" /></span></div>
            </Link>
          ))}</div>
        </div>
      </section>

      <section className="editorial-section facilities-section">
        <div className="container-x">
          <div className="section-heading"><div><p className="eyebrow">02 — BUILDING SYSTEMS</p><h2>공기, 물, 그리고 에너지.<br />모든 흐름을 살핍니다.</h2></div><p className="section-description">공간을 쾌적하게 만드는 다양한 기계설비.<br />설비의 역할을 이해하고, 필요한 점검을 안내합니다.</p></div>
          <FacilityExplorer />
        </div>
      </section>

      <section className="equipment-showcase">
        <div className="container-x equipment-showcase-inner">
          <div className="equipment-intro"><p className="eyebrow">03 — OUR EQUIPMENT</p><h2>정확한 진단에는<br /><span>정밀한 도구가.</span></h2><p>작은 변화도 놓치지 않도록.<br />다양한 측정·진단 장비로 설비의 상태를 살핍니다.</p><Link href="/equipment" className="text-link">점검장비 전체보기<ArrowUpRight width="20" height="20" /></Link><Crosshair className="equipment-crosshair" width="92" height="92" /></div>
          <div className="equipment-preview">{[0, 7, 8, 12].map(index => (
            <Link href="/equipment" className="equipment-preview-item" key={index}><span className="equipment-preview-number">EQ. {String(index + 1).padStart(2, "0")}</span><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={"/equipment/eq" + String(index + 1).padStart(2, "0") + ".png"} alt={EQUIPMENT[index]} width="168" height="160" loading="lazy" /></div><p>{EQUIPMENT[index]}<ArrowUpRight width="16" height="16" /></p></Link>
          ))}</div>
        </div>
      </section>

      <section className="editorial-section process-section">
        <div className="container-x"><div className="section-heading"><div><p className="eyebrow">04 — HOW WE WORK</p><h2>처음의 상담부터,<br />마지막 보고서까지.</h2></div><Link href="/business/performance" className="text-link">점검 절차 자세히 보기<ArrowUpRight width="18" height="18" /></Link></div><ol className="process-list">{STEPS.map((step, index) => <li key={step.english}><div className="process-number"><span>0{index + 1}</span><ArrowRight width="20" height="20" /></div><span className="process-english">{step.english}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></div>
      </section>

      <section className="home-contact"><div className="container-x home-contact-inner"><div><p className="eyebrow">LET’S BUILD TRUST</p><h2>더 안전한 내일,<br />함께 시작할까요?</h2><p>현장에 필요한 점검, 기가테크가 함께 고민하겠습니다.</p><a href={"tel:" + COMPANY.tel} className="home-contact-phone">{COMPANY.tel}</a></div><Link href="/contact/quote" className="contact-orbit" aria-label="견적문의"><ArrowUpRight width="58" height="58" /><span>견적문의</span></Link></div></section>
    </div>
  );
}
