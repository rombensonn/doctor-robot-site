import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { LeadForm } from "./LeadForm";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  formSource?: string;
};

export const LeadModal = ({ open, onClose, formSource = "modal" }: LeadModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={onClose}
        >
          <motion.div
            className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-[22px] border border-line bg-panel p-5 shadow-soft sm:p-7"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Заявка</p>
                <h2 id="lead-modal-title" className="mt-2 text-2xl font-bold text-ink">
                  Опишите симптомы коробки
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Ответим, сориентируем по возможной причине и подскажем следующий шаг.
                </p>
              </div>
              <button className="icon-button shrink-0" type="button" aria-label="Закрыть окно" onClick={onClose}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <LeadForm formSource={formSource} compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
