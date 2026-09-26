import PageBanner from "@/components/PageBanner";
import { COMPANY } from "@/lib/site";

export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <>
      <PageBanner title="개인정보처리방침" />
      <section className="section">
        <div className="container-x max-w-3xl space-y-6 text-sm leading-relaxed text-slate-700">
          <p>
            {COMPANY.name}(이하 &lsquo;회사&rsquo;)는 이용자의 개인정보를
            중요시하며, 관련 법령을 준수합니다. 아래 내용은 초안이며 정식 방침은
            추후 확정·게시됩니다.
          </p>
          <div>
            <h2 className="font-bold text-slate-900">1. 수집 항목</h2>
            <p>이름, 이메일, 전화번호, 회사명(건물명), 문의·견적 내용, 첨부파일 등</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900">2. 수집·이용 목적</h2>
            <p>문의·견적 내용 확인 및 신속·정확한 상담, 고객 불만 처리</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900">3. 보유·이용 기간</h2>
            <p>
              수집된 정보는 서비스 이용기간 동안 보관하며, 그 외 다른 목적으로
              사용하지 않습니다.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900">4. 개인정보처리담당자</h2>
            <p>
              {COMPANY.privacyManager} ({COMPANY.email})
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
