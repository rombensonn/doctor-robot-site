<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

function send_lead_email(array $config, array $lead, int $leadId): bool
{
    if (!$config['mail']['enabled']) {
        return false;
    }

    $autoload = __DIR__ . '/../vendor/autoload.php';
    if (!is_file($autoload)) {
        log_app_error('PHPMailer autoload not found. Run composer install in backend.');
        return false;
    }

    require_once $autoload;

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $config['mail']['host'];
        $mail->Port = $config['mail']['port'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['mail']['username'];
        $mail->Password = $config['mail']['password'];

        if ($config['mail']['encryption'] !== '') {
            $mail->SMTPSecure = $config['mail']['encryption'];
        }

        $mail->CharSet = 'UTF-8';
        $mail->setFrom($config['mail']['from_email'], $config['mail']['from_name']);
        $mail->addAddress($config['mail']['to_email']);
        $mail->Subject = 'Новая заявка #' . $leadId . ' — Доктор Робот';
        $mail->isHTML(false);
        $mail->Body = lead_message_text($lead, $leadId);
        $mail->send();

        return true;
    } catch (MailException $exception) {
        log_app_error($exception);
        return false;
    }
}

function lead_message_text(array $lead, int $leadId): string
{
    return implode(PHP_EOL, [
        'Новая заявка #' . $leadId,
        'Имя: ' . $lead['name'],
        'Телефон: ' . $lead['phone'],
        'Авто: ' . ($lead['car'] ?: '-'),
        'Коробка: ' . ($lead['transmission_type'] ?: '-'),
        'Симптом: ' . ($lead['symptom'] ?: '-'),
        'Сообщение: ' . ($lead['message'] ?: '-'),
        'Источник формы: ' . ($lead['form_source'] ?: '-'),
        'Страница: ' . ($lead['page_url'] ?: '-'),
        'UTM source: ' . ($lead['utm_source'] ?: '-'),
        'UTM medium: ' . ($lead['utm_medium'] ?: '-'),
        'UTM campaign: ' . ($lead['utm_campaign'] ?: '-'),
        'UTM content: ' . ($lead['utm_content'] ?: '-'),
        'UTM term: ' . ($lead['utm_term'] ?: '-'),
    ]);
}
