// 회사·연락 정보 (docs 요청사항.txt 기준)
export const COMPANY = {
  name: "주식회사 기가테크",
  brand: "GIGATECH",
  domain: "gigatech.kr",
  tel: "02-6325-7500",
  email: "gigatech23@daum.net",
  privacyManager: "조성윤",
  kakaoChannel: "http://pf.kakao.com/_jCNyxj",
  kakaoChat: "http://pf.kakao.com/_jCNyxj/chat",
  slogan: "기계설비 성능점검, 믿고 맡길 수 있는 기업",
};

// 상단 내비게이션 메뉴 (확정 4개)
export type MenuItem = { label: string; href: string };
export type MenuGroup = { label: string; href: string; children: MenuItem[] };

export const NAV: MenuGroup[] = [
  {
    label: "회사소개",
    href: "/about/greeting",
    children: [
      { label: "인사말", href: "/about/greeting" },
      { label: "조직도", href: "/about/organization" },
      { label: "인증서", href: "/about/certificate" },
    ],
  },
  {
    label: "주요업무",
    href: "/business/overview",
    children: [
      { label: "기계설비 개요", href: "/business/overview" },
      { label: "관리주체의 의무사항", href: "/business/obligations" },
      { label: "기계설비 성능점검", href: "/business/performance" },
      { label: "기계설비 유지관리점검", href: "/business/maintenance" },
    ],
  },
  {
    label: "장비보유현황",
    href: "/equipment",
    children: [{ label: "점검장비", href: "/equipment" }],
  },
  {
    label: "문의",
    href: "/contact/customer",
    children: [
      { label: "고객문의", href: "/contact/customer" },
      { label: "견적문의", href: "/contact/quote" },
      { label: "카카오채널", href: "/contact/kakao" },
    ],
  },
];

// 성능점검 대상 설비 12종
export const FACILITY_TYPES = [
  "열원 및 냉난방설비",
  "공기조화설비",
  "환기설비",
  "배관설비",
  "덕트설비",
  "위생기구설비",
  "급수 급탕설비",
  "오배수 통기 및 우수배수설비",
  "오수정화 및 물재이용설비",
  "보온설비",
  "자동제어설비",
  "방음·방진·내진설비",
];

// 견적문의 대상설비 체크박스 27종
export const QUOTE_FACILITIES = [
  "냉동기",
  "냉각탑",
  "축열조",
  "보일러",
  "열교환기",
  "팽창탱크",
  "펌프(냉난방)",
  "신재생(지열)",
  "신재생(태양열)",
  "신재생(연료전지)",
  "패키지 에어컨",
  "항온항습기",
  "공기조화기",
  "환기설비",
  "필터",
  "위생기구설비",
  "급수급탕설비",
  "고저수조",
  "오배수 통기 및 우수배수설비",
  "오수정화설비",
  "물재이용설비",
  "배관설비",
  "덕트설비",
  "보온설비",
  "자동제어설비",
  "장치별 관제점검",
  "방음·방진·내진설비",
];

// 보유 점검장비 20종
export const EQUIPMENT = [
  "미세먼지측정기",
  "데이터기록계",
  "적외선온도계",
  "회전계(R.P.M측정기)",
  "초음파두께측정기",
  "교류전력측정기",
  "디지털차압계",
  "초음파유량계",
  "적외선열화상카메라",
  "가스누출검출기",
  "산업용 정밀음향카메라",
  "연소가스측정기",
  "진동측정기",
  "배관내시경카메라",
  "온도/풍속/조도측정기",
  "CO/CO₂ 가스측정기",
  "누수탐지기",
  "수질분석기",
  "연소가스분석기",
  "디지털압력계",
];
