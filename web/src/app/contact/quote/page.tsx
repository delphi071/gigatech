import PageBanner from "@/components/PageBanner";
import ContactAside from "@/components/ContactAside";
import QuoteForm from "./QuoteForm";

export const metadata = { title: "견적문의" };

export default function QuoteContactPage() {
  return <><PageBanner breadcrumb="문의" title="현장에 맞는 답을 찾습니다" description="건물과 설비에 대한 정보를 남겨주시면 담당자가 확인 후 안내드립니다." /><section className="section"><div className="container-x contact-layout"><ContactAside quote /><div className="contact-form-panel"><div className="form-heading"><h2>견적문의</h2><span>* 필수 입력 항목</span></div><QuoteForm /></div></div></section></>;
}
