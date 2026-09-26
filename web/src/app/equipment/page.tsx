import PageBanner from "@/components/PageBanner";
import { EQUIPMENT } from "@/lib/site";

export const metadata = { title: "점검장비" };

export default function EquipmentPage() {
  return (
    <>
      <PageBanner
        breadcrumb="장비보유현황"
        title="점검장비"
        description="기가테크는 정밀 성능점검을 위한 다양한 측정·진단 장비를 보유하고 있습니다."
      />
      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {EQUIPMENT.map((name, i) => (
              <div key={name} className="card flex flex-col items-center text-center">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/equipment/eq${String(i + 1).padStart(2, "0")}.png`}
                    alt={name}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-700">{name}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-400">
            ※ 실제 보유 모델·수량·교정 정보는 자료 수령 후 갱신됩니다.
          </p>
        </div>
      </section>
    </>
  );
}
