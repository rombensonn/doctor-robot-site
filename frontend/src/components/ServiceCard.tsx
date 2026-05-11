import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { trackEvent } from "../utils/analytics";

type ServiceCardProps = {
  service: Service;
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const href = service.slug === "services" ? "/services" : `/services/${service.slug}`;

  return (
    <motion.article
      className="service-card"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.16 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-accent">{service.category}</p>
          <h3 className="mt-2 text-xl font-bold text-ink">{service.shortTitle}</h3>
        </div>
        <span className="rounded-full border border-line px-3 py-1 text-sm font-bold text-ink">{service.price}</span>
      </div>
      <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted">{service.description}</p>
      <Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-white" to={href} onClick={() => trackEvent("service_click", { service: service.slug })}>
        Подробнее
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.article>
  );
};
