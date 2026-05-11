import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { JsonLd } from "./components/JsonLd";
import { LeadModal } from "./components/LeadModal";
import { SEOHead } from "./components/SEOHead";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { trackEvent } from "./utils/analytics";
import { BrandsPage } from "./pages/BrandsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { DiagnosticsPage } from "./pages/DiagnosticsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PricesPage } from "./pages/PricesPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ThanksPage } from "./pages/ThanksPage";

export const App = () => {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const location = useLocation();

  const openLeadModal = () => {
    trackEvent("open_modal", { source: "cta" });
    setLeadModalOpen(true);
  };

  return (
    <>
      <SEOHead />
      <JsonLd />
      <Header onOpenLeadModal={openLeadModal} />
      <Breadcrumbs />
      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage onOpenLeadModal={openLeadModal} />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/prices" element={<PricesPage />} />
              <Route path="/diagnostics" element={<DiagnosticsPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/thanks" element={<ThanksPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyMobileCTA onOpenLeadModal={openLeadModal} />
      <LeadModal open={leadModalOpen} onClose={() => setLeadModalOpen(false)} formSource="modal" />
    </>
  );
};
