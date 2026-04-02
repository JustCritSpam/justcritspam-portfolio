<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once 'db.php';

$body = json_decode(file_get_contents('php://input'), true);

$name     = trim($body['name'] ?? '');
$message  = trim($body['message'] ?? '');
$priority = trim($body['priority'] ?? 'Media');

if (!$name || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Nome e messaggio sono obbligatori']);
    exit;
}

$allowed_priorities = ['Bassa', 'Media', 'Alta', 'Urgente'];
if (!in_array($priority, $allowed_priorities)) {
    $priority = 'Media';
}

$db   = getDB();
$stmt = $db->prepare('INSERT INTO tasks (name, message, priority) VALUES (?, ?, ?)');
$stmt->execute([$name, $message, $priority]);

echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
