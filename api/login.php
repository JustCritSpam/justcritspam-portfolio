<?php
session_start();

define('ADMIN_PASSWORD', 'cambiami123'); // <-- CAMBIA QUESTA PASSWORD

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pwd = $_POST['password'] ?? '';
    if (hash_equals(ADMIN_PASSWORD, $pwd)) {
        $_SESSION['admin'] = true;
        header('Location: ../dashboard.php');
        exit;
    }
    $error = 'Password errata.';
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login — JustCritSpam</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: #020617;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    color: #f8fafc;
  }
  .card {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 1.5rem;
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 0 60px rgba(16,185,129,0.05);
  }
  .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #10b981;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  h1 { font-size: 1.8rem; font-weight: 900; margin-bottom: 2rem; }
  input[type="password"] {
    width: 100%;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 0.75rem;
    padding: 0.85rem 1rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1.25rem;
    outline: none;
    transition: border-color 0.2s;
  }
  input[type="password"]:focus { border-color: #10b981; }
  button {
    width: 100%;
    background: #10b981;
    color: #020617;
    font-family: inherit;
    font-weight: 900;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: none;
    border-radius: 0.75rem;
    padding: 0.9rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  button:hover { opacity: 0.85; }
  .error {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
</style>
</head>
<body>
<div class="card">
  <p class="label">Admin Access</p>
  <h1>Dashboard</h1>
  <?php if (!empty($error)): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>
  <form method="POST">
    <input type="password" name="password" placeholder="Password" autofocus required>
    <button type="submit">Accedi →</button>
  </form>
</div>
</body>
</html>
