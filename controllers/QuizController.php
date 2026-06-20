<?php

class QuizController
{
    private const VALID_CHOICES = ['koffie', 'plannen', 'staren', 'stilte'];

    private const TYPES = [
        'koffie'  => ['name' => 'De Barista', 'line' => 'Jouw ochtend begint pas echt bij de eerste kop.'],
        'plannen' => ['name' => 'De Planner', 'line' => 'Jij zet de toon voor heel het team, nog voor 8u.'],
        'staren'  => ['name' => 'De Dromer',  'line' => 'Even het raam, even de stilte — dan ben je klaar.'],
        'stilte'  => ['name' => 'De Monnik',  'line' => 'Niemand stoort, alles klopt. Dit is jouw uur.'],
    ];

    public function submit(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            $this->redirect('index.html');
        }

        $choice = $_POST['q1'] ?? '';

        if (!in_array($choice, self::VALID_CHOICES, true)) {
            $this->redirect('index.html#quiz');
        }

        $type = self::TYPES[$choice];
        $this->redirect('index.html?quiz_type=' . urlencode($type['name']) . '#quiz');
    }

    private function redirect(string $url): never
    {
        header('Location: ' . $url);
        exit;
    }
}
