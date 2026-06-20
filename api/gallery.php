<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/GalleryPhoto.php';

try {
    $photos = GalleryPhoto::orderBy('created_at', 'desc')->limit(10)->get();
    echo json_encode($photos->map(fn($p) => [
        'filename' => $p->filename,
        'alt'      => $p->alt,
    ])->values());
} catch (\Exception $e) {
    echo json_encode([]);
}
