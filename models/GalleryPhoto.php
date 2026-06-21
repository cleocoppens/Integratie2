<?php

require_once __DIR__ . '/../config/database.php';

class GalleryPhoto
{
    public static function getLatest(int $limit = 10): array
    {
        $stmt = db()->prepare(
            'SELECT id, alt FROM gallery_photos ORDER BY created_at DESC LIMIT ?'
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function create(string $imageData, string $mimeType, string $alt): int
    {
        $pdo  = db();
        $stmt = $pdo->prepare(
            'INSERT INTO gallery_photos (image_data, mime_type, alt) VALUES (?, ?, ?)'
        );
        $stmt->bindValue(1, $imageData, PDO::PARAM_LOB);
        $stmt->bindValue(2, $mimeType);
        $stmt->bindValue(3, $alt);
        $stmt->execute();
        return (int) $pdo->lastInsertId();
    }

    public static function getById(int $id): ?array
    {
        $stmt = db()->prepare(
            'SELECT image_data, mime_type FROM gallery_photos WHERE id = ?'
        );
        $stmt->bindValue(1, $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
