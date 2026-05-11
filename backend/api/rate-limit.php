<?php
declare(strict_types=1);

function rate_limit_check(string $ip, array $config): bool
{
    $dir = $config['paths']['rate_limit'];
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $file = $dir . '/' . sha1($ip) . '.json';
    $now = time();
    $window = max(60, (int) $config['rate_limit']['window_seconds']);
    $max = max(1, (int) $config['rate_limit']['max_requests']);
    $entries = [];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = $raw ? json_decode($raw, true) : [];
        if (is_array($decoded)) {
            $entries = array_values(array_filter($decoded, static fn ($time) => is_int($time) && $time > $now - $window));
        }
    }

    if (count($entries) >= $max) {
        return false;
    }

    $entries[] = $now;
    file_put_contents($file, json_encode($entries), LOCK_EX);

    return true;
}
