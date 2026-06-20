<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Confession.php';

class ConfessionController
{
    private const MAX_LENGTH = 160;

    public function submit(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('index.php');
        }

        $content  = trim($_POST['moment']   ?? '');
        $location = trim($_POST['location'] ?? '');

        $errors = $this->validate($content, $location);

        if (!empty($errors)) {
            $this->redirect('index.php#confessions');
        }

        try {
            Confession::create([
                'location' => $location,
                'content'  => $content,
            ]);
        } catch (\Exception $e) {
            $this->redirect('index.php#confessions');
        }

        $this->redirect('index.php?confession=success#confessions');
    }

    private function validate(string $content, string $location): array
    {
        $errors = [];
        if ($location === '') {
            $errors[] = 'Stad is verplicht.';
        }
        if ($content === '') {
            $errors[] = 'Jouw ochtendmoment is verplicht.';
        }
        if (mb_strlen($content) > self::MAX_LENGTH) {
            $errors[] = 'Jouw ochtendmoment mag maximaal ' . self::MAX_LENGTH . ' tekens bevatten.';
        }
        return $errors;
    }

    private function redirect(string $url): never
    {
        header('Location: ' . $url);
        exit;
    }
}
