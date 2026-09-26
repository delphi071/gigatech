import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata = { title: "기계설비 성능점검" };

const REVIEW = [
  {
    title: "1. 기계설비 시스템 검토",
    items: [
      "유지관리지침서의 적정성",
      "기계설비 시스템의 작동 상태",
      "점검대상 현황표의 설계값·측정값 일치 여부",
    ],
  },
  {
    title: "2. 성능개선 계획 수립",
    items: [
      "내구연수에 따른 노후도",
      "성능점검표에 따른 부적합·개선사항",
      "개선 필요성 및 연도별 세부개선 계획",
    ],
  },
  {
    title: "3. 에너지사용량 검토",
    items: ["냉난방설비 등 분류별 에너지 사용량"],
  },
];

const FLOW = [
  "관리주체(유지관리자 대상) 진단시행 안내",
  "성능점검 대상 협의·설비 현황 파악",
  "계약체결 및 향후 일정 공유",
  "기계설비 성능점검 실시 및 결과 피드백",
];

const STEPS = [
  {
    step: "STEP 01",
    title: "사전 현장조사",
    items: [
      "관리주체 현황 파악 및 자료 요청",
      "기초자료 조사·Review 요청",
      "점검 협조 확인 및 자료 요청",
      "설비 현장 및 필요 장비 확인 협의",
    ],
  },
  {
    step: "STEP 02",
    title: "현장진단분석",
    items: [
      "기계설비 시스템 검토(지침서 적정성·작동 상태)",
      "성능개선 계획 수립(노후도·부적합 도출·개선계획)",
      "에너지 사용량 검토",
    ],
  },
  {
    step: "STEP 03",
    title: "최종 보고서 제출",
    items: [
      "성능개선방법 상세분석",
      "성능점검 결과보고서 작성",
      "관리주체 의견 수렴·검토(반영)",
    ],
  },
];

export default function PerformancePage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="기계설비 성능점검" />
      <section className="section">
        <div className="container-x max-w-5xl space-y-14">
          {/* 검토사항 */}
          <div>
            <h2 className="h2">성능점검 시 검토사항</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {REVIEW.map((r) => (
                <div key={r.title} className="card">
                  <h3 className="font-bold text-brand">{r.title}</h3>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {r.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 대행 절차 */}
          <div>
            <h2 className="h2">성능점검 대행 절차</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FLOW.map((f, i) => (
                <div key={f} className="card">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-700">{f}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.step} className="rounded-xl border border-slate-200 bg-white">
                  <div className="rounded-t-xl bg-brand px-5 py-3 text-white">
                    <span className="text-xs font-semibold opacity-80">{s.step}</span>
                    <p className="text-base font-bold">{s.title}</p>
                  </div>
                  <ul className="space-y-2 px-5 py-4 text-sm text-slate-700">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand">•</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/contact/quote" className="btn-primary">
              견적 문의하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
