"use client";

import { useState } from "react";

const EMAIL_DOMAINS = ["직접입력", "naver.com", "daum.net", "gmail.com", "nate.com"];

export default function CustomerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [domain, setDomain] = useState(EMAIL_DOMAINS[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!fd.get("agreed")) {
      alert("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    const emailId = String(fd.get("emailId") || "").trim();
    const emailDomain =
      domain === "직접입력" ? String(fd.get("emailDomain") || "").trim() : domain;

    const payload = {
      company: fd.get("company"),
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: emailId && emailDomain ? `${emailId}@${emailDomain}` : "",
      replyMethod: fd.get("replyMethod"),
      title: fd.get("title"),
      content: fd.get("content"),
      agreed: true,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card text-center" role="status">
        <p className="text-lg font-bold text-brand">문의가 정상 접수되었습니다.</p>
        <p className="mt-2 text-slate-600">담당자가 확인 후 연락드리겠습니다.</p>
        <button className="btn-outline mt-6" onClick={() => setStatus("idle")}>
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form customer-form">
      <div>
        <label htmlFor="inquiry-company" className="field-label">회사명 *</label>
        <input id="inquiry-company" name="company" required className="field-input" autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="inquiry-name" className="field-label">성함 / 직급 *</label>
        <input id="inquiry-name" name="name" required className="field-input" />
      </div>
      <div>
        <label htmlFor="inquiry-phone" className="field-label">연락처 *</label>
        <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" required placeholder="010-0000-0000" className="field-input" />
      </div>
      <div>
        <label htmlFor="inquiry-email" className="field-label">이메일 *</label>
        <div className="email-input-row">
          <input id="inquiry-email" name="emailId" aria-label="이메일 아이디" required className="field-input" />
          <span>@</span>
          <input
            name="emailDomain"
            aria-label="이메일 도메인"
            disabled={domain !== "직접입력"}
            value={domain !== "직접입력" ? domain : undefined}
            className="field-input disabled:bg-slate-100"
          />
          <select
            aria-label="이메일 도메인 선택"
            className="field-input w-32"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            {EMAIL_DOMAINS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="field-label">수신방법 *</label>
        <div className="flex flex-wrap gap-5 text-sm" role="group" aria-label="수신방법">
          {[
            ["phone", "전화요망"],
            ["email", "이메일"],
            ["visit", "방문요청"],
          ].map(([v, l], i) => (
            <label key={v} className="flex items-center gap-1.5">
              <input type="radio" name="replyMethod" value={v} defaultChecked={i === 0} required />
              {l}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-title" className="field-label">제목 *</label>
        <input id="inquiry-title" name="title" required className="field-input" />
      </div>
      <div>
        <label htmlFor="inquiry-content" className="field-label">내용</label>
        <textarea id="inquiry-content" name="content" rows={6} className="field-input" placeholder="궁금한 내용이나 현장 상황을 알려주세요." />
      </div>

      <PrivacyConsent />

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "전송 중..." : "등록하기"}
      </button>
    </form>
  );
}

function PrivacyConsent() {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-700">개인정보 수집 및 이용 안내</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500">
        <li>수집 항목: 이름, 이메일, 전화번호, 회사명 등</li>
        <li>이용 목적: 문의 내용 확인 및 신속·정확한 상담, 고객 불만 처리</li>
        <li>이용 기간: 서비스 이용기간 동안 보관하며 그 외 목적으로 사용하지 않음</li>
      </ul>
      <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" name="agreed" /> 개인정보 수집 및 이용에 동의합니다.
      </label>
    </div>
  );
}
