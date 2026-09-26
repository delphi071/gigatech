import PageBanner from "@/components/PageBanner";
import { FACILITY_TYPES } from "@/lib/site";

export const metadata = { title: "기계설비 개요" };

const VALUES: { title: string; note?: string }[] = [
  { title: "전문적인 기계설비 유지관리" },
  { title: "건축물의 사용 수명 연장" },
  { title: "쾌적하고 안전한 생활환경" },
  { title: "에너지 절약·효율화", note: "연간 약 11% 절감" },
];

export default function OverviewPage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="기계설비 개요" />
      <section className="section">
        <div className="container-x max-w-4xl">
          <h2 className="h2">기계설비란?</h2>
          <p className="mt-4 leading-relaxed text-slate-700">
            기계설비란 건축물에 설치된 기계, 기구, 배관, 그 밖에 건축물의 성능을
            유지하기 위한 설비를 의미합니다. 전문가의 체계적인 성능점검을 통해
            건축물의 사용 수명을 연장하고, 안전하고 쾌적한 사업 환경을 조성할 수
            있습니다.
          </p>

          <h3 className="mt-12 text-lg font-bold text-slate-900">
            왜 필요한가요?
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex min-h-[84px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-2 py-5 text-center"
              >
                <p className="whitespace-nowrap text-sm font-medium text-brand">
                  {v.title}
                </p>
                {v.note && (
                  <p className="mt-1 text-xs text-slate-500">({v.note})</p>
                )}
              </div>
            ))}
          </div>

          <h3 className="mt-12 text-lg font-bold text-slate-900">
            기계설비 성능점검 대상 (12종)
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {FACILITY_TYPES.map((f, i) => (
              <div
                key={f}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/facilities/f${String(i + 1).padStart(2, "0")}.jpg`}
                    alt={f}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="px-2 py-3 text-center text-sm font-medium text-slate-700">
                  {f}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">
            * 건축물 등에 설치된 기계·기구·배관 그 밖의 건축물 등의 성능을
            유지하기 위한 설비
          </p>
        </div>
      </section>
    </>
  );
}
