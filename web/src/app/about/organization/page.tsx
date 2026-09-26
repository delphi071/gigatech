import PageBanner from "@/components/PageBanner";

export const metadata = { title: "조직도" };

const DEPARTMENTS: { name: string; team: string[] }[] = [
  { name: "경영지원실", team: ["회계관리팀"] },
  { name: "성능점검실", team: ["기계설비점검", "1·2·3·4팀"] },
  { name: "기술지원실", team: ["기술지원팀"] },
  { name: "영업지원실", team: ["영업지원팀"] },
  { name: "인사관리실", team: ["인사관리팀"] },
];

export default function OrganizationPage() {
  return (
    <>
      <PageBanner breadcrumb="회사소개" title="조직도" />
      <section className="section">
        <div className="container-x max-w-4xl">
          {/* 대표 */}
          <div className="flex justify-center">
            <div className="relative rounded-lg border-2 border-transparent bg-brand px-10 py-4 text-center font-bold text-white">
              대표
              {/* 대표–감사 연결선 (다른 라인과 동일하게: 연한 색 + 양쪽 간격) */}
              <span className="absolute left-full top-1/2 ml-3 h-px w-10 -translate-y-1/2 bg-slate-300" />
              <span className="absolute left-full top-1/2 ml-16 flex -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-lg border-2 border-brand bg-brand-light px-10 py-4 font-bold text-brand">
                감사
              </span>
            </div>
          </div>

          <div className="mx-auto my-4 h-8 w-px bg-slate-300" />

          {/* 부서 */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {DEPARTMENTS.map((d) => (
              <div key={d.name} className="text-center">
                <div className="rounded-lg border-2 border-brand bg-brand-light px-3 py-3 font-bold text-brand">
                  {d.name}
                </div>
                <div className="mx-auto my-2 h-5 w-px bg-slate-300" />
                <div className="flex min-h-[68px] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600">
                  <span>
                    {d.team.map((line, idx) => (
                      <span key={idx} className="block leading-snug">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
