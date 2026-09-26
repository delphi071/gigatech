# 기가테크 홈페이지 (gigatech-web)

Next.js(App Router) + Tailwind + Prisma(Postgres) 기반. Vercel 배포 전제.

## 스택
- **Next.js 14 / TypeScript / Tailwind CSS**
- **Prisma + PostgreSQL** (Vercel Postgres/Neon) — 문의·견적 접수 저장
- **@vercel/blob** — 견적문의 첨부파일
- **Resend** — 접수 알림 메일
- 관리자 인증: 비밀번호 + 서명 쿠키(HMAC)

## 로컬 실행
```bash
npm install
cp .env.example .env       # 값 채우기 (DATABASE_URL 등)
npm run db:push            # DB 스키마 반영 (Postgres 필요)
npm run dev                # http://localhost:3000
```
> DB 없이 화면만 볼 경우: 폼 제출/관리자 목록은 DB 연결 후 동작합니다.

## 환경변수 (.env)
| 변수 | 설명 |
| --- | --- |
| DATABASE_URL | Postgres 연결 문자열 |
| ADMIN_PASSWORD | `/admin` 로그인 비밀번호 |
| ADMIN_SECRET | 관리자 세션 쿠키 서명 시크릿(긴 랜덤값) |
| BLOB_READ_WRITE_TOKEN | Vercel Blob 토큰(Vercel 연결 시 자동) |
| RESEND_API_KEY | 메일 발송 키(없으면 알림 skip) |
| MAIL_TO / MAIL_FROM | 알림 수신/발신 주소 |

## 주요 경로
- 공개: `/`, `/about/*`, `/business/*`, `/equipment`, `/contact/*`, `/privacy`
- API: `POST /api/inquiry`, `POST /api/quote`, `POST /api/admin/login|logout`
- 관리자: `/admin` (로그인: `/admin/login`)

## Vercel 배포
1. GitHub 연결 후 Root Directory = `web`
2. Vercel Postgres + Blob 스토리지 연결(환경변수 자동)
3. `ADMIN_PASSWORD`, `ADMIN_SECRET`, `RESEND_API_KEY`, `MAIL_TO` 추가
4. 배포 후 `npm run db:push`(또는 마이그레이션)로 테이블 생성
5. 커스텀 도메인 `gigatech.kr` 연결 → HTTPS 자동

## 남은 작업(콘텐츠)
- 워터마크 이미지(검토사항·대행절차·법위반) 정식본 교체
- 인증서 원본, 장비 사진/모델·수량, 회사 기본정보(대표자·주소·사업자번호)
- 법령 수치·조항 현행본 재확인, 개인정보처리방침 전문
