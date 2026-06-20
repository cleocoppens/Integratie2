<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false]);
    exit;
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Review.php';

$stars     = (int)   ($_POST['stars']     ?? 0);
$quote     = trim(   $_POST['quote']      ?? '');
$location  = trim(   $_POST['location']   ?? '');
$author    = trim(   $_POST['author']     ?? '');
$anonymous = !empty( $_POST['anonymous']);

if ($stars < 1 || $stars > 5 || mb_strlen($quote) < 1 || mb_strlen($quote) > 150 || !$location) {
    echo json_encode(['success' => false, 'error' => 'Ongeldige invoer.']);
    exit;
}
if (!$anonymous && mb_strlen($author) < 1) {
    echo json_encode(['success' => false, 'error' => 'Vul je naam in of kies anoniem.']);
    exit;
}

try {
    $review = Review::create([
        'author'    => $anonymous ? '' : $author,
        'location'  => $location,
        'stars'     => $stars,
        'quote'     => $quote,
        'anonymous' => $anonymous ? 1 : 0,
    ]);
    echo json_encode([
        'success'  => true,
        'author'   => $anonymous ? 'Anoniem' : $author,
        'location' => $location,
        'stars'    => $stars,
        'quote'    => $quote,
    ]);
} catch (\Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Er ging iets mis.']);
}
