import { Star } from "lucide-react";
import { business } from "../data/business";
import { reviews, reviewsNotice } from "../data/reviews";

export const ReviewsBlock = () => (
  <section className="section section-muted">
    <div className="container-px mx-auto max-w-7xl">
      <div className="section-head">
        <p className="eyebrow">Отзывы</p>
        <h2>Что отмечают клиенты</h2>
        <p>
          Рейтинг {business.rating.value} на основе {business.rating.ratingCount} оценок и {business.rating.reviewCount} отзывов.
          В карточках — кратко переформулированные реальные ситуации клиентов.
        </p>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="review-card">
            <div className="flex gap-1 text-accent" aria-label="Положительный отзыв">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{review.text}</p>
            <p className="mt-5 font-bold text-ink">{review.name}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-muted">{reviewsNotice}</p>
    </div>
  </section>
);
