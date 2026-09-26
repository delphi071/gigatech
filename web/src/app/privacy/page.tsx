import PageBanner from "@/components/PageBanner";
import { ArrowUpRight } from "@/components/DesignIcons";
import { ContentHeading, ContentNavigation } from "@/components/EditorialContent";
import styles from "@/components/EditorialContent.module.css";
import { COMPANY } from "@/lib/site";

export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <>
      <PageBanner title="개인정보처리방침" />
      <div className={styles.page}>
        <div className={`container-x ${styles.documentLayout}`}>
          <ContentNavigation title="개인정보 처리 안내" items={[
            { id: "privacy-collection", label: "수집 항목" },
            { id: "privacy-purpose", label: "수집·이용 목적" },
            { id: "privacy-retention", label: "보유·이용 기간" },
            { id: "privacy-contact", label: "개인정보처리담당자" },
          ]} />
          <div className={styles.documentBody}>
            <div className={styles.policyIntro}>
              <div className={styles.policyHeading}><span className="eyebrow">PRIVACY POLICY</span><span className={styles.draft}>초안</span></div>
              <p className={styles.copy}>
                {COMPANY.name}(이하 &lsquo;회사&rsquo;)는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.
                아래 내용은 초안이며 정식 방침은 추후 확정·게시됩니다.
              </p>
            </div>
            <div className={styles.policySections}>
              <section id="privacy-collection" className={styles.policySection} aria-labelledby="collection-heading">
                <ContentHeading number="01" title="수집 항목" id="collection-heading" />
                <p className={styles.copy}>이름, 이메일, 전화번호, 회사명(건물명), 문의·견적 내용, 첨부파일 등</p>
              </section>
              <section id="privacy-purpose" className={styles.policySection} aria-labelledby="purpose-heading">
                <ContentHeading number="02" title="수집·이용 목적" id="purpose-heading" />
                <p className={styles.copy}>문의·견적 내용 확인 및 신속·정확한 상담, 고객 불만 처리</p>
              </section>
              <section id="privacy-retention" className={styles.policySection} aria-labelledby="retention-heading">
                <ContentHeading number="03" title="보유·이용 기간" id="retention-heading" />
                <p className={styles.copy}>
                  수집된 정보는 서비스 이용기간 동안 보관하며, 그 외 다른 목적으로 사용하지 않습니다.
                </p>
              </section>
              <section id="privacy-contact" className={styles.policySection} aria-labelledby="privacy-contact-heading">
                <ContentHeading number="04" title="개인정보처리담당자" id="privacy-contact-heading" />
                <div className={styles.policyContact}>
                  <p>{COMPANY.privacyManager}</p>
                  <a href={`mailto:${COMPANY.email}`}><span>{COMPANY.email}</span><ArrowUpRight width="19" height="19" /></a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
