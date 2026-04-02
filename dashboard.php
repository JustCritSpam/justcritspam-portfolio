<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header('Location: api/login.php');
    exit;
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: api/login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard — JustCritSpam</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: #020617;
    font-family: 'Courier New', monospace;
    color: #f8fafc;
    padding: 2rem 1rem;
  }
  .container { max-width: 1100px; margin: 0 auto; }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #1e293b;
  }
  .header-left .label {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #10b981;
    font-weight: bold;
  }
  .header-left h1 { font-size: 2rem; font-weight: 900; }
  .logout {
    background: #1e293b;
    border: 1px solid #334155;
    color: #94a3b8;
    font-family: inherit;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
  }
  .logout:hover { border-color: #ef4444; color: #f87171; }

  .filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .filter-btn {
    background: #0f172a;
    border: 1px solid #1e293b;
    color: #94a3b8;
    font-family: inherit;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-btn:hover, .filter-btn.active { border-color: #10b981; color: #10b981; }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .stat-card {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 1rem;
    padding: 1.25rem;
  }
  .stat-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em; color: #475569; margin-bottom: 0.4rem; }
  .stat-value { font-size: 2rem; font-weight: 900; }
  .stat-value.green { color: #10b981; }
  .stat-value.yellow { color: #f59e0b; }
  .stat-value.red { color: #ef4444; }
  .stat-value.blue { color: #3b82f6; }

  #tasks-list { display: flex; flex-direction: column; gap: 1rem; }

  .task-card {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 1.25rem;
    padding: 1.5rem;
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    transition: border-color 0.2s;
  }
  .task-card:hover { border-color: #334155; }
  .task-card.done { opacity: 0.45; }
  .task-card.done .task-name { text-decoration: line-through; }

  .task-check {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #334155;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    shrink: 0;
    transition: all 0.2s;
    flex-shrink: 0;
    margin-top: 0.15rem;
    font-size: 0.9rem;
    color: #020617;
    background: transparent;
  }
  .task-card.done .task-check { background: #10b981; border-color: #10b981; }
  .task-check:hover { border-color: #10b981; }

  .task-body { flex: 1; min-width: 0; }
  .task-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }
  .task-name { font-weight: 700; font-size: 0.95rem; }
  .task-date { font-size: 0.65rem; color: #475569; }
  .badge {
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: bold;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    border: 1px solid;
  }
  .badge-Bassa   { color: #64748b; border-color: #334155; background: rgba(100,116,139,0.1); }
  .badge-Media   { color: #3b82f6; border-color: #3b82f6; background: rgba(59,130,246,0.1); }
  .badge-Alta    { color: #f59e0b; border-color: #f59e0b; background: rgba(245,158,11,0.1); }
  .badge-Urgente { color: #ef4444; border-color: #ef4444; background: rgba(239,68,68,0.1); }
  .badge-pending     { color: #94a3b8; border-color: #334155; background: rgba(148,163,184,0.1); }
  .badge-in_progress { color: #f59e0b; border-color: #f59e0b; background: rgba(245,158,11,0.1); }
  .badge-done        { color: #10b981; border-color: #10b981; background: rgba(16,185,129,0.1); }

  .task-message { font-size: 0.9rem; color: #94a3b8; line-height: 1.6; }

  .task-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .action-btn {
    background: #1e293b;
    border: 1px solid #334155;
    color: #94a3b8;
    font-family: inherit;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.35rem 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .action-btn:hover { border-color: #f59e0b; color: #f59e0b; }
  .action-btn.delete:hover { border-color: #ef4444; color: #ef4444; }

  .empty { text-align: center; padding: 4rem; color: #475569; }
  .empty span { font-size: 2rem; display: block; margin-bottom: 1rem; }

  .loading { text-align: center; padding: 3rem; color: #475569; font-size: 0.85rem; }
</style>
</head>
<body>
<div class="container">
  <header>
    <div class="header-left">
      <p class="label">Admin Panel</p>
      <h1>Task Dashboard</h1>
    </div>
    <a href="?logout=1" class="logout">Logout</a>
  </header>

  <div class="stats">
    <div class="stat-card">
      <p class="stat-label">Totali</p>
      <p class="stat-value blue" id="stat-total">—</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">In attesa</p>
      <p class="stat-value" id="stat-pending">—</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">In corso</p>
      <p class="stat-value yellow" id="stat-progress">—</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Completati</p>
      <p class="stat-value green" id="stat-done">—</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Urgenti</p>
      <p class="stat-value red" id="stat-urgent">—</p>
    </div>
  </div>

  <div class="filters">
    <button class="filter-btn active" data-filter="all">Tutti</button>
    <button class="filter-btn" data-filter="pending">In attesa</button>
    <button class="filter-btn" data-filter="in_progress">In corso</button>
    <button class="filter-btn" data-filter="done">Completati</button>
    <button class="filter-btn" data-filter="Urgente">🔴 Urgenti</button>
    <button class="filter-btn" data-filter="Alta">🟡 Alta priorità</button>
  </div>

  <div id="tasks-list"><p class="loading">Caricamento...</p></div>
</div>

<script>
let allTasks = [];
let currentFilter = 'all';

async function loadTasks() {
  const res = await fetch('api/tasks.php');
  if (!res.ok) { window.location = 'api/login.php'; return; }
  allTasks = await res.json();
  updateStats();
  renderTasks();
}

function updateStats() {
  document.getElementById('stat-total').textContent   = allTasks.length;
  document.getElementById('stat-pending').textContent = allTasks.filter(t => t.status === 'pending').length;
  document.getElementById('stat-progress').textContent = allTasks.filter(t => t.status === 'in_progress').length;
  document.getElementById('stat-done').textContent    = allTasks.filter(t => t.status === 'done').length;
  document.getElementById('stat-urgent').textContent  = allTasks.filter(t => t.priority === 'Urgente').length;
}

function filterTasks() {
  if (currentFilter === 'all') return allTasks;
  if (['pending', 'in_progress', 'done'].includes(currentFilter))
    return allTasks.filter(t => t.status === currentFilter);
  return allTasks.filter(t => t.priority === currentFilter);
}

function formatDate(dt) {
  const d = new Date(dt);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function renderTasks() {
  const list = document.getElementById('tasks-list');
  const tasks = filterTasks();

  if (tasks.length === 0) {
    list.innerHTML = '<div class="empty"><span>✓</span>Nessun task qui.</div>';
    return;
  }

  list.innerHTML = tasks.map(t => `
    <div class="task-card ${t.status === 'done' ? 'done' : ''}" id="task-${t.id}">
      <div class="task-check" onclick="toggleDone(${t.id}, '${t.status}')">
        ${t.status === 'done' ? '✓' : ''}
      </div>
      <div class="task-body">
        <div class="task-meta">
          <span class="task-name">${escHtml(t.name)}</span>
          <span class="badge badge-${t.priority}">${escHtml(t.priority)}</span>
          <span class="badge badge-${t.status}">${statusLabel(t.status)}</span>
          <span class="task-date">${formatDate(t.created_at)}</span>
        </div>
        <p class="task-message">${escHtml(t.message)}</p>
      </div>
      <div class="task-actions">
        ${t.status !== 'in_progress' ? `<button class="action-btn" onclick="setStatus(${t.id}, 'in_progress')">In corso</button>` : ''}
        ${t.status !== 'pending' ? `<button class="action-btn" onclick="setStatus(${t.id}, 'pending')">Reset</button>` : ''}
        <button class="action-btn delete" onclick="deleteTask(${t.id})">Elimina</button>
      </div>
    </div>
  `).join('');
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function statusLabel(s) {
  return { pending: 'In attesa', in_progress: 'In corso', done: 'Fatto' }[s] || s;
}

async function toggleDone(id, currentStatus) {
  const newStatus = currentStatus === 'done' ? 'pending' : 'done';
  await setStatus(id, newStatus);
}

async function setStatus(id, status) {
  await fetch('api/update.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  });
  await loadTasks();
}

async function deleteTask(id) {
  if (!confirm('Eliminare questo task?')) return;
  await fetch('api/delete.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  await loadTasks();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

loadTasks();
setInterval(loadTasks, 30000);
</script>
</body>
</html>
