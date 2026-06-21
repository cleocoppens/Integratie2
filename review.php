<?php

require_once __DIR__ . '/models/Review.php';

$stars     = (int)   ($_POST['stars']     ?? 0);
$quote     = trim(   $_POST['quote']      ?? '');
$location  = trim(   $_POST['location']   ?? '');
$author    = trim(   $_POST['author']     ?? '');
$anonymous = !empty( $_POST['anonymous']);

if (
    $_SERVER['REQUEST_METHOD'] === 'POST' &&
    $stars >= 1 && $stars <= 5 &&
    mb_strlen($quote) >= 1 && mb_strlen($quote) <= 150 &&
    $location !== '' &&
    ($anonymous || $author !== '')
) {
    Review::create($anonymous ? '' : $author, $location, $stars, $quote, $anonymous);
}

header('Location: index.html#reviews');
exit;
