<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Contact.php';

class ContactController
{
    private const EMAIL_PATTERN = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    private const PHONE_PATTERN = '/^[0-9+\s()\/\-]{8,20}$/';

    public function submit(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            $this->redirect('index.php');
        }

        $name     = trim($_POST['name']     ?? '');
        $phone    = trim($_POST['phone']    ?? '');
        $email    = trim($_POST['email']    ?? '');
        $question = trim($_POST['question'] ?? '');

        $errors = $this->validate($name, $phone, $email, $question);

        if (!empty($errors)) {
            http_response_code(422);
            $this->redirect('index.php#contact');
        }

        try {
            Contact::create([
                'name'     => $name,
                'phone'    => $phone,
                'email'    => $email,
                'question' => $question,
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            $this->redirect('index.php#contact');
        }

        $this->redirect('index.php?contact=success#contact');
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

        return $errors;
    }

    private function redirect(string $url): never
    {
        header('Location: ' . $url);
        exit;
    }
}
