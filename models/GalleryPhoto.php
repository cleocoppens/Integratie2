<?php

require_once __DIR__ . '/../config/database.php';

class GalleryPhoto
{
    public static function getLatest(int $limit = 10): array
    {
        $stmt = db()->prepare(
            'SELECT filename, alt FROM gallery_photos ORDER BY created_at DESC LIMIT ?'
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function create(string $filename, string $alt): void
    {
        db()->prepare('INSERT INTO gallery_photos (filename, alt) VALUES (?, ?)')
            ->execute([$filename, $alt]);
    }
}
