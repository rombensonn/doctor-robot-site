import { CreditCard, MapPin, MessageCircle, Phone, Send, WalletCards } from "lucide-react";
import { business } from "../data/business";
import { trackEvent } from "../utils/analytics";
import { LeadForm } from "./LeadForm";
import { MapBlock } from "./MapBlock";

type ContactBlockProps = {
  showForm?: boolean;
};

export const ContactBlock = ({ showForm = false }: ContactBlockProps) => (
  <section className="section section-muted">
    <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="eyebrow">Контакты</p>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">Запишитесь перед визитом</h2>
        <p className="mt-5 text-base leading-7 text-muted">
          Перед визитом рекомендуем записаться и уточнить актуальное время работы. Если вопрос срочный, удобнее позвонить
          напрямую.
        </p>

        <div className="mt-7 grid gap-4">
          <div className="contact-row">
            <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <p className="font-bold text-ink">{business.address}</p>
              <p className="text-sm text-muted">{business.scheduleNote}</p>
            </div>
          </div>
          <div className="contact-row">
            <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
            <a className="font-bold text-ink hover:text-white" href={business.phoneHref} onClick={() => trackEvent("click_phone", { place: "contacts" })}>
              {business.phone}
            </a>
          </div>
          <div className="contact-row">
            <CreditCard className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="font-bold text-ink">Оплата картой и наличными</p>
          </div>
          <div className="contact-row">
            <WalletCards className="h-5 w-5 text-accent" aria-hidden="true" />
            <p className="font-bold text-ink">Предварительная запись, гарантия на работы и запчасти</p>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-primary" href={business.phoneHref} onClick={() => trackEvent("click_phone", { place: "contacts_cta" })}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Позвонить
          </a>
          <a className="btn btn-secondary" href={business.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_whatsapp", { place: "contacts" })}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Написать в WhatsApp
          </a>
          <a className="btn btn-ghost" href={business.telegram} target="_blank" rel="noreferrer" onClick={() => trackEvent("click_telegram", { place: "contacts" })}>
            <Send className="h-4 w-4" aria-hidden="true" />
            Написать в Telegram
          </a>
        </div>

        {showForm && (
          <div className="mt-8 rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
            <LeadForm formSource="contact-page" title="Заявка на консультацию" successMode="inline" />
          </div>
        )}
      </div>

      <MapBlock />
    </div>
  </section>
);
