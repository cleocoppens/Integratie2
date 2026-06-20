<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Confession.php';

try {
    $confessions = Confession::orderBy('created_at', 'desc')->limit(10)->get();
    echo json_encode($confessions->map(fn($c) => [
        'meta'              => date('G\ui', strtotime($c->created_at)) . ' · ' . $c->location,
        'text'              => $c->content,
        'recognition_count' => (int) $c->recognition_count,
    ])->values());
} catch (\Exception $e) {
    echo json_encode([]);
}
