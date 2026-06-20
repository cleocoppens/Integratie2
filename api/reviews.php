<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Review.php';

try {
    $reviews = Review::orderBy('created_at', 'desc')->limit(15)->get();
    echo json_encode($reviews->map(fn($r) => [
        'id'       => $r->id,
        'author'   => $r->anonymous ? 'Anoniem' : $r->author,
        'location' => $r->location,
        'stars'    => (int) $r->stars,
        'quote'    => $r->quote,
    ])->values());
} catch (\Exception $e) {
    echo json_encode([]);
}
