<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Confession.php';

class CounterController
{
    public function getCount(): void
    {
        header('Content-Type: application/json');
        try {
            $count = Confession::count();
            echo json_encode(['count' => $count]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database niet bereikbaar.']);
        }
    }
}
