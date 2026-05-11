import { PricesTable } from "../components/PricesTable";

export const PricesPage = () => (
  <>
    <section className="page-hero page-hero-compact">
      <div className="container-px mx-auto max-w-7xl">
        <p className="eyebrow">Стоимость</p>
        <h1>Цены на ремонт коробок передач</h1>
        <p>
          Публикуем честный ориентир «от 20 000 ₽», потому что итог зависит от диагностики, состояния узлов и запчастей.
          Работы согласуются до начала ремонта.
        </p>
      </div>
    </section>
    <PricesTable showForm />
  </>
);
