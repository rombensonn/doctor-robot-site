import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { business } from "../data/business";

type MobileHeaderProps = {
  onOpenLeadModal: () => void;
};

export const MobileHeader = ({ onOpenLeadModal }: MobileHeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-3">
        <a className="hidden rounded-full border border-line px-3 py-2 text-sm font-semibold text-ink sm:inline-flex" href={business.phoneHref}>
          {business.phone}
        </a>
        <button
          className="icon-button"
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-4 top-20 z-50 rounded-[18px] border border-line bg-panel p-4 shadow-soft">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {business.nav.map((item) => (
              <NavLink
                key={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-muted transition hover:bg-white/5 hover:text-ink"
                to={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 grid gap-2">
            <button
              className="btn btn-primary w-full"
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenLeadModal();
              }}
            >
              Записаться на диагностику
            </button>
            <Link className="btn btn-secondary w-full" to="/services" onClick={() => setOpen(false)}>
              Смотреть услуги
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
