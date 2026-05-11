import { BrandsGrid } from "../components/BrandsGrid";
import { LeadForm } from "../components/LeadForm";

export const BrandsPage = () => (
  <>
    <section className="page-hero">
      <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div>
          <p className="eyebrow">Автомобили</p>
          <h1>Марки автомобилей</h1>
          <p>
            Работаем с европейскими, корейскими, японскими, китайскими, гибридными и электрическими автомобилями. Фокус —
            коробки DSG, Powershift, DCT, CVT и связанные узлы трансмиссии.
          </p>
        </div>
        <aside className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="brands" title="Уточнить по своей модели" compact />
        </aside>
      </div>
    </section>
    <BrandsGrid />
  </>
);
