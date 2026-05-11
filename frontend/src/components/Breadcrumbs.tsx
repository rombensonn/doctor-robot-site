import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getBreadcrumbs } from "../utils/seo";

export const Breadcrumbs = () => {
  const location = useLocation();
  const crumbs = getBreadcrumbs(location.pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav className="container-px mx-auto max-w-7xl pt-7 text-sm text-muted" aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 text-muted/60" aria-hidden="true" />}
              {last ? (
                <span className="text-ink">{crumb.label}</span>
              ) : (
                <Link className="inline-flex items-center gap-1 transition hover:text-ink" to={crumb.href}>
                  {index === 0 && <Home className="h-4 w-4" aria-hidden="true" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
