import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata = { title: "기계설비 유지관리점검" };

const ITEMS = [
  {
    title: "정기 현장점검",
    desc: "매월 1회 현장을 방문하여 기계설비 상태를 점검합니다.",
  },
  {
    title: "결과보고서 대행",
    desc: "점검 후 유지관리자가 제출해야 하는 결과보고서 작성을 대행합니다.",
  },
  {
    title: "법정 의무 지원",
    desc: "반기별 유지관리 점검, 연 1회 성능점검 등 관리주체의 법정 의무 이행을 지원합니다.",
  },
];

export default function MaintenancePage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="기계설비 유지관리점검" />
      <section className="section">
        <div className="container-x max-w-4xl">
          <p className="text-lg text-slate-700">
            기가테크는 성능점검과 함께 <b>기계설비 유지관리점검</b>을 대행합니다.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {ITEMS.map((i) => (
              <div key={i.title} className="card">
                <h3 className="font-bold text-brand">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{i.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            ※ 실제 제공 범위·주기·계약 형태는 상담을 통해 안내드립니다.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/contact/customer" className="btn-primary">
              상담 문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
