<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

try {
    $rows = db()->query(
        'SELECT id, location, content, recognition_count, created_at
         FROM confessions ORDER BY created_at DESC LIMIT 10'
    )->fetchAll();

    echo json_encode(array_map(fn($c) => [
        'id'                => (int) $c['id'],
        'meta'              => date('G\ui', strtotime($c['created_at'])) . ' · ' . $c['location'],
        'text'              => $c['content'],
        'recognition_count' => (int) $c['recognition_count'],
    ], $rows));
} catch (Exception $e) {
    echo json_encode([]);
}
