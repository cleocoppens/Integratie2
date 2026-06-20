<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

try {
    $rows = db()->query(
        'SELECT filename, alt FROM gallery_photos ORDER BY created_at DESC LIMIT 10'
    )->fetchAll();

    echo json_encode(array_map(fn($p) => [
        'filename' => $p['filename'],
        'alt'      => $p['alt'],
    ], $rows));
} catch (Exception $e) {
    echo json_encode([]);
}
