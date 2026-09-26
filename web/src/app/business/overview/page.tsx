import { Crosshair } from "@/components/DesignIcons";
import { ContentHeading } from "@/components/EditorialContent";
import styles from "@/components/EditorialContent.module.css";
import PageBanner from "@/components/PageBanner";
import { FACILITY_TYPES } from "@/lib/site";

export const metadata = { title: "기계설비 개요" };

const VALUES: { title: string; note?: string }[] = [
  { title: "전문적인 기계설비 유지관리" },
  { title: "건축물의 사용 수명 연장" },
  { title: "쾌적하고 안전한 생활환경" },
  { title: "에너지 절약·효율화", note: "연간 약 11% 절감" },
];

export default function OverviewPage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="기계설비 개요" />
      <div className={styles.page}>
        <div className="container-x">
          <section className={`${styles.block} ${styles.definition}`} aria-labelledby="definition-heading">
            <div className={styles.definitionTitle}>
              <ContentHeading number="01" title="기계설비란?" id="definition-heading" />
              <Crosshair width="66" height="66" />
            </div>
            <div className={styles.definitionCopy}>
              <p>
                기계설비란 건축물에 설치된 기계, 기구, 배관, 그 밖에 건축물의 성능을
                유지하기 위한 설비를 의미합니다. 전문가의 체계적인 성능점검을 통해
                건축물의 사용 수명을 연장하고, 안전하고 쾌적한 사업 환경을 조성할 수
                있습니다.
              </p>
              <div className={styles.definitionTerms} aria-hidden="true">
                <span>건축물</span><span>기계·기구</span><span>배관</span><span>설비</span>
              </div>
            </div>
          </section>

          <section className={styles.block} aria-labelledby="values-heading">
            <ContentHeading number="02" title="왜 필요한가요?" id="values-heading" />
            <div className={styles.values}>
              {VALUES.map((value, index) => (
                <div key={value.title} className={styles.value}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")} / VALUE</span>
                  <h3>{value.title}</h3>
                  {value.note && <p>({value.note})</p>}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.block} aria-labelledby="facilities-heading">
            <ContentHeading number="03" title="기계설비 성능점검 대상 (12종)" id="facilities-heading" />
            <div className={styles.facilities}>
              {FACILITY_TYPES.map((facility, index) => (
                <figure key={facility} className={styles.facility}>
                  <div className={styles.facilityImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/facilities/f${String(index + 1).padStart(2, "0")}.jpg`} alt={facility} loading="lazy" />
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <figcaption>{facility}</figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.note}>
              * 건축물 등에 설치된 기계·기구·배관 그 밖의 건축물 등의 성능을 유지하기 위한 설비
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
