"use client";

import { useState } from "react";
import { EQUIPMENT } from "@/lib/site";

export default function EquipmentCatalog() {
  const [query, setQuery] = useState("");
  const items = EQUIPMENT.map((name, index) => ({ name, index })).filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <>
      <div className="catalog-toolbar">
        <p aria-live="polite">{query.trim() ? "검색 결과" : "전체 점검장비"}<span>{String(items.length).padStart(2, "0")}</span></p>
        <label className="catalog-search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><span className="sr-only">장비명으로 검색</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="장비명으로 검색" /></label>
      </div>
      {items.length ? <div className="equipment-catalog">
        {items.map(({ name, index }) => (
          <figure key={name} className="catalog-item">
            <span className="catalog-number">EQ. {String(index + 1).padStart(2, "0")}</span>
            <div className="catalog-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={"/equipment/eq" + String(index + 1).padStart(2, "0") + ".png"} alt={name} width="168" height="160" loading="lazy" />
            </div>
            <figcaption><span>MEASUREMENT & DIAGNOSTICS</span><h2>{name}</h2></figcaption>
          </figure>
        ))}
      </div> : <div className="catalog-empty"><p>검색한 장비를 찾을 수 없습니다.</p><button type="button" className="text-link" onClick={() => setQuery("")}>전체 장비 보기 →</button></div>}
      <p className="catalog-note">실제 보유 모델·수량·교정 정보는 자료 수령 후 갱신됩니다. 자세한 장비 정보는 상담을 통해 안내드립니다.</p>
    </>
  );
}
