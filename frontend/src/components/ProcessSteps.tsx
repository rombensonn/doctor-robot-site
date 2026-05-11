const steps = [
  "Заявка или звонок",
  "Первичная консультация по симптомам",
  "Компьютерная диагностика",
  "Определение причины неисправности",
  "Согласование работ и стоимости",
  "Ремонт или замена узла",
  "Адаптация коробки",
  "Проверка результата и рекомендации",
];

export const ProcessSteps = () => (
  <section className="section section-muted">
    <div className="container-px mx-auto max-w-7xl">
      <div className="section-head">
        <p className="eyebrow">Процесс</p>
        <h2>Как проходит ремонт</h2>
        <p>Порядок понятный: от симптомов и диагностики к согласованным работам, адаптации и проверке результата.</p>
      </div>

      <ol className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="step-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step}</h3>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
