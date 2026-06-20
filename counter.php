<?php

require_once __DIR__ . '/controllers/CounterController.php';

$controller = new CounterController();
$controller->getCount();
