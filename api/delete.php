<?php
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once 'db.php';

$body = json_decode(file_get_contents('php://input'), true);
$id   = (int)($body['id'] ?? 0);

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID non valido']);
    exit;
}

$db   = getDB();
$stmt = $db->prepare('DELETE FROM tasks WHERE id = ?');
$stmt->execute([$id]);

echo json_encode(['success' => true]);
