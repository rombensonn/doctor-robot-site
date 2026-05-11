import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../data/business";
import { trackEvent } from "../utils/analytics";

export const ThanksPage = () => (
  <section className="section min-h-[58dvh]">
    <div className="container-px mx-auto max-w-3xl text-center">
      <p className="eyebrow justify-center">Заявка</p>
      <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">Заявка отправлена</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        Спасибо. Мы получили обращение и свяжемся с вами по указанному номеру. Если вопрос срочный, позвоните напрямую:
        {" "}
        <a className="font-bold text-ink hover:text-white" href={business.phoneHref}>
          {business.phone}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a className="btn btn-primary" href={business.phoneHref} onClick={() => trackEvent("click_phone", { place: "thanks" })}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Позвонить
        </a>
        <Link className="btn btn-secondary" to="/">
          Вернуться на главную
        </Link>
        <Link className="btn btn-ghost" to="/services">
          Смотреть услуги
        </Link>
      </div>
    </div>
  </section>
);
