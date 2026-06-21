<?php

require_once __DIR__ . '/../config/database.php';

class Question
{
    public static function create(
        string $name,
        string $phone,
        string $email,
        string $question
    ): void {
        db()->prepare(
            'INSERT INTO questions (name, phone, email, question) VALUES (?, ?, ?, ?)'
        )->execute([$name, $phone, $email, $question]);
    }
}
