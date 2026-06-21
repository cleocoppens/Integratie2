<?php

require_once __DIR__ . '/../models/GalleryPhoto.php';

class GalleryPhotoController
{
    private const MAX_BYTES    = 10 * 1024 * 1024;
    private const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    public function index(): void
    {
        header('Content-Type: application/json');
        try {
            $rows = GalleryPhoto::getLatest(10);
            echo json_encode(array_map(fn($p) => [
                'id'  => $p['id'],
                'alt' => $p['alt'],
            ], $rows));
        } catch (Exception $e) {
            echo json_encode([]);
        }
    }

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

        $imageData = file_get_contents($file['tmp_name']);
        if ($imageData === false) {
            $this->json(['success' => false, 'error' => 'upload']);
        }

        $alt = trim($_POST['alt'] ?? '');
        if ($alt === '') $alt = 'Sfeerbeeld geüpload door een gebruiker';

        $id = GalleryPhoto::create($imageData, $mime, $alt);

        $this->json(['success' => true, 'id' => $id, 'alt' => $alt]);
    }

    public function serveImage(int $id): void
    {
        $photo = GalleryPhoto::getById($id);
        if (!$photo) {
            http_response_code(404);
            exit;
        }
        header('Content-Type: ' . $photo['mime_type']);
        header('Cache-Control: public, max-age=31536000');
        echo $photo['image_data'];
        exit;
    }

    private function json(array $data): never
    {
        echo json_encode($data);
        exit;
    }
}
