import PageBanner from "@/components/PageBanner";

export const metadata = { title: "관리주체의 의무사항" };

const SELECTION = [
  ["연면적 6만㎡ 이상 / 3천세대 이상 공동주택", "특급·보조", "1명·1명", "2021.4.17~"],
  ["연면적 3만~6만㎡ / 2천~3천세대 공동주택", "고급·보조", "1명·1명", "2021.4.17~"],
  ["연면적 1.5만~3만㎡ / 1천~2천세대 / 공공건축물 등", "중급", "1명", "2022.4.17~"],
  ["연면적 1만~1.5만㎡ / 500~1천세대 / 300~500세대 지역·중앙난방", "초급", "1명", "2023.4.17~"],
];

const FINE500 = [
  "유지관리기준을 준수하지 않은 자",
  "점검기록을 작성하지 않거나 거짓 작성한 자",
  "점검기록을 보존하지 않은 자",
  "기계설비유지관리자를 선임하지 않은 자",
];

const FINE100 = [
  "착공 전 확인·사용 전 검사 자료를 제출하지 않은 자",
  "점검기록을 제출하지 않은 자",
  "유지관리교육을 받지 않은 사람을 해임하지 않은 자",
  "유지관리자 선·해임을 신고하지 않거나 거짓 신고한 자",
  "유지관리교육을 받지 않은 유지관리자",
];

export default function ObligationsPage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="관리주체의 의무사항" />
      <section className="section">
        <div className="container-x max-w-4xl space-y-14">
          {/* 1 */}
          <div>
            <h2 className="h2">1. 기계설비의 기술기준 준수</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <b>착공 전 확인</b> — 발주자는 공사 시작 전, 기계설비 설계도서가
                기술기준에 적합한지 확인을 받아야 합니다.
              </li>
              <li>
                <b>사용 전 검사</b> — 발주자는 공사 완료 시 사용 전 검사를 받은
                후 기계설비를 사용해야 합니다.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">
              관할기관: 특별자치시장, 특별자치도지사, 시장, 군수, 구청장(자치구)
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="h2">2. 기계설비의 유지관리기준 준수</h2>
            <p className="mt-4 text-slate-700">
              <b>책임기계설비유지관리자 선임</b> — 관리주체는 대상 건축물의
              세대수·연면적에 따라 유지관리자를 선임하여 현장에 상주시켜야
              합니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="border border-slate-200 px-3 py-2 text-left">대상 건축물</th>
                    <th className="border border-slate-200 px-3 py-2">자격</th>
                    <th className="border border-slate-200 px-3 py-2">인원</th>
                    <th className="border border-slate-200 px-3 py-2">적용시기</th>
                  </tr>
                </thead>
                <tbody>
                  {SELECTION.map((r) => (
                    <tr key={r[0]} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-3 py-2 text-slate-700">{r[0]}</td>
                      <td className="border border-slate-200 px-3 py-2 text-center">{r[1]}</td>
                      <td className="border border-slate-200 px-3 py-2 text-center">{r[2]}</td>
                      <td className="border border-slate-200 px-3 py-2 text-center">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              기계설비법 시행일(2020.4.18) 이전부터 계속 근무한 유지관리자는
              임시관리자 자격을 발급받아 선임할 수 있으며, 퇴직 시 자격은
              소멸됩니다.
            </p>
            <div className="mt-6 space-y-2 text-slate-700">
              <p>
                <b>유지관리자 교육</b> — 선임 후 6개월 이내 선임교육, 이수일로부터
                3년이 지난 날부터 3개월 이내 보수교육. 2회 이상 교육을 받지 않으면
                해임 대상입니다.
              </p>
              <p>
                <b>성능점검 등 의무</b> — 유지관리지침서 구비, 유지관리·성능점검계획
                수립, 안전조치계획 수립, 유지관리 점검(반기별 1회 이상), 성능점검(매년
                1회 이상).
              </p>
            </div>
          </div>

          {/* 3 */}
          <div>
            <h2 className="h2">3. 법 위반 시 행정 조치사항</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="card">
                <h3 className="font-bold text-accent">500만원 이하 과태료 (법 제30조)</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {FINE500.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="font-bold text-accent">100만원 이하 과태료 (법 제30조)</h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {FINE100.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              ※ 법령 수치·조항은 게시 전 현행 시행본 기준으로 재확인이 필요합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
