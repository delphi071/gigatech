import PageBanner from "@/components/PageBanner";
import EquipmentCatalog from "@/components/EquipmentCatalog";

export const metadata = { title: "점검장비" };

export default function EquipmentPage() {
  return <><PageBanner breadcrumb="장비보유현황" title="정밀함을 만드는 도구" description="작은 변화까지 읽어내는 측정·진단 장비. 기가테크의 점검장비를 만나보세요." /><section className="section"><div className="container-x"><EquipmentCatalog /></div></section></>;
}
