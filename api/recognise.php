<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false]);
    exit;
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Confession.php';

$id    = (int) ($_POST['id']    ?? 0);
$delta = (int) ($_POST['delta'] ?? 0);

if ($id <= 0 || !in_array($delta, [-1, 1], true)) {
    echo json_encode(['success' => false]);
    exit;
}

try {
    $confession = Confession::find($id);
    if (!$confession) {
        echo json_encode(['success' => false]);
        exit;
    }
    $confession->recognition_count = max(0, $confession->recognition_count + $delta);
    $confession->save();
    echo json_encode(['success' => true, 'count' => $confession->recognition_count]);
} catch (\Exception $e) {
    echo json_encode(['success' => false]);
}
