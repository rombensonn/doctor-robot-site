import { services } from "../data/services";

export const prerenderRoutes = [
  "/",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/prices",
  "/diagnostics",
  "/brands",
  "/reviews",
  "/contacts",
  "/privacy",
  "/thanks",
  "/404",
];
