import { COMPANY } from "@/lib/site";
import { ArrowUpRight, ChatIcon, Crosshair } from "./DesignIcons";

export default function ContactAside({ quote = false }: { quote?: boolean }) {
  return (
    <aside className="contact-aside">
      <Crosshair />
      <span className="eyebrow">START A CONVERSATION</span>
      <h2>{quote ? <>정확한 점검의 시작,<br />현장의 이야기를 들려주세요.</> : <>궁금한 점부터,<br />편하게 이야기하세요.</>}</h2>
      <p>{quote ? "건물과 설비에 대한 정보를 남겨주시면 필요한 점검 범위를 함께 확인하겠습니다." : "성능점검부터 유지관리까지, 현장에 필요한 내용을 담당자가 안내드립니다."}</p>
      <div className="contact-direct">
        <span>전화 상담</span><a href={"tel:" + COMPANY.tel}>{COMPANY.tel}<ArrowUpRight width="20" height="20" /></a>
        <span>이메일</span><a href={"mailto:" + COMPANY.email}>{COMPANY.email}<ArrowUpRight width="20" height="20" /></a>
      </div>
      <a className="contact-kakao" href={COMPANY.kakaoChat} target="_blank" rel="noreferrer"><ChatIcon />카카오톡으로 상담하기<ArrowUpRight width="20" height="20" /></a>
    </aside>
  );
}
