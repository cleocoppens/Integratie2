<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/GalleryPhoto.php';

class GalleryPhotoController
{
    private const MAX_BYTES    = 10 * 1024 * 1024;
    private const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    private const UPLOAD_DIR   = __DIR__ . '/../assets/img/uploads/';

    public function upload(): void
    {
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['success' => false, 'error' => 'method']);
        }

        $file = $_FILES['photo'] ?? null;

        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            $this->json(['success' => false, 'error' => 'upload']);
        }

        if ($file['size'] > self::MAX_BYTES) {
            $this->json(['success' => false, 'error' => 'toobig']);
        }

        $mime = mime_content_type($file['tmp_name']);
        if (!in_array($mime, self::ALLOWED_MIME, true)) {
            $this->json(['success' => false, 'error' => 'type']);
        }

        $ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $filename = bin2hex(random_bytes(8)) . '.' . $ext;
        $dest     = self::UPLOAD_DIR . $filename;

        if (!move_uploaded_file($file['tmp_name'], $dest)) {
            $this->json(['success' => false, 'error' => 'move']);
        }

        $alt = trim($_POST['alt'] ?? '');
        if ($alt === '') {
            $alt = 'Sfeerbeeld geüpload door een gebruiker';
        }

        GalleryPhoto::create(['filename' => $filename, 'alt' => $alt]);

        $this->json(['success' => true, 'filename' => $filename, 'alt' => $alt]);
    }

    private function json(array $data): never
    {
        echo json_encode($data);
        exit;
    }
}
