import { Phone } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { business } from "../data/business";
import { trackEvent } from "../utils/analytics";
import { MobileHeader } from "./MobileHeader";

type HeaderProps = {
  onOpenLeadModal: () => void;
};

export const Header = ({ onOpenLeadModal }: HeaderProps) => (
  <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/88 backdrop-blur-xl">
    <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">
      <Link className="group flex items-center gap-3" to="/" aria-label="Доктор Робот — на главную">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-lg font-bold text-white shadow-line">
          DR
        </span>
        <span>
          <span className="block text-lg font-bold leading-none text-ink">Доктор Робот</span>
          <span className="mt-1 block text-xs font-medium uppercase text-muted">DSG • DCT • CVT</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
        {business.nav.map((item) => (
          <NavLink
            key={item.href}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? "bg-white text-surface" : "text-muted hover:bg-white/5 hover:text-ink"
              }`
            }
            to={item.href}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden items-center gap-3 lg:flex">
        <a
          className="inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-white"
          href={business.phoneHref}
          onClick={() => trackEvent("click_phone", { place: "header" })}
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
          {business.phone}
        </a>
        <button className="btn btn-primary" type="button" onClick={onOpenLeadModal}>
          Записаться на диагностику
        </button>
      </div>

      <MobileHeader onOpenLeadModal={onOpenLeadModal} />
    </div>
  </header>
);
