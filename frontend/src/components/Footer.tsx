import { Link } from "react-router-dom";
import { business } from "../data/business";

export const Footer = () => (
  <footer className="border-t border-line bg-[#080c12] pb-24 pt-10 md:pb-10">
    <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.4fr_1fr]">
      <div>
        <Link className="text-xl font-bold text-ink" to="/">
          Доктор Робот
        </Link>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
          Ремонт DSG, Powershift, DCT, CVT, мехатроников, сцеплений, гидроблоков и связанных узлов трансмиссии.
        </p>
      </div>

      <nav className="grid gap-2 sm:grid-cols-2" aria-label="Навигация в подвале">
        {[...business.nav, { label: "Политика конфиденциальности", href: "/privacy" }].map((item) => (
          <Link key={item.href} className="text-sm font-semibold text-muted transition hover:text-ink" to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="text-sm leading-6 text-muted">
        <p className="font-bold text-ink">{business.address}</p>
        <a className="mt-2 inline-block font-bold text-ink hover:text-white" href={business.phoneHref}>
          {business.phone}
        </a>
        <p className="mt-3">Реквизиты: [Юридическое наименование], [ИНН], [ОГРН]</p>
      </div>
    </div>
    <div className="container-px mx-auto mt-8 max-w-7xl border-t border-line pt-5 text-xs leading-5 text-muted">
      Информация на сайте носит ознакомительный характер. Точная стоимость определяется после диагностики.
    </div>
  </footer>
);
