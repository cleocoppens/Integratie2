<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false]);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$id    = (int) ($_POST['id']    ?? 0);
$delta = (int) ($_POST['delta'] ?? 0);

if ($id <= 0 || !in_array($delta, [-1, 1], true)) {
    echo json_encode(['success' => false]);
    exit;
}

try {
    $pdo  = db();
    $stmt = $pdo->prepare('SELECT recognition_count FROM confessions WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) {
        echo json_encode(['success' => false]);
        exit;
    }

    $newCount = max(0, (int) $row['recognition_count'] + $delta);
    $pdo->prepare('UPDATE confessions SET recognition_count = ? WHERE id = ?')
        ->execute([$newCount, $id]);

    echo json_encode(['success' => true, 'count' => $newCount]);
} catch (Exception $e) {
    echo json_encode(['success' => false]);
}
