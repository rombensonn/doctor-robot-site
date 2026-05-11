import { ArrowRight, CheckCircle2, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { advantages, business } from "../data/business";
import { LeadForm } from "./LeadForm";

type HeroProps = {
  onOpenLeadModal: () => void;
};

export const Hero = ({ onOpenLeadModal }: HeroProps) => (
  <section className="hero-grid border-b border-line/70">
    <div className="container-px mx-auto grid max-w-7xl gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-18">
      <div>
        <p className="eyebrow">Ремонт роботизированных коробок передач в Москве</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
          Ремонт DSG, Powershift, DCT и вариаторов в Москве
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Диагностика, ремонт мехатроников, замена сцепления и адаптация коробки передач. Сначала находим причину
          неисправности, потом согласуем ремонт и стоимость.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          {advantages.map((item) => (
            <span key={item} className="badge">
              <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="btn btn-primary" type="button" onClick={onOpenLeadModal}>
            Получить консультацию
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button className="btn btn-secondary" type="button" onClick={onOpenLeadModal}>
            Записаться на диагностику
          </button>
          <Link className="btn btn-ghost" to="/prices">
            Узнать стоимость ремонта
          </Link>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {[
            ["Без лишних замен", "Не меняем коробку целиком, пока не понятно, что вышло из строя.", ShieldCheck],
            ["Диагностика причины", "Проверяем ошибки, сцепление, мехатроник, давление и адаптации.", Gauge],
            ["Согласование работ", "Показываем неисправность и согласуем ремонт до начала работ.", Wrench],
          ].map(([title, text, Icon]) => (
            <div key={title as string} className="rounded-2xl border border-line bg-panel/70 p-4">
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <p className="mt-3 font-bold text-ink">{title as string}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{text as string}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5">
        <div className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-ink">Доктор Робот</span>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              {business.openNowText}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{business.address}</p>
          <div className="mt-5 grid gap-3">
            {[
              "Проверяем симптомы до разборки",
              "Показываем причину неисправности",
              "Согласуем стоимость до ремонта",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-line bg-surface/70 p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-bold text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="hero" title="Записаться на диагностику" />
        </div>
      </div>
    </div>
  </section>
);
