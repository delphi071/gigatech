import PageBanner from "@/components/PageBanner";
import CustomerForm from "./CustomerForm";

export const metadata = { title: "고객문의" };

export default function CustomerContactPage() {
  return (
    <>
      <PageBanner
        breadcrumb="문의"
        title="고객문의"
        description="기계설비 성능점검·유지관리에 관한 문의를 남겨주시면 담당자가 신속히 답변드립니다."
      />
      <section className="section">
        <div className="container-x max-w-2xl">
          <CustomerForm />
        </div>
      </section>
    </>
  );
}
