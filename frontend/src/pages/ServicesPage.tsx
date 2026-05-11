import { Link } from "react-router-dom";
import { LeadForm } from "../components/LeadForm";
import { ServicesGrid } from "../components/ServicesGrid";

export const ServicesPage = () => (
  <>
    <section className="page-hero">
      <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1>Услуги по ремонту коробок передач</h1>
          <p>
            Ремонт DSG, Powershift, DCT Hyundai Kia, вариаторов Chery, мехатроников, сцеплений, гидроблоков и связанных
            узлов трансмиссии. В каждой услуге сначала диагностика и согласование работ.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/diagnostics">
              Диагностика коробки
            </Link>
            <Link className="btn btn-secondary" to="/prices">
              Смотреть цены
            </Link>
          </div>
        </div>
        <div className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="service-page" title="Опишите симптомы" compact />
        </div>
      </div>
    </section>
    <ServicesGrid title="Все направления ремонта" intro="Выберите конкретную коробку или узел. Если точной модели не знаете, оставьте заявку — подскажем, с чего начать." />
  </>
);
