<?php

require_once __DIR__ . '/../models/Question.php';

class ContactController
{
    private const EMAIL_PATTERN    = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    private const PHONE_PATTERN    = '/^[0-9+\s()\/\-]{8,20}$/';
    private const QUESTION_MAX_LEN = 200;

    public function ajax(): void
    {
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['success' => false]);
            exit;
        }

        $name     = trim($_POST['name']     ?? '');
        $phone    = trim($_POST['phone']    ?? '');
        $email    = trim($_POST['email']    ?? '');
        $question = trim($_POST['question'] ?? '');

        if ($name === '' || $phone === '' || $email === '' || $question === '') {
            echo json_encode(['success' => false, 'error' => 'Vul alle velden in.']);
            exit;
        }
        if (!preg_match(self::EMAIL_PATTERN, $email)) {
            echo json_encode(['success' => false, 'error' => 'Vul een geldig e-mailadres in.']);
            exit;
        }
        if (!preg_match(self::PHONE_PATTERN, $phone)) {
            echo json_encode(['success' => false, 'error' => 'Vul een geldig telefoonnummer in.']);
            exit;
        }

        try {
            Question::create($name, $phone, $email, $question);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => 'Er ging iets mis, probeer opnieuw.']);
        }
    }

    public function submit(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            $this->redirect('index.html');
        }

        $name     = trim($_POST['name']     ?? '');
        $phone    = trim($_POST['phone']    ?? '');
        $email    = trim($_POST['email']    ?? '');
        $question = trim($_POST['question'] ?? '');

        $errors = $this->validate($name, $phone, $email, $question);

        if (!empty($errors)) {
            http_response_code(422);
            $this->redirect('index.html#contact');
        }

        try {
            Question::create($name, $phone, $email, $question);
        } catch (Exception $e) {
            http_response_code(500);
            $this->redirect('index.html#contact');
        }

        $this->redirect('index.html?contact=success#contact');
    }

    private function validate(string $name, string $phone, string $email, string $question): array
    {
        $errors = [];
        if ($name === '')     $errors[] = 'Naam is verplicht.';
        if ($phone === '')    $errors[] = 'Telefoonnummer is verplicht.';
        if ($email === '')    $errors[] = 'E-mailadres is verplicht.';
        if ($question === '') $errors[] = 'Jouw vraag is verplicht.';

        if ($phone !== '' && !preg_match(self::PHONE_PATTERN, $phone)) {
            $errors[] = 'Vul een geldig telefoonnummer in.';
        }
        if ($email !== '' && !preg_match(self::EMAIL_PATTERN, $email)) {
            $errors[] = 'Vul een geldig e-mailadres in.';
        }
        if (mb_strlen($question) > self::QUESTION_MAX_LEN) {
            $errors[] = 'Jouw vraag mag maximaal ' . self::QUESTION_MAX_LEN . ' karakters bevatten.';
        }
        return $errors;
    }

    private function redirect(string $url): never
    {
        header('Location: ' . $url);
        exit;
    }
}
