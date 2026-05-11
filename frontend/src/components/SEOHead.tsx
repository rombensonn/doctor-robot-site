import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateDocumentSeo } from "../utils/seo";

export const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    updateDocumentSeo(location.pathname);
  }, [location.pathname]);

  return null;
};
