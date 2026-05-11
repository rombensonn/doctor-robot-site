import { brandGroups, brands } from "../data/brands";

export const BrandsGrid = () => (
  <section className="section section-muted">
    <div className="container-px mx-auto max-w-7xl">
      <div className="section-head">
        <p className="eyebrow">Марки</p>
        <h2>Работаем с европейскими, корейскими, японскими и китайскими автомобилями</h2>
        <p>
          Основной фокус — коробки DSG, Powershift, DCT, CVT и связанные узлы трансмиссии на популярных моделях.
        </p>
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {brandGroups.map((group) => (
          <span key={group} className="badge badge-strong">
            {group}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {brands.map((brand) => (
          <div key={brand} className="brand-chip">
            {brand}
          </div>
        ))}
      </div>
    </div>
  </section>
);
