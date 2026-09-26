"use client";

import { useState } from "react";
import Link from "next/link";
import { FACILITY_TYPES } from "@/lib/site";
import { ArrowUpRight } from "./DesignIcons";

const GROUPS = [
  { label: "공기와 온도", english: "AIR & TEMPERATURE", indexes: [0, 1, 2, 4] },
  { label: "물과 위생", english: "WATER & SANITATION", indexes: [5, 6, 7, 8] },
  { label: "연결과 제어", english: "CONNECTION & CONTROL", indexes: [3, 9, 10, 11] },
];

export default function FacilityExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="facility-explorer">
      <div className="facility-toolbar">
        <div className="facility-filters" role="group" aria-label="설비 분류 선택">
          {GROUPS.map((group, index) => <button key={group.label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{group.label}</button>)}
        </div>
        <Link href="/business/overview" className="text-link">전체 설비 보기<ArrowUpRight width="17" height="17" /></Link>
      </div>
      <div className="facility-grid" aria-live="polite" aria-atomic="true">
        {GROUPS[active].indexes.map(index => (
          <figure key={index} className="facility-item">
            <div className="facility-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={"/facilities/f" + String(index + 1).padStart(2, "0") + ".jpg"} alt={FACILITY_TYPES[index]} width="500" height="300" loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <figcaption><span>{GROUPS[active].english}</span><h3>{FACILITY_TYPES[index]}</h3></figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
