<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

try {
    $rows = db()->query(
        'SELECT author, location, stars, quote, anonymous
         FROM reviews ORDER BY created_at DESC LIMIT 15'
    )->fetchAll();

    echo json_encode(array_map(fn($r) => [
        'author'   => $r['anonymous'] ? 'Anoniem' : $r['author'],
        'location' => $r['location'],
        'stars'    => (int) $r['stars'],
        'quote'    => $r['quote'],
    ], $rows));
} catch (Exception $e) {
    echo json_encode([]);
}
