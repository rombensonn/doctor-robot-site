import { Link } from "react-router-dom";
import { priceRows } from "../data/services";
import { LeadForm } from "./LeadForm";

type PricesTableProps = {
  showForm?: boolean;
};

export const PricesTable = ({ showForm = false }: PricesTableProps) => (
  <section className="section">
    <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
      <div>
        <div className="section-head section-head-left">
          <p className="eyebrow">Цены</p>
          <h2>Ориентиры по стоимости</h2>
          <p>
            Точная стоимость зависит от коробки, симптомов, состояния узлов и объёма работ. Перед ремонтом согласуем
            работы и стоимость.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[22px] border border-line bg-panel">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-4 font-bold sm:px-6">Услуга</th>
                <th className="px-4 py-4 text-right font-bold sm:px-6">Цена</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map(([name, rowPrice]) => (
                <tr key={name} className="border-t border-line">
                  <td className="px-4 py-4 font-semibold text-ink sm:px-6">{name}</td>
                  <td className="px-4 py-4 text-right font-bold text-ink sm:px-6">{rowPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          Если в другом сервисе уже предложили дорогую замену коробки без понятной диагностики, можно сначала получить
          консультацию и проверить реальную причину симптомов.
        </p>
        <Link className="btn btn-secondary mt-6" to="/services">
          Смотреть все услуги
        </Link>
      </div>

      {showForm && (
        <aside className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="price" title="Узнать стоимость по симптомам" compact />
        </aside>
      )}
    </div>
  </section>
);
