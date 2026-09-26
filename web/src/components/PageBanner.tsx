import Link from "next/link";
import { Crosshair } from "./DesignIcons";

const SECTIONS: Record<string, { index: string; english: string }> = {
  회사소개: { index: "01", english: "ABOUT GIGATECH" },
  주요업무: { index: "02", english: "OUR EXPERTISE" },
  장비보유현황: { index: "03", english: "PRECISION EQUIPMENT" },
  문의: { index: "04", english: "LET’S TALK" },
};

export default function PageBanner({ title, breadcrumb, description }: { title: string; breadcrumb?: string; description?: string }) {
  const section = SECTIONS[breadcrumb ?? ""] ?? { index: "G", english: "GIGATECH" };
  return (
    <section className="page-banner">
      <div className="container-x">
        <nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">HOME</Link><span aria-hidden="true">/</span>{breadcrumb && <><span>{breadcrumb}</span><span aria-hidden="true">/</span></>}<span aria-current="page">{title}</span></nav>
        <div className="page-banner-content">
          <div><span className="eyebrow">{section.index} — {section.english}</span><h1>{title}</h1>{description && <p className="page-banner-description">{description}</p>}</div>
          <div className="page-banner-mark" aria-hidden="true"><Crosshair /><span>{section.index}</span></div>
        </div>
        <div className="page-banner-rule"><span /><span>GIGATECH ENGINEERING</span></div>
      </div>
    </section>
  );
}
