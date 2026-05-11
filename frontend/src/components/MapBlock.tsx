import { ExternalLink, MapPin } from "lucide-react";
import { business } from "../data/business";

export const MapBlock = () => (
  <div className="relative min-h-[560px] overflow-hidden rounded-[24px] border border-line bg-panel shadow-line">
    <iframe
      className="absolute inset-0 h-full w-full"
      title="Карта проезда к автосервису Доктор Робот"
      src="https://yandex.ru/map-widget/v1/?ll=37.881849%2C55.745025&z=17&pt=37.881849%2C55.745025%2Cpm2rdm"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <a
      className="absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl border border-line bg-surface/92 p-4 text-left shadow-soft backdrop-blur-md transition hover:border-accent/50 hover:bg-surface"
      href="https://yandex.com/maps/-/CPcHYGZY"
      target="_blank"
      rel="noreferrer"
      aria-label={`Открыть адрес ${business.address} в Яндекс Картах`}
    >
      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-sm font-bold leading-6 text-ink">{business.address}</span>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-accent">
          Открыть в Яндекс Картах
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </a>
  </div>
);
