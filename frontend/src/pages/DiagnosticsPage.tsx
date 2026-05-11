import { AlertTriangle, ClipboardCheck, Gauge, Search } from "lucide-react";
import { FAQAccordion } from "../components/FAQAccordion";
import { LeadForm } from "../components/LeadForm";
import { mainFaq } from "../data/faq";

const diagnostics = [
  ["Считываем ошибки", "Проверяем коды по коробке, сцеплению, мехатронику, TCM, давлению и температуре.", Search],
  ["Сопоставляем симптомы", "Разбираем, когда появляются пинки, рывки, вибрация, пробуксовка и задержки.", AlertTriangle],
  ["Проверяем узлы", "Оцениваем сцепление, мехатроник, гидроблок, механическую часть, масло и адаптации.", Gauge],
  ["Объясняем причину", "Показываем, что именно вызывает неисправность, и согласуем следующий шаг.", ClipboardCheck],
] as const;

export const DiagnosticsPage = () => (
  <>
    <section className="page-hero">
      <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div>
          <p className="eyebrow">Диагностика</p>
          <h1>Диагностика коробки передач в Москве</h1>
          <p>
            Если коробка пинается, дергается, задерживает переключения или появились ошибки, не обязательно сразу менять
            агрегат. Сначала нужно понять, что именно вышло из строя: сцепление, мехатроник, гидроблок, механика, масло
            или адаптация.
          </p>
        </div>
        <aside className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="diagnostics" title="Записаться на диагностику" compact />
        </aside>
      </div>
    </section>

    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {diagnostics.map(([title, text, Icon]) => (
            <div key={title} className="service-tile">
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-muted">
      <div className="container-px mx-auto max-w-4xl">
        <p className="eyebrow">Без лишних замен</p>
        <h2 className="mt-3 text-3xl font-bold text-ink">Что делать, если коробка пинается</h2>
        <p className="mt-4 text-base leading-8 text-muted">
          Не стоит продолжать ездить с сильными ударами, аварийным режимом или пробуксовкой. Сначала запишите симптомы:
          когда проявляются, на холодную или на горячую, при старте или переключении. Это поможет быстрее определить
          направление проверки и понять, можно ли безопасно ездить дальше.
        </p>
      </div>
    </section>

    <FAQAccordion items={[mainFaq[0], mainFaq[1], mainFaq[4], mainFaq[9]]} title="Вопросы о диагностике" />
  </>
);
