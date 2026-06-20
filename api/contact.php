<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false]);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$name     = trim($_POST['name']     ?? '');
$phone    = trim($_POST['phone']    ?? '');
$email    = trim($_POST['email']    ?? '');
$question = trim($_POST['question'] ?? '');

if ($name === '' || $phone === '' || $email === '' || $question === '') {
    echo json_encode(['success' => false, 'error' => 'Vul alle velden in.']);
    exit;
}
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) {
    echo json_encode(['success' => false, 'error' => 'Vul een geldig e-mailadres in.']);
    exit;
}
if (!preg_match('/^[0-9+\s()\/\-]{8,20}$/', $phone)) {
    echo json_encode(['success' => false, 'error' => 'Vul een geldig telefoonnummer in.']);
    exit;
}

try {
    $stmt = db()->prepare(
        'INSERT INTO questions (name, phone, email, question) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$name, $phone, $email, $question]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Er ging iets mis, probeer opnieuw.']);
}
