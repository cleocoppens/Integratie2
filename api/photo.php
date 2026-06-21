<?php
require_once __DIR__ . '/../controllers/GalleryPhotoController.php';
(new GalleryPhotoController)->serveImage((int)($_GET['id'] ?? 0));
