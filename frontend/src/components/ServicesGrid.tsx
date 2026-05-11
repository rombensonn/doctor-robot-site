import { catalogCards, services } from "../data/services";
import { ServiceCard } from "./ServiceCard";

type ServicesGridProps = {
  limit?: number;
  title?: string;
  intro?: string;
};

export const ServicesGrid = ({
  limit,
  title = "Что ремонтируем",
  intro = "Сфокусированы на сложных коробках передач, где важны диагностика, правильная адаптация и понимание конкретной неисправности.",
}: ServicesGridProps) => {
  const items = (limit ? catalogCards.slice(0, limit) : catalogCards).filter((item) => item.slug !== "services" || !limit);

  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="section-head">
          <p className="eyebrow">Услуги</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(limit ? services.slice(0, limit) : items).map((service) => (
            <ServiceCard key={`${service.slug}-${service.title}`} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
