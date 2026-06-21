<?php

require_once __DIR__ . '/../config/database.php';

class Review
{
    public static function getLatest(int $limit = 15): array
    {
        $stmt = db()->prepare(
            'SELECT author, location, stars, quote, anonymous
             FROM reviews ORDER BY created_at DESC LIMIT ?'
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function create(
        string $author,
        string $location,
        int $stars,
        string $quote,
        bool $anonymous
    ): void {
        db()->prepare(
            'INSERT INTO reviews (author, location, stars, quote, anonymous) VALUES (?, ?, ?, ?, ?)'
        )->execute([$author, $location, $stars, $quote, $anonymous ? 1 : 0]);
    }
}
