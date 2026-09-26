/** Original vector concept illustration; not a photograph of a company project. */
export default function BuildingGraphic() {
  return (
    <div className="building-scene">
      <div className="scene-caption"><span>BUILDING SYSTEMS</span><span>FIG. 01</span></div>
      <svg className="building-graphic" viewBox="0 0 600 590" role="img" aria-labelledby="building-title building-description">
        <title id="building-title">건축물과 기계설비의 연결을 표현한 입체 일러스트</title>
        <desc id="building-description">건물의 층별 구조와 공조·배관의 흐름을 도면처럼 표현한 개념도입니다.</desc>
        <defs>
          <pattern id="scene-grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .55 -1 .55 300 10)"><path d="M40 0H0v40" fill="none" stroke="white" strokeOpacity=".13" strokeWidth=".8" /></pattern>
          <linearGradient id="building-front" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d6e4f0" /><stop offset="1" stopColor="#94b4d9" /></linearGradient>
          <linearGradient id="building-side" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#3469ad" /><stop offset="1" stopColor="#123f81" /></linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9cd7eb" stopOpacity=".9" /><stop offset="1" stopColor="#6390bb" stopOpacity=".4" /></linearGradient>
        </defs>
        <path d="M0 270 300 100 600 270v220L300 660 0 490Z" fill="url(#scene-grid)" />
        <ellipse cx="305" cy="476" rx="208" ry="80" fill="#103ca9" opacity=".55" />
        <path d="m66 425 235-127 237 127-237 130Z" fill="#2b61db" stroke="#82a9ff" />
        <path d="m66 425 235 130v9L66 434Zm235 130 237-130v9L301 564Z" fill="#1441a8" stroke="#82a9ff" strokeOpacity=".5" />
        <g className="building-model">
          <path d="m156 158 148 82v253l-148-82Z" fill="url(#building-front)" />
          <path d="m304 240 151-83v254l-151 82Z" fill="url(#building-side)" />
          {[0, 1, 2, 3, 4, 5].map(floor => (
            <g key={floor}>
              <path d={`M164 ${168 + floor * 40} 296 ${241 + floor * 40}v27L164 ${195 + floor * 40}Z`} fill="url(#glass)" stroke="#e3f5ff" strokeWidth=".8" />
              {[0, 1, 2, 3, 4].map(window => <path key={window} d={`M${184 + window * 23} ${179 + floor * 40 + window * 12.75}v27`} stroke="#f1f7ff" strokeWidth="2" />)}
              <path d={`m310 ${239 + floor * 40} 137-76v28l-137 76Z`} fill="#174b92" stroke="#7fafdf" strokeWidth=".8" />
              <path d={`m315 ${255 + floor * 40} 126-70`} stroke="#7fafdf" strokeOpacity=".65" />
              <path d={`m156 ${191 + floor * 40} 148 82 151-83v5l-151 84-148-82Z`} fill="#d8e7f4" />
            </g>
          ))}
          <path d="m150 157 154-85 157 85-157 87Z" fill="#f0f4f6" stroke="#fff" strokeWidth="1.5" />
          <path d="m150 157 154 87 157-87v10l-157 87-154-87Z" fill="#b3c7de" />
          <path d="m171 152 133-72 135 73-135 74Z" fill="none" stroke="#9bafc4" />
          <path d="m171 152 133 75v-7l135-74" fill="none" stroke="#fff" strokeWidth="2" />
          <g>
            <path d="m252 136 40-22 68 37-41 23Z" fill="#b7c8d9" />
            <path d="m252 119 40-22 68 37-41 23Z" fill="#f9fbfc" stroke="#9aadc2" />
            <path d="m252 119 67 38v17l-67-38Z" fill="#a4b9cb" /><path d="m319 157 41-23v17l-41 23Z" fill="#708ca7" />
            <ellipse cx="290" cy="122" rx="17" ry="9" fill="#6c88a1" /><ellipse cx="323" cy="141" rx="17" ry="9" fill="#6c88a1" />
            <path d="m278 116 24 12m-23 0 23-12m9 19 24 12m-23 0 23-12" stroke="#c8d8e2" strokeWidth="2" />
            <path d="m220 151 19-10 21 12v15l-18 10-22-12Z" fill="#a4b9cb" /><path d="m220 151 19-10 21 12-18 10Z" fill="#edf4f7" /><path d="M242 163v15" stroke="#6f8ea7" />
          </g>
          <g fill="none" stroke="#d8f478" strokeWidth="5" strokeLinejoin="round"><path d="m276 181 28 16 72-40v301l-54 30" /><path d="m432 204-36 20v190l-58 33" /><path d="m376 262-49 28v74l72-40" /></g>
          <path className="system-flow" d="m276 181 28 16 72-40v301l-54 30" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 33" />
          <g fill="#d8f478" stroke="#204ca8" strokeWidth="2"><circle cx="376" cy="262" r="6" /><circle cx="396" cy="324" r="6" /><circle cx="376" cy="410" r="6" /></g>
          <path d="m142 322 162 90 166-93v27l-166 92-162-89Z" fill="#d8f478" fillOpacity=".14" stroke="#d8f478" strokeOpacity=".65" />
          <path d="M304 254v239M156 158v253M455 157v254" stroke="#edf7ff" strokeWidth="2" />
        </g>
        <g fill="none" stroke="#e5efff"><path d="M277 125h-79l-48-29H74" /><circle cx="277" cy="125" r="4" fill="#d8f478" /><path d="M407 293h65l34-25h51" /><circle cx="407" cy="293" r="4" fill="#d8f478" /><path d="M255 405H129l-40 28H45" /><circle cx="255" cy="405" r="4" fill="#d8f478" /></g>
        <g fill="white" fontSize="10" fontFamily="monospace" letterSpacing="1"><text x="74" y="83">01 / AIRFLOW</text><text x="479" y="256">02 / CONTROL</text><text x="44" y="453">03 / CIRCULATION</text></g>
        <g stroke="#d8f478" fill="none" strokeWidth="1.2"><path d="M52 51h20m-10-10v20M529 508h20m-10-10v20" /></g>
      </svg>
      <div className="scene-footer"><span className="scene-dot" /><span>건물의 모든 흐름을 살피는 기술</span><span aria-hidden="true">↗</span></div>
    </div>
  );
}
