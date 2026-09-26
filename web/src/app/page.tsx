import Link from "next/link";
import { COMPANY, EQUIPMENT, FACILITY_TYPES } from "@/lib/site";

const VALUES = [
  {
    title: "전문적인 기계설비 유지관리",
    desc: "환기·냉난방·급수설비 등을 전문가가 체계적으로 관리합니다.",
  },
  {
    title: "건축물의 사용 수명 연장",
    desc: "주기적인 검사와 교체로 언제나 쾌적한 환경을 유지합니다.",
  },
  {
    title: "쾌적하고 안전한 생활환경",
    desc: "안전한 기계설비 운영으로 이용자의 생명과 안전을 지킵니다.",
  },
  {
    title: "에너지 절약·효율화",
    desc: "효율적인 운영으로 연간 건축물 에너지 비용을 약 11% 절감합니다.",
  },
];

const STEPS = [
  "관리주체·유지관리자 협의",
  "설비 현황 파악·현장진단",
  "계약체결 및 일정 협의",
  "성능점검 실시 및 결과 피드백",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="container-x py-24 sm:py-32">
          <p className="mb-3 text-sm font-semibold text-white/80">
            {COMPANY.slogan}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            기계설비 성능점검,
            <br />
            {COMPANY.name}가 정확하게 대행합니다.
          </h1>
          <p className="mt-5 max-w-2xl text-white/85">
            전문 인력과 검증된 점검 장비를 바탕으로 건축물의 안전과 에너지
            효율을 지킵니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/customer" className="btn bg-white text-brand hover:bg-slate-100">
              성능점검 문의하기
            </Link>
            <Link href="/contact/quote" className="btn border border-white/60 text-white hover:bg-white/10">
              견적 요청하기
            </Link>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="section">
        <div className="container-x">
          <h2 className="h2 text-center">왜 기계설비 성능점검이 필요한가요?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card">
                <h3 className="text-base font-bold text-brand">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요업무 */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <h2 className="h2 text-center">주요업무</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Link href="/business/performance" className="card transition hover:shadow-md">
              <h3 className="text-lg font-bold text-slate-900">기계설비 성능점검</h3>
              <p className="mt-2 text-sm text-slate-600">
                법정 성능점검을 검토사항 확인부터 결과보고서까지 정확하게
                대행합니다.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">
                자세히 보기 →
              </span>
            </Link>
            <Link href="/business/maintenance" className="card transition hover:shadow-md">
              <h3 className="text-lg font-bold text-slate-900">
                기계설비 유지관리점검
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                매월 현장을 방문하여 점검하고, 유지관리자 결과보고서를
                대행합니다.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">
                자세히 보기 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 성능점검 대상 설비 */}
      <section className="section">
        <div className="container-x">
          <h2 className="h2 text-center">기계설비 성능점검 대상</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {FACILITY_TYPES.map((f) => (
              <div
                key={f}
                className="rounded-lg border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-slate-700"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 절차 */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <h2 className="h2 text-center">성능점검 진행 절차</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s} className="card text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm font-medium text-slate-700">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 보유 장비 프리뷰 */}
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="h2">보유 점검장비</h2>
            <Link href="/equipment" className="text-sm font-semibold text-brand">
              전체보기 →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {EQUIPMENT.slice(0, 12).map((e) => (
              <span
                key={e}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="bg-brand">
        <div className="container-x flex flex-col items-center gap-5 py-16 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            성능점검이 필요하신가요?
          </h2>
          <p className="text-white/85">지금 상담을 요청하시면 담당자가 신속히 안내드립니다.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact/quote" className="btn bg-white text-brand hover:bg-slate-100">
              견적문의
            </Link>
            <a href={COMPANY.kakaoChat} target="_blank" rel="noreferrer" className="btn-kakao">
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
