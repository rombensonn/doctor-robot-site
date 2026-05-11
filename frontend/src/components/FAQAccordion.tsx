import { ChevronDown } from "lucide-react";
import { mainFaq } from "../data/faq";

type FAQAccordionProps = {
  items?: Array<{ question: string; answer: string }>;
  title?: string;
};

export const FAQAccordion = ({ items = mainFaq, title = "FAQ" }: FAQAccordionProps) => (
  <section className="section">
    <div className="container-px mx-auto max-w-4xl">
      <div className="section-head">
        <p className="eyebrow">Вопросы</p>
        <h2>{title}</h2>
        <p>Коротко о том, что обычно волнует владельцев DSG, Powershift, DCT и вариаторов перед диагностикой.</p>
      </div>

      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="faq-item group">
            <summary>
              <span>{item.question}</span>
              <ChevronDown className="h-5 w-5 shrink-0 text-accent transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);
