import { LeadForm } from "../components/LeadForm";
import { ReviewsBlock } from "../components/ReviewsBlock";
import { business } from "../data/business";

export const ReviewsPage = () => (
  <>
    <section className="page-hero">
      <div className="container-px mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div>
          <p className="eyebrow">Отзывы</p>
          <h1>Отзывы клиентов</h1>
          <p>
            Клиенты чаще всего приходят с тревогой: коробка дергается, другой сервис предложил дорогую замену, непонятно,
            можно ли ездить дальше. Важная часть работы — объяснить причину и согласовать ремонт.
          </p>
          <p className="mt-5 text-lg font-bold text-ink">
            Рейтинг {business.rating.value} • {business.rating.ratingCount} оценок • {business.rating.reviewCount} отзывов
          </p>
        </div>
        <aside className="rounded-[24px] border border-line bg-panel p-5 shadow-soft sm:p-6">
          <LeadForm formSource="reviews" title="Получить консультацию" compact />
        </aside>
      </div>
    </section>
    <ReviewsBlock />
  </>
);
