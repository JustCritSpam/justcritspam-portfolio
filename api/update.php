<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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

$body   = json_decode(file_get_contents('php://input'), true);
$id     = (int)($body['id'] ?? 0);
$status = trim($body['status'] ?? '');

$allowed = ['pending', 'in_progress', 'done'];
if (!$id || !in_array($status, $allowed)) {
    http_response_code(400);
    echo json_encode(['error' => 'Dati non validi']);
    exit;
}

$db   = getDB();
$stmt = $db->prepare('UPDATE tasks SET status = ? WHERE id = ?');
$stmt->execute([$status, $id]);

echo json_encode(['success' => true]);
