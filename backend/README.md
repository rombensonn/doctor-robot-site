# Backend «Доктор Робот»

PHP API принимает заявки с форм сайта, сохраняет их в MySQL, отправляет e-mail через PHPMailer и сообщение в Telegram.

## Установка

1. Установите зависимости:

```bash
cd backend
composer install --no-dev
```

2. Создайте базу данных и импортируйте схему:

```bash
mysql -u USER -p DATABASE < schema.sql
```

3. Скопируйте `.env.example` в `.env` и заполните доступы:

```bash
cp .env.example .env
```

4. Укажите домен в `APP_URL` и `ALLOWED_ORIGINS`. Для CORS оставляйте только свои домены.

## SMTP

Заполните `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `MAIL_FROM_EMAIL` и `LEAD_TO_EMAIL`.
PHPMailer подключается через `backend/vendor/autoload.php`.

## Telegram

Создайте бота через BotFather, получите `TELEGRAM_BOT_TOKEN`, узнайте `TELEGRAM_CHAT_ID` и включите:

```dotenv
TELEGRAM_ENABLED=true
```

## Размещение на хостинге

Скопируйте каталог `api` так, чтобы endpoints были доступны по:

- `/api/csrf.php`
- `/api/lead.php`

Каталоги `storage`, `.env`, `vendor` и `schema.sql` не должны быть доступны публично. В проекте есть `.htaccess`, но дополнительно проверьте настройки хостинга.

## Безопасность

API проверяет метод и Content-Type, CSRF token, honeypot, rate limit по IP, server-side validation и сохраняет данные через prepared statements PDO. Внутренние ошибки пишутся в `storage/logs/app.log`, пользователю возвращается общий JSON-ответ.
