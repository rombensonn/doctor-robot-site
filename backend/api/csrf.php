<?php
declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

$config = get_config();
apply_api_headers($config);
start_secure_session();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

json_response([
    'success' => true,
    'token' => $_SESSION['csrf_token'],
]);
