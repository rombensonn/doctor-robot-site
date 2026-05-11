import { business } from "../data/business";
import { mainFaq } from "../data/faq";
import { getSeoMeta, canonicalUrl, normalizePath, pageLabels } from "../data/seo";
import { getServiceBySlug } from "../data/services";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const getBreadcrumbs = (path: string) => {
  const normalized = normalizePath(path);
  const breadcrumbs = [{ label: "Главная", href: "/" }];

  if (normalized === "/") return breadcrumbs;

  if (normalized.startsWith("/services/")) {
    const slug = normalized.replace("/services/", "");
    const service = getServiceBySlug(slug);
    return [...breadcrumbs, { label: "Услуги", href: "/services" }, { label: service?.title ?? "Услуга", href: normalized }];
  }

  breadcrumbs.push({ label: pageLabels[normalized] ?? "Страница", href: normalized });
  return breadcrumbs;
};

export const renderSeoHead = (path: string) => {
  const meta = getSeoMeta(path);
  const canonical = canonicalUrl(meta.path);
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";
  const image = `${business.siteUrl}/og-image.jpg`;

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:site_name" content="${escapeHtml(business.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join("\n    ");
};

export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: business.name,
  url: business.siteUrl,
  telephone: business.phone,
  image: `${business.siteUrl}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.streetAddress,
    addressLocality: business.city,
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.coordinates.latitude,
    longitude: business.coordinates.longitude,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating.value,
    ratingCount: business.rating.ratingCount,
  },
  priceRange: "от 20 000 ₽",
  areaServed: "Москва",
});

export const breadcrumbJsonLd = (path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: getBreadcrumbs(path).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: canonicalUrl(item.href),
  })),
});

export const faqJsonLd = (items: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const serviceJsonLd = (path: string) => {
  const slug = normalizePath(path).replace("/services/", "");
  const service = getServiceBySlug(slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    description: service.seoDescription,
    provider: {
      "@type": "AutoRepair",
      name: business.name,
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.streetAddress,
        addressLocality: business.city,
        addressCountry: "RU",
      },
    },
    areaServed: "Москва",
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "RUB",
        minPrice: "20000",
      },
    },
  };
};

export const getJsonLdForPath = (path: string) => {
  const normalized = normalizePath(path);
  const items: Array<Record<string, unknown>> = [breadcrumbJsonLd(normalized)];

  if (normalized === "/" || normalized === "/contacts") items.push(localBusinessJsonLd());

  if (normalized === "/") items.push(faqJsonLd(mainFaq));

  if (normalized.startsWith("/services/")) {
    const service = serviceJsonLd(normalized);
    const slug = normalized.replace("/services/", "");
    const serviceData = getServiceBySlug(slug);
    if (service) items.push(service);
    if (serviceData?.faq) items.push(faqJsonLd(serviceData.faq));
  }

  if (normalized === "/diagnostics") {
    items.push(
      faqJsonLd([
        mainFaq[0],
        mainFaq[1],
        mainFaq[4],
        mainFaq[9],
      ]),
    );
  }

  return items;
};

export const updateDocumentSeo = (path: string) => {
  if (typeof document === "undefined") return;

  const meta = getSeoMeta(path);
  document.title = meta.title;

  const upsertMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  upsertMeta('meta[name="description"]', "name", "description", meta.description);
  upsertMeta('meta[name="robots"]', "name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
  upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
  upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl(meta.path));

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl(meta.path);
};
