<?php
declare(strict_types=1);

if (!function_exists('load_env_file')) {
    function load_env_file(string $path): void
    {
        if (!is_file($path) || !is_readable($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                continue;
            }

            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value, " \t\n\r\0\x0B\"'");

            if ($key !== '' && getenv($key) === false) {
                putenv($key . '=' . $value);
                $_ENV[$key] = $value;
            }
        }
    }
}

if (!function_exists('env_value')) {
    function env_value(string $key, string $default = ''): string
    {
        $value = getenv($key);
        return $value === false ? $default : (string) $value;
    }
}

if (!function_exists('app_config')) {
    function app_config(): array
    {
        load_env_file(__DIR__ . '/../.env');

        $allowedOrigins = array_filter(array_map('trim', explode(',', env_value('ALLOWED_ORIGINS', 'https://example.ru'))));

        return [
            'app' => [
                'url' => env_value('APP_URL', 'https://example.ru'),
                'debug' => env_value('APP_DEBUG', 'false') === 'true',
                'allowed_origins' => $allowedOrigins,
            ],
            'db' => [
                'dsn' => env_value('DB_DSN', 'mysql:host=127.0.0.1;dbname=doctor_robot;charset=utf8mb4'),
                'user' => env_value('DB_USER', 'doctor_robot'),
                'password' => env_value('DB_PASSWORD', ''),
            ],
            'mail' => [
                'enabled' => env_value('MAIL_ENABLED', 'true') === 'true',
                'host' => env_value('SMTP_HOST', ''),
                'port' => (int) env_value('SMTP_PORT', '587'),
                'username' => env_value('SMTP_USERNAME', ''),
                'password' => env_value('SMTP_PASSWORD', ''),
                'encryption' => env_value('SMTP_ENCRYPTION', 'tls'),
                'from_email' => env_value('MAIL_FROM_EMAIL', 'site@example.ru'),
                'from_name' => env_value('MAIL_FROM_NAME', 'Доктор Робот'),
                'to_email' => env_value('LEAD_TO_EMAIL', 'manager@example.ru'),
            ],
            'telegram' => [
                'enabled' => env_value('TELEGRAM_ENABLED', 'false') === 'true',
                'bot_token' => env_value('TELEGRAM_BOT_TOKEN', ''),
                'chat_id' => env_value('TELEGRAM_CHAT_ID', ''),
            ],
            'rate_limit' => [
                'max_requests' => (int) env_value('RATE_LIMIT_MAX', '3'),
                'window_seconds' => (int) env_value('RATE_LIMIT_WINDOW', '900'),
            ],
            'paths' => [
                'logs' => __DIR__ . '/../storage/logs',
                'rate_limit' => __DIR__ . '/../storage/rate-limit',
            ],
        ];
    }
}
