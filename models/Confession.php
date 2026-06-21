<?php

require_once __DIR__ . '/../config/database.php';

class Confession
{
    public static function getLatest(int $limit = 10): array
    {
        $stmt = db()->prepare(
            'SELECT id, location, content, recognition_count, created_at
             FROM confessions ORDER BY created_at DESC LIMIT ?'
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function findById(int $id): ?array
    {
        $stmt = db()->prepare('SELECT id, recognition_count FROM confessions WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function create(string $location, string $content): void
    {
        db()->prepare('INSERT INTO confessions (location, content) VALUES (?, ?)')
            ->execute([$location, $content]);
    }

    public static function updateCount(int $id, int $newCount): void
    {
        db()->prepare('UPDATE confessions SET recognition_count = ? WHERE id = ?')
            ->execute([$newCount, $id]);
    }

    public static function count(): int
    {
        return (int) db()->query('SELECT COUNT(*) FROM confessions')->fetchColumn();
    }
}
