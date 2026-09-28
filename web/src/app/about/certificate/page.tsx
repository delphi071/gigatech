import PageBanner from "@/components/PageBanner";
import styles from "./certificate.module.css";

export const metadata = { title: "인증서" };

const CERTIFICATES = [
  { title: "기계설비성능점검업 등록증", image: "performance-registration.png" },
  { title: "정보통신공사업 등록증", image: "ict-registration-1.png" },
  { title: "여성기업 확인서", image: "women-enterprise-1.png" },
  { title: "중소기업 확인서", image: "sme-certificate-1.png" },
];

export default function CertificatePage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="신뢰의 근거를 담습니다" description="기가테크의 인증 및 등록 자료를 안내합니다." />
      <section className="section" aria-label="인증서 및 등록증"><div className="container-x">
        <div className={styles.grid}>
          {CERTIFICATES.map((certificate, index) => (
            <figure key={certificate.image} className={styles.card}>
              <figcaption className={styles.caption}><span>{String(index + 1).padStart(2, "0")}</span><h2>{certificate.title}</h2></figcaption>
              <div className={styles.preview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/certificates/${certificate.image}`} alt={`주식회사 기가테크 ${certificate.title}`} loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              </div>
            </figure>
          ))}
        </div>
      </div></section>
    </>
  );
}
