import PageBanner from "@/components/PageBanner";
import ContactAside from "@/components/ContactAside";
import CustomerForm from "./CustomerForm";

export const metadata = { title: "고객문의" };

export default function CustomerContactPage() {
  return <><PageBanner breadcrumb="문의" title="대화에서 시작하는 신뢰" description="기계설비 성능점검·유지관리에 관한 문의를 남겨주세요." /><section className="section"><div className="container-x contact-layout"><ContactAside /><div className="contact-form-panel"><div className="form-heading"><h2>고객문의</h2><span>* 필수 입력 항목</span></div><CustomerForm /></div></div></section></>;
}
