import PageBanner from "@/components/PageBanner";
import { Crosshair } from "@/components/DesignIcons";
import styles from "./organization.module.css";

export const metadata = { title: "조직도" };

const DEPARTMENTS: { name: string; team: string[] }[] = [
  { name: "경영지원실", team: ["회계관리팀"] },
  { name: "성능점검실", team: ["기계설비점검", "1·2·3·4팀"] },
  { name: "기술지원실", team: ["기술지원팀"] },
  { name: "영업지원실", team: ["영업지원팀"] },
  { name: "인사관리실", team: ["인사관리팀"] },
];

export default function OrganizationPage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="조직도" />
      <section className={`section ${styles.section}`} aria-labelledby="organization-heading">
        <div className="container-x">
          <div className={styles.intro}>
            <div>
              <span className="eyebrow">OUR ORGANIZATION</span>
              <h2 id="organization-heading">각자의 전문성,<br />하나의 기가테크.</h2>
            </div>
            <p>경영부터 현장 점검까지,<br />각 분야의 전문성을 하나로 연결합니다.</p>
          </div>

          <div className={styles.chart}>
            <div className={styles.chartHeader} aria-hidden="true">
              <span><Crosshair width="17" height="17" />GIGATECH / ORGANIZATION</span>
              <span>5개 부서</span>
            </div>

            <div className={styles.diagram}>
              <p className="sr-only">대표 산하에 경영지원실, 성능점검실, 기술지원실, 영업지원실, 인사관리실이 있으며, 감사는 대표 옆에 별도로 표시됩니다.</p>
              <div className={styles.leadership}>
                <div className={styles.executive}>
                  <span className={styles.roleLabel} aria-hidden="true">GIGATECH</span>
                  <h3>대표</h3>
                  <span className={styles.executiveMark} aria-hidden="true" />
                </div>
                <div className={styles.audit}>
                  <span className={styles.roleLabel} aria-hidden="true">AUDIT</span>
                  <h3>감사</h3>
                </div>
              </div>

              <ul className={styles.departments} aria-label="대표 산하 부서와 소속 팀">
                {DEPARTMENTS.map((department, index) => (
                  <li key={department.name} className={styles.department}>
                    <div className={styles.departmentHeading}>
                      <span className={styles.departmentIndex} aria-hidden="true">0{index + 1}</span>
                      <h3>{department.name}</h3>
                    </div>
                    <div className={styles.team}>
                      <span className={styles.teamLabel}>소속 팀</span>
                      <p>{department.team.map((line) => <span key={line}>{line}</span>)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.chartFooter} aria-hidden="true">
              <span>각 분야의 전문성으로 함께하는 기가테크</span>
              <span>GIGATECH ENGINEERING</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
