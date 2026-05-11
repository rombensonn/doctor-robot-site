import { ShieldCheck } from "lucide-react";
import { trustFacts } from "../data/business";

export const TrustBlock = () => (
  <section className="section">
    <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <p className="eyebrow">Доверие</p>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Почему владельцы VAG, Ford, Kia, Hyundai и Chery обращаются в «Доктор Робот»
        </h2>
        <p className="mt-5 text-base leading-7 text-muted">
          Главная идея сервиса: сначала точная диагностика и понятное объяснение причины неисправности, потом
          согласованный ремонт. Без навязывания лишних работ.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {trustFacts.map((fact) => (
          <div key={fact} className="flex gap-3 rounded-2xl border border-line bg-panel p-4">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="text-sm font-semibold leading-6 text-ink">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
