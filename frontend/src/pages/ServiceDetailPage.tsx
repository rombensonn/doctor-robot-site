import { AlertCircle, CheckCircle2, Link as LinkIcon, Settings, WalletCards } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FAQAccordion } from "../components/FAQAccordion";
import { LeadForm } from "../components/LeadForm";
import { ProcessSteps } from "../components/ProcessSteps";
import { getServiceBySlug } from "../data/services";

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <Navigate to="/404" replace />;

  const related = service.relatedSlugs.map(getServiceBySlug).filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="eyebrow">{service.category}</p>
            <h1>{service.h1}</h1>
            <p>{service.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="badge badge-strong">Цена {service.price}</span>
              <span className="badge">Гарантия на работы и запчасти</span>
              <span className="badge">Адаптация после ремонта</span>
            </div>
          </div>
          <aside className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
            <LeadForm
              formSource="service-page"
              title="Опишите симптомы"
              compact
              defaultTransmission={service.transmissionType}
            />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="content-card">
            <AlertCircle className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2>Когда нужна эта услуга</h2>
            <ul className="check-list">
              {service.symptoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="content-card">
            <Settings className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2>Что входит в работу</h2>
            <ul className="check-list">
              {service.works.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProcessSteps />

      <section className="section">
        <div className="container-px mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="content-card">
            <WalletCards className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2>Цена</h2>
            <p className="text-3xl font-bold text-ink">{service.price}</p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Точная стоимость зависит от коробки, симптомов, состояния узлов и объёма работ. Перед ремонтом согласуем
              работы и стоимость.
            </p>
          </div>
          <div className="content-card lg:col-span-2">
            <CheckCircle2 className="h-7 w-7 text-accent" aria-hidden="true" />
            <h2>Почему важна адаптация</h2>
            <p className="text-base leading-7 text-muted">
              После замены сцепления, мехатроника, масла или ремонта механической части блок управления должен корректно
              видеть новые параметры работы. Адаптация снижает риск повторных рывков, задержек и ошибок после ремонта.
            </p>
          </div>
        </div>
      </section>

      {service.faq && <FAQAccordion items={service.faq} title={`Вопросы по услуге «${service.shortTitle}»`} />}

      {related.length > 0 && (
        <section className="section section-muted">
          <div className="container-px mx-auto max-w-7xl">
            <div className="section-head section-head-left">
              <p className="eyebrow">Смежные услуги</p>
              <h2>Что еще может быть связано с симптомами</h2>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item!.slug} className="service-tile" to={`/services/${item!.slug}`}>
                  <LinkIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3>{item!.title}</h3>
                  <p className="text-sm leading-6 text-muted">{item!.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
