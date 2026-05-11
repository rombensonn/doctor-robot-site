import { business } from "../data/business";

export const MapBlock = () => (
  <div className="overflow-hidden rounded-[24px] border border-line bg-panel">
    <iframe
      className="h-[460px] w-full"
      title="Карта проезда к автосервису Доктор Робот"
      src="https://yandex.com/map-widget/v1/?ll=37.881849%2C55.745025&mode=search&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%A1%D0%B0%D0%BB%D1%82%D1%8B%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB.%2C%2051%2C%20%D0%BF%D0%BE%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%2011%2F1&z=16"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
    <div className="border-t border-line p-4 text-sm leading-6 text-muted">
      <a className="link" href="https://yandex.com/maps/-/CPcHYGZY" target="_blank" rel="noreferrer">
        Открыть адрес в Яндекс Картах
      </a>
      <span className="ml-2">{business.address}</span>
    </div>
  </div>
);
