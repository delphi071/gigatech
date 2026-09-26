"use client";

import { useState } from "react";
import { QUOTE_FACILITIES } from "@/lib/site";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!fd.get("agreed")) {
      alert("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
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
        <p className="text-lg font-bold text-brand">견적 요청이 정상 접수되었습니다.</p>
        <p className="mt-2 text-slate-600">담당자가 확인 후 연락드리겠습니다.</p>
        <button className="btn-outline mt-6" onClick={() => setStatus("idle")}>
          추가 요청하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form quote-form">
      <div>
        <label htmlFor="quote-building" className="field-label">건물명 *</label>
        <input id="quote-building" name="building" required className="field-input" />
      </div>
      <div>
        <label htmlFor="quote-manager" className="field-label">담당자 *</label>
        <input id="quote-manager" name="manager" required className="field-input" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="quote-phone" className="field-label">연락처 *</label>
        <input id="quote-phone" name="phone" type="tel" autoComplete="tel" required placeholder="010-0000-0000" className="field-input" />
      </div>
      <div>
        <label htmlFor="quote-email" className="field-label">이메일 *</label>
        <input id="quote-email" name="email" type="email" autoComplete="email" required placeholder="name@example.com" className="field-input" />
      </div>
      <div>
        <label htmlFor="quote-address" className="field-label">주소</label>
        <input id="quote-address" name="address" className="field-input" placeholder="현장 주소" />
      </div>

      <div>
        <label className="field-label">대상설비 (해당 항목 선택)</label>
        <div className="grid grid-cols-2 gap-3 rounded-sm border border-slate-200 p-4 sm:grid-cols-3" role="group" aria-label="대상설비 선택">
          {QUOTE_FACILITIES.map((f) => (
            <label key={f} className="flex items-start gap-2 text-xs leading-relaxed text-slate-700">
              <input type="checkbox" name="targetFacilities" value={f} />
              {f}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="quote-request" className="field-label">요청사항</label>
        <textarea id="quote-request" name="request" rows={5} className="field-input" placeholder="점검 목적, 희망 일정 등 필요한 내용을 알려주세요." />
      </div>

      <div>
        <label htmlFor="quote-file" className="field-label">첨부파일</label>
        <input id="quote-file" type="file" name="file" className="field-input" />
        <p className="mt-1 text-xs text-slate-400">
          견적요청 양식을 작성해 첨부하시면 보다 정확한 상담이 가능합니다.
        </p>
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">개인정보 수집 및 이용 안내</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-500">
          <li>수집 항목: 담당자명, 이메일, 전화번호, 건물명, 주소 등</li>
          <li>이용 목적: 견적 요청 확인 및 상담</li>
          <li>이용 기간: 서비스 이용기간 동안 보관하며 그 외 목적으로 사용하지 않음</li>
        </ul>
        <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="agreed" /> 개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "전송 중..." : "등록하기"}
      </button>
    </form>
  );
}
