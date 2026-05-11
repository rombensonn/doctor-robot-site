import { useLocation } from "react-router-dom";
import { getJsonLdForPath } from "../utils/seo";

export const JsonLd = () => {
  const location = useLocation();
  const items = getJsonLdForPath(location.pathname);

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};
