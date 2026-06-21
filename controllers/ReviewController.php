<?php

require_once __DIR__ . '/../models/Review.php';

class ReviewController
{
    private const QUOTE_MAX_LEN = 150;

    public function index(): void
    {
        header('Content-Type: application/json');
        try {
            $rows = Review::getLatest(15);
            echo json_encode(array_map(fn($r) => [
                'author'   => $r['anonymous'] ? 'Anoniem' : $r['author'],
                'location' => $r['location'],
                'stars'    => (int) $r['stars'],
                'quote'    => $r['quote'],
            ], $rows));
        } catch (Exception $e) {
            echo json_encode([]);
        }
    }

    public function create(): void
    {
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['success' => false]);
            exit;
        }

        $stars     = (int)   ($_POST['stars']     ?? 0);
        $quote     = trim(   $_POST['quote']      ?? '');
        $location  = trim(   $_POST['location']   ?? '');
        $author    = trim(   $_POST['author']     ?? '');
        $anonymous = !empty( $_POST['anonymous']);

        if ($stars < 1 || $stars > 5 || mb_strlen($quote) < 1 || mb_strlen($quote) > self::QUOTE_MAX_LEN || !$location) {
            echo json_encode(['success' => false, 'error' => 'Ongeldige invoer.']);
            exit;
        }
        if (!$anonymous && mb_strlen($author) < 1) {
            echo json_encode(['success' => false, 'error' => 'Vul je naam in of kies anoniem.']);
            exit;
        }

        try {
            Review::create($anonymous ? '' : $author, $location, $stars, $quote, $anonymous);
            echo json_encode([
                'success'  => true,
                'author'   => $anonymous ? 'Anoniem' : $author,
                'location' => $location,
                'stars'    => $stars,
                'quote'    => $quote,
            ]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => 'Er ging iets mis.']);
        }
    }
}
