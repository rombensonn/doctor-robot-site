import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <section className="section min-h-[58dvh]">
    <div className="container-px mx-auto max-w-3xl">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">Страница не найдена</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        Возможно, адрес изменился. Перейдите к услугам, ценам, диагностике или контактам автосервиса.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link className="btn btn-primary" to="/services">
          Услуги
        </Link>
        <Link className="btn btn-secondary" to="/prices">
          Цены
        </Link>
        <Link className="btn btn-ghost" to="/contacts">
          Контакты
        </Link>
      </div>
    </div>
  </section>
);
