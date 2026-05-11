import { BrandsGrid } from "../components/BrandsGrid";
import { ContactBlock } from "../components/ContactBlock";
import { FAQAccordion } from "../components/FAQAccordion";
import { GalleryBlock } from "../components/GalleryBlock";
import { Hero } from "../components/Hero";
import { PricesTable } from "../components/PricesTable";
import { ProcessSteps } from "../components/ProcessSteps";
import { ReviewsBlock } from "../components/ReviewsBlock";
import { ServicesGrid } from "../components/ServicesGrid";
import { SymptomsGrid } from "../components/SymptomsGrid";
import { TrustBlock } from "../components/TrustBlock";

type HomePageProps = {
  onOpenLeadModal: () => void;
};

export const HomePage = ({ onOpenLeadModal }: HomePageProps) => (
  <>
    <Hero onOpenLeadModal={onOpenLeadModal} />
    <SymptomsGrid onOpenLeadModal={onOpenLeadModal} />
    <ServicesGrid limit={12} />
    <ProcessSteps />
    <GalleryBlock />
    <TrustBlock />
    <ReviewsBlock />
    <PricesTable showForm />
    <FAQAccordion title="Частые вопросы о ремонте коробки" />
    <BrandsGrid />
    <ContactBlock />
  </>
);
