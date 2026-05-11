<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/validate.php';
require_once __DIR__ . '/rate-limit.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/mailer.php';
require_once __DIR__ . '/telegram.php';

$config = get_config();
apply_api_headers($config);
start_secure_session();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(['success' => false, 'message' => 'Method not allowed'], 405);
    }

    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (!str_contains($contentType, 'application/json') && !str_contains($contentType, 'application/x-www-form-urlencoded')) {
        json_response(['success' => false, 'message' => 'Unsupported content type'], 415);
    }

    $payload = [];
    if (str_contains($contentType, 'application/json')) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?: '', true);
        if (!is_array($decoded)) {
            json_response(['success' => false, 'message' => 'Некорректный JSON'], 400);
        }
        $payload = $decoded;
    } else {
        $payload = $_POST;
    }

    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($payload['csrf_token'] ?? '');
    if (empty($_SESSION['csrf_token']) || !is_string($token) || !hash_equals($_SESSION['csrf_token'], $token)) {
        json_response(['success' => false, 'message' => 'Сессия устарела. Обновите страницу и попробуйте еще раз.'], 419);
    }

    $validation = validate_lead_payload($payload);
    if ($validation['spam']) {
        json_response(['success' => true, 'message' => 'Заявка отправлена']);
    }

    if (!empty($validation['errors'])) {
        json_response([
            'success' => false,
            'message' => 'Проверьте поля формы',
            'errors' => $validation['errors'],
        ], 422);
    }

    $ip = client_ip();
    if (!rate_limit_check($ip, $config)) {
        json_response(['success' => false, 'message' => 'Слишком много заявок. Попробуйте позже.'], 429);
    }

    $lead = $validation['data'];
    $pdo = get_pdo($config);
    $leadId = save_lead($pdo, $lead, $ip, $_SERVER['HTTP_USER_AGENT'] ?? '');

    send_lead_email($config, $lead, $leadId);
    send_lead_telegram($config, $lead, $leadId);

    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    json_response(['success' => true, 'message' => 'Заявка отправлена']);
} catch (Throwable $exception) {
    log_app_error($exception);
    json_response(['success' => false, 'message' => 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.'], 500);
}
