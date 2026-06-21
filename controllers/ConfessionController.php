<?php

require_once __DIR__ . '/../models/Confession.php';

class ConfessionController
{
    private const MAX_LENGTH = 100;

    public function index(): void
    {
        header('Content-Type: application/json');
        try {
            $rows = Confession::getLatest(10);
            echo json_encode(array_map(fn($c) => [
                'id'                => (int) $c['id'],
                'meta'              => date('G\ui', strtotime($c['created_at'])) . ' · ' . $c['location'],
                'text'              => $c['content'],
                'recognition_count' => (int) $c['recognition_count'],
            ], $rows));
        } catch (Exception $e) {
            echo json_encode([]);
        }
    }

    public function recognise(): void
    {
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['success' => false]);
            exit;
        }

        $id    = (int) ($_POST['id']    ?? 0);
        $delta = (int) ($_POST['delta'] ?? 0);

        if ($id <= 0 || !in_array($delta, [-1, 1], true)) {
            echo json_encode(['success' => false]);
            exit;
        }

        try {
            $confession = Confession::findById($id);
            if (!$confession) {
                echo json_encode(['success' => false]);
                exit;
            }
            $newCount = max(0, (int) $confession['recognition_count'] + $delta);
            Confession::updateCount($id, $newCount);
            echo json_encode(['success' => true, 'count' => $newCount]);
        } catch (Exception $e) {
            echo json_encode(['success' => false]);
        }
    }

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
            Confession::create($location, $content);
        } catch (Exception $e) {
            $this->redirect('index.php#confessions');
        }

        $this->redirect('index.php?confession=success#confessions');
    }

    private function validate(string $content, string $location): array
    {
        $errors = [];
        if ($location === '') $errors[] = 'Stad is verplicht.';
        if ($content === '')  $errors[] = 'Jouw ochtendmoment is verplicht.';
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
