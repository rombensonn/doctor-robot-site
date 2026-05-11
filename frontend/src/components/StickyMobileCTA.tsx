import { MessageSquare, Phone } from "lucide-react";
import { business } from "../data/business";
import { trackEvent } from "../utils/analytics";

type StickyMobileCTAProps = {
  onOpenLeadModal: () => void;
};

export const StickyMobileCTA = ({ onOpenLeadModal }: StickyMobileCTAProps) => (
  <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-3 backdrop-blur-xl md:hidden">
    <div className="grid grid-cols-2 gap-3">
      <a className="btn btn-secondary min-h-12" href={business.phoneHref} onClick={() => trackEvent("click_phone", { place: "sticky-mobile" })}>
        <Phone className="h-4 w-4" aria-hidden="true" />
        Позвонить
      </a>
      <button className="btn btn-primary min-h-12" type="button" onClick={onOpenLeadModal}>
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Записаться
      </button>
    </div>
  </div>
);
