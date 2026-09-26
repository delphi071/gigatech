import PageBanner from "@/components/PageBanner";

export const metadata = { title: "인증서" };

export default function CertificatePage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="인증서" />
      <section className="section">
        <div className="container-x">
          <p className="max-w-2xl text-slate-700">
            기가테크는 기계설비 성능점검 업무 수행에 필요한 자격과 등록을 갖추고
            있습니다.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400"
              >
                준비중
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-400">
            ※ 인증서·등록증 원본은 자료 수령 후 게시됩니다.
          </p>
        </div>
      </section>
    </>
  );
}
