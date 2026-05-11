import { business } from "./business";
import { getServiceBySlug } from "./services";

export type SeoMeta = {
  path: string;
  title: string;
  description: string;
  h1?: string;
  noindex?: boolean;
};

export const staticSeo: Record<string, SeoMeta> = {
  "/": {
    path: "/",
    title: "Ремонт DSG, Powershift, DCT и вариаторов в Москве — Доктор Робот",
    description:
      "Ремонт DSG, Powershift, DCT, CVT и мехатроников в Москве. Диагностика, замена сцепления, адаптация, гарантия на работы и запчасти. Доктор Робот, Салтыковская ул., 51.",
    h1: "Ремонт DSG, Powershift, DCT и вариаторов в Москве",
  },
  "/services": {
    path: "/services",
    title: "Услуги по ремонту DSG, DCT, Powershift и CVT в Москве — Доктор Робот",
    description:
      "Каталог услуг «Доктор Робот»: ремонт DSG, Powershift, DCT Hyundai Kia, вариаторов Chery, мехатроников, сцеплений и гидроблоков.",
    h1: "Услуги по ремонту коробок передач",
  },
  "/prices": {
    path: "/prices",
    title: "Цены на ремонт DSG, Powershift, DCT и CVT в Москве — Доктор Робот",
    description:
      "Ориентировочные цены на ремонт DSG, Powershift, 6DCT, 7DCT и вариаторов Chery. Точная стоимость после диагностики и согласования работ.",
    h1: "Цены на ремонт коробок передач",
  },
  "/diagnostics": {
    path: "/diagnostics",
    title: "Диагностика коробки передач в Москве — DSG, DCT, Powershift, CVT",
    description:
      "Диагностика коробки передач в Москве: проверка симптомов, ошибок, сцепления, мехатроника, гидроблока и адаптаций перед ремонтом.",
    h1: "Диагностика коробки передач в Москве",
  },
  "/brands": {
    path: "/brands",
    title: "Марки автомобилей для ремонта DSG, DCT, Powershift и CVT — Доктор Робот",
    description:
      "Обслуживаем Volkswagen, Audi, Skoda, Ford, Kia, Hyundai, Chery, Haval, Geely, Toyota, Lexus, Nissan, Mazda и другие марки.",
    h1: "Марки автомобилей",
  },
  "/reviews": {
    path: "/reviews",
    title: "Отзывы о ремонте DSG и Powershift — Доктор Робот Москва",
    description:
      "Отзывы клиентов «Доктор Робот» о диагностике и ремонте DSG, Powershift, мехатроников, сцеплений и гидроблоков в Москве.",
    h1: "Отзывы клиентов",
  },
  "/contacts": {
    path: "/contacts",
    title: "Контакты автосервиса Доктор Робот — Москва, Салтыковская ул., 51",
    description:
      "Контакты сервиса «Доктор Робот»: Москва, Салтыковская ул., 51, помещение 11/1. Телефон +7 (905) 557-40-46, запись на диагностику коробки.",
    h1: "Контакты",
  },
  "/privacy": {
    path: "/privacy",
    title: "Политика конфиденциальности — Доктор Робот",
    description: "Политика обработки персональных данных сайта автосервиса «Доктор Робот».",
    h1: "Политика конфиденциальности",
  },
  "/thanks": {
    path: "/thanks",
    title: "Заявка отправлена — Доктор Робот",
    description: "Спасибо. Мы получили обращение и свяжемся с вами по указанному номеру.",
    h1: "Заявка отправлена",
    noindex: true,
  },
  "/404": {
    path: "/404",
    title: "Страница не найдена — Доктор Робот",
    description: "Такой страницы нет. Перейдите к услугам, ценам, диагностике или контактам автосервиса.",
    h1: "Страница не найдена",
    noindex: true,
  },
};

export const normalizePath = (path: string) => {
  const clean = path.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

export const canonicalUrl = (path: string) => `${business.siteUrl}${normalizePath(path) === "/" ? "/" : normalizePath(path)}`;

export const getSeoMeta = (path: string): SeoMeta => {
  const normalized = normalizePath(path);
  const serviceMatch = normalized.match(/^\/services\/([^/]+)$/);

  if (serviceMatch) {
    const service = getServiceBySlug(serviceMatch[1]);
    if (service) {
      return {
        path: normalized,
        title: `${service.h1} — Доктор Робот`,
        description: service.seoDescription,
        h1: service.h1,
      };
    }
  }

  return staticSeo[normalized] ?? staticSeo["/404"];
};

export const pageLabels: Record<string, string> = {
  "/": "Главная",
  "/services": "Услуги",
  "/prices": "Цены",
  "/diagnostics": "Диагностика",
  "/brands": "Марки автомобилей",
  "/reviews": "Отзывы",
  "/contacts": "Контакты",
  "/privacy": "Политика конфиденциальности",
  "/thanks": "Заявка отправлена",
};
