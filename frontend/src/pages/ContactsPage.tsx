import { ContactBlock } from "../components/ContactBlock";

export const ContactsPage = () => (
  <>
    <section className="page-hero page-hero-compact">
      <div className="container-px mx-auto max-w-7xl">
        <p className="eyebrow">Контакты</p>
        <h1>Контакты</h1>
        <p>
          «Доктор Робот» находится в Москве на Салтыковской улице. Перед визитом рекомендуем записаться и уточнить
          актуальное время работы по телефону.
        </p>
      </div>
    </section>
    <ContactBlock showForm />
  </>
);
