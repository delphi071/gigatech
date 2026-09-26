import PageBanner from "@/components/PageBanner";
import QuoteForm from "./QuoteForm";

export const metadata = { title: "견적문의" };

export default function QuoteContactPage() {
  return (
    <>
      <PageBanner
        breadcrumb="문의"
        title="견적문의"
        description="성능점검·유지관리 견적을 요청하세요. 양식을 작성해 첨부하시면 보다 정확한 상담을 받으실 수 있습니다."
      />
      <section className="section">
        <div className="container-x max-w-2xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
