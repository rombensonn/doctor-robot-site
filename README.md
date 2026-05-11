# Доктор Робот — сайт автосервиса по ремонту коробок передач

Полный проект: React + TypeScript frontend с prerender/SSG для SEO-страниц и PHP 8.2 backend для обработки заявок.

## Структура

```text
frontend/  React, Vite, Tailwind CSS, prerender HTML
backend/   PHP API, MySQL schema, PHPMailer, Telegram
```

## Frontend

```bash
cd frontend
npm install
npm run dev
npm run typecheck
npm run build
```

`npm run build` выполняет:

1. client build в `frontend/dist/client`
2. SSR build в `frontend/dist/server`
3. prerender всех SEO-страниц в отдельные `index.html`

Готовую статику берите из `frontend/dist/client`.

## Backend

```bash
cd backend
composer install --no-dev
cp .env.example .env
mysql -u USER -p DATABASE < schema.sql
```

Заполните в `.env`:

- `APP_URL`
- `ALLOWED_ORIGINS`
- `DB_DSN`, `DB_USER`, `DB_PASSWORD`
- SMTP-поля для PHPMailer
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, если нужна отправка в Telegram

Endpoints:

- `/api/csrf.php`
- `/api/lead.php`

## Деплой на обычный PHP-хостинг

1. Соберите frontend: `npm run build`.
2. Загрузите содержимое `frontend/dist/client` в web root.
3. Разместите `backend/api` так, чтобы он был доступен как `/api`.
4. Разместите `backend/vendor`, `.env`, `storage` и `schema.sql` вне публичного доступа, если хостинг позволяет.
5. Проверьте права на запись для `backend/storage/logs` и `backend/storage/rate-limit`.
6. Импортируйте `backend/schema.sql` в MySQL/MariaDB.

## Замена домена

Замените `https://example.ru` в:

- `frontend/src/data/business.ts`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- `backend/.env`

После замены домена пересоберите frontend.

## Обновление sitemap

Маршруты для prerender лежат в `frontend/src/routes/routes.tsx`, XML-карта — в `frontend/public/sitemap.xml`.
Если добавляете страницу услуги, добавьте ее в `frontend/src/data/services.ts`; затем обновите sitemap и выполните `npm run build`.

## Аналитика

В проекте подготовлены placeholders для:

- Яндекс Метрики
- Google Analytics / GTM
- call tracking

Цели в коде:

- `click_phone`
- `click_whatsapp`
- `click_telegram`
- `lead_submit`
- `open_modal`
- `service_click`

Реальные идентификаторы храните в конфигурации, не в секретных backend-файлах и не в публичном репозитории.

## Telegram bot

1. Создайте бота через BotFather.
2. Получите token и chat id.
3. Укажите в `backend/.env`:

```dotenv
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

## SMTP

PHPMailer подключается через Composer. Заполните:

```dotenv
MAIL_ENABLED=true
SMTP_HOST=smtp.example.ru
SMTP_PORT=587
SMTP_USERNAME=site@example.ru
SMTP_PASSWORD=...
SMTP_ENCRYPTION=tls
MAIL_FROM_EMAIL=site@example.ru
LEAD_TO_EMAIL=manager@example.ru
```

## Контент

Основные данные вынесены в:

- `frontend/src/data/business.ts`
- `frontend/src/data/services.ts`
- `frontend/src/data/reviews.ts`
- `frontend/src/data/faq.ts`
- `frontend/src/data/brands.ts`
- `frontend/src/data/seo.ts`

Так сайт можно быстро адаптировать под другой автосервис.
