<?php
declare(strict_types=1);

function send_lead_telegram(array $config, array $lead, int $leadId): bool
{
    if (!$config['telegram']['enabled'] || $config['telegram']['bot_token'] === '' || $config['telegram']['chat_id'] === '') {
        return false;
    }

    $text = lead_message_text($lead, $leadId);
    $url = 'https://api.telegram.org/bot' . rawurlencode($config['telegram']['bot_token']) . '/sendMessage';

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode([
            'chat_id' => $config['telegram']['chat_id'],
            'text' => $text,
            'disable_web_page_preview' => true,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $status < 200 || $status >= 300) {
        log_app_error('Telegram send failed: HTTP ' . $status . ' ' . $error . ' ' . (string) $response);
        return false;
    }

    return true;
}
