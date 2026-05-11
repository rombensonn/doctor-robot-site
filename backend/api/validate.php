<?php
declare(strict_types=1);

function clean_field(mixed $value, int $maxLength): string
{
    $value = is_string($value) ? $value : '';
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');

    return mb_substr($value, 0, $maxLength);
}

function normalize_phone_server(string $phone): string
{
    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if (strlen($digits) === 11 && str_starts_with($digits, '8')) {
        return '+7' . substr($digits, 1);
    }
    if (strlen($digits) === 11 && str_starts_with($digits, '7')) {
        return '+' . $digits;
    }
    if (strlen($digits) === 10) {
        return '+7' . $digits;
    }

    return clean_field($phone, 24);
}

function validate_lead_payload(array $payload): array
{
    $honeypot = clean_field($payload['website'] ?? '', 120);
    if ($honeypot !== '') {
        return ['spam' => true, 'errors' => [], 'data' => []];
    }

    $name = clean_field($payload['name'] ?? '', 80);
    $phone = normalize_phone_server(clean_field($payload['phone'] ?? '', 24));
    $consent = filter_var($payload['consent'] ?? false, FILTER_VALIDATE_BOOLEAN);

    $errors = [];
    if (mb_strlen($name) < 2) {
        $errors['name'] = 'Укажите имя минимум из 2 символов';
    }

    $phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
    if (strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15) {
        $errors['phone'] = 'Укажите корректный телефон';
    }

    if (!$consent) {
        $errors['consent'] = 'Нужно согласие с политикой конфиденциальности';
    }

    $data = [
        'name' => $name,
        'phone' => $phone,
        'car' => clean_field($payload['car'] ?? '', 120),
        'transmission_type' => clean_field($payload['transmissionType'] ?? '', 80),
        'symptom' => clean_field($payload['symptom'] ?? '', 120),
        'message' => clean_field($payload['message'] ?? '', 1000),
        'page_url' => clean_field($payload['pageUrl'] ?? '', 500),
        'form_source' => clean_field($payload['formSource'] ?? '', 80),
        'utm_source' => clean_field($payload['utm_source'] ?? '', 120),
        'utm_medium' => clean_field($payload['utm_medium'] ?? '', 120),
        'utm_campaign' => clean_field($payload['utm_campaign'] ?? '', 120),
        'utm_content' => clean_field($payload['utm_content'] ?? '', 120),
        'utm_term' => clean_field($payload['utm_term'] ?? '', 120),
    ];

    return ['spam' => false, 'errors' => $errors, 'data' => $data];
}
