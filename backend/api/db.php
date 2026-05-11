<?php
declare(strict_types=1);

function get_pdo(array $config): PDO
{
    return new PDO(
        $config['db']['dsn'],
        $config['db']['user'],
        $config['db']['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ],
    );
}

function save_lead(PDO $pdo, array $lead, string $ip, string $userAgent): int
{
    $sql = 'INSERT INTO leads
        (name, phone, car, transmission_type, symptom, message, page_url, form_source,
         utm_source, utm_medium, utm_campaign, utm_content, utm_term, ip_address, user_agent)
        VALUES
        (:name, :phone, :car, :transmission_type, :symptom, :message, :page_url, :form_source,
         :utm_source, :utm_medium, :utm_campaign, :utm_content, :utm_term, :ip_address, :user_agent)';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $lead['name'],
        ':phone' => $lead['phone'],
        ':car' => $lead['car'],
        ':transmission_type' => $lead['transmission_type'],
        ':symptom' => $lead['symptom'],
        ':message' => $lead['message'],
        ':page_url' => $lead['page_url'],
        ':form_source' => $lead['form_source'],
        ':utm_source' => $lead['utm_source'],
        ':utm_medium' => $lead['utm_medium'],
        ':utm_campaign' => $lead['utm_campaign'],
        ':utm_content' => $lead['utm_content'],
        ':utm_term' => $lead['utm_term'],
        ':ip_address' => $ip,
        ':user_agent' => mb_substr($userAgent, 0, 500),
    ]);

    return (int) $pdo->lastInsertId();
}
