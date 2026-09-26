"use client";

import { useState } from "react";

export default function PasswordChange() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (nw !== confirm) {
      setMsg({ ok: false, text: "새 비밀번호가 일치하지 않습니다." });
      return;
    }
    if (nw.length < 6) {
      setMsg({ ok: false, text: "새 비밀번호는 6자 이상이어야 합니다." });
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: cur, newPassword: nw }),
    });
    setLoading(false);
    const j = await res.json().catch(() => ({}));
    if (res.ok) {
      setMsg({ ok: true, text: "비밀번호가 변경되었습니다." });
      setCur("");
      setNw("");
      setConfirm("");
    } else {
      setMsg({ ok: false, text: j.error || "변경에 실패했습니다." });
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="btn-outline text-sm">
        비밀번호 변경
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
          <p className="mb-3 text-sm font-bold text-slate-800">관리자 비밀번호 변경</p>
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={cur}
              onChange={(e) => setCur(e.target.value)}
              className="field-input"
              autoComplete="current-password"
              required
            />
            <input
              type="password"
              placeholder="새 비밀번호 (6자 이상)"
              value={nw}
              onChange={(e) => setNw(e.target.value)}
              className="field-input"
              autoComplete="new-password"
              required
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="field-input"
              autoComplete="new-password"
              required
            />
            {msg && (
              <p className={`text-xs ${msg.ok ? "text-green-600" : "text-red-600"}`}>
                {msg.text}
              </p>
            )}
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="btn-primary flex-1 py-2 text-sm">
                {loading ? "변경 중..." : "변경"}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-outline py-2 text-sm"
              >
                닫기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
