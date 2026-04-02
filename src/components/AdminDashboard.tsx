import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, Clock, Loader2, LogOut,
  RefreshCw, Trash2, AlertTriangle, ExternalLink,
} from 'lucide-react'

interface Task {
  id: number
  name: string
  message: string
  priority: 'Bassa' | 'Media' | 'Alta' | 'Urgente'
  status: 'pending' | 'in_progress' | 'done'
  created_at: string
  url: string
}

type Filter = 'all' | 'pending' | 'in_progress' | 'done' | 'Urgente' | 'Alta'

const PRIORITY_COLORS: Record<string, string> = {
  Bassa:   'text-slate-400 border-slate-600 bg-slate-500/10',
  Media:   'text-blue-400 border-blue-500/50 bg-blue-500/10',
  Alta:    'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
  Urgente: 'text-red-400 border-red-500/50 bg-red-500/10',
}
const PRIORITY_EMOJI: Record<string, string> = {
  Bassa: '⚪', Media: '🔵', Alta: '🟡', Urgente: '🔴',
}
const STATUS_LABEL: Record<string, string> = {
  pending: 'In attesa', in_progress: 'In corso', done: 'Completato',
}

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json() as { token?: string; error?: string }
      if (!res.ok || !data.token) throw new Error(data.error ?? 'Credenziali errate')
      localStorage.setItem('admin_token', data.token)
      onLogin(data.token)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Errore')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold mb-2">Admin Access</p>
          <h1 className="text-3xl font-black text-white mb-8 tracking-tighter">Dashboard</h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
              <AlertTriangle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-black text-sm uppercase tracking-widest py-3.5 rounded-xl transition-all"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Accedi →'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export function AdminDashboard() {
  const [token, setToken]   = useState<string | null>(() => localStorage.getItem('admin_token'))
  const [tasks, setTasks]   = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(false)
  const [showDone, setShowDone] = useState(false)

  const authHeaders = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }

  const loadTasks = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const [open, closed] = await Promise.all([
        fetch('/api/tasks?state=open',   { headers: authHeaders }).then(r => r.json()),
        fetch('/api/tasks?state=closed', { headers: authHeaders }).then(r => r.json()),
      ])
      setTasks([...(Array.isArray(open) ? open : []), ...(Array.isArray(closed) ? closed : [])])
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { loadTasks() }, [loadTasks])
  useEffect(() => {
    const iv = setInterval(loadTasks, 30_000)
    return () => clearInterval(iv)
  }, [loadTasks])

  async function updateStatus(id: number, status: Task['status']) {
    await fetch('/api/update', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ id, status }),
    })
    await loadTasks()
  }

  async function deleteTask(id: number) {
    if (!confirm('Eliminare questo task?')) return
    await fetch('/api/delete', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ id }),
    })
    await loadTasks()
  }

  function logout() {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  if (!token) return <AdminLogin onLogin={t => { setToken(t); loadTasks() }} />

  const visible = tasks.filter(t => {
    if (!showDone && t.status === 'done') return false
    if (filter === 'all') return true
    if (filter === 'pending' || filter === 'in_progress' || filter === 'done') return t.status === filter
    return t.priority === filter
  })

  const stats = {
    total:    tasks.filter(t => t.status !== 'done').length,
    pending:  tasks.filter(t => t.status === 'pending').length,
    progress: tasks.filter(t => t.status === 'in_progress').length,
    done:     tasks.filter(t => t.status === 'done').length,
    urgent:   tasks.filter(t => t.priority === 'Urgente' && t.status !== 'done').length,
  }

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Tutti' },
    { key: 'pending', label: 'In attesa' },
    { key: 'in_progress', label: 'In corso' },
    { key: 'done', label: 'Completati' },
    { key: 'Urgente', label: '🔴 Urgenti' },
    { key: 'Alta', label: '🟡 Alta priorità' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <header className="flex items-center justify-between mb-12 pb-8 border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold mb-1">Admin Panel</p>
            <h1 className="text-4xl font-black tracking-tighter text-white">Task Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadTasks}
              disabled={loading}
              className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-red-400 hover:border-red-500/20 transition-all text-sm font-mono"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {[
            { label: 'Aperti',    value: stats.total,    color: 'text-white' },
            { label: 'In attesa', value: stats.pending,  color: 'text-slate-400' },
            { label: 'In corso',  value: stats.progress, color: 'text-yellow-400' },
            { label: 'Completati',value: stats.done,     color: 'text-emerald-400' },
            { label: 'Urgenti',   value: stats.urgent,   color: 'text-red-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                filter === f.key
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setShowDone(v => !v)}
            className={`ml-auto px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              showDone
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20'
            }`}
          >
            {showDone ? 'Nascondi completati' : 'Mostra completati'}
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {visible.length === 0 ? (
              <div className="text-center py-20 text-slate-600">
                <CheckCircle2 size={40} className="mx-auto mb-4 opacity-30" />
                <p className="text-sm">Nessun task qui.</p>
              </div>
            ) : visible.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`bg-white/5 border rounded-2xl p-5 flex gap-4 items-start transition-all group ${
                  task.status === 'done' ? 'opacity-40 border-white/5' : 'border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => updateStatus(task.id, task.status === 'done' ? 'pending' : 'done')}
                  className="mt-0.5 shrink-0 transition-all"
                >
                  {task.status === 'done'
                    ? <CheckCircle2 size={22} className="text-emerald-500" />
                    : <Circle size={22} className="text-slate-600 hover:text-emerald-500 transition-colors" />
                  }
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-bold text-white text-sm">{task.name}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${PRIORITY_COLORS[task.priority]}`}>
                      {PRIORITY_EMOJI[task.priority]} {task.priority}
                    </span>
                    {task.status === 'in_progress' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-400">
                        ⚡ In corso
                      </span>
                    )}
                    <span className="text-[10px] text-slate-600 font-mono ml-auto">
                      {new Date(task.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{task.message}</p>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  {task.status !== 'in_progress' && task.status !== 'done' && (
                    <button
                      onClick={() => updateStatus(task.id, 'in_progress')}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-yellow-500/20 transition-all"
                    >
                      <Clock size={10} /> In corso
                    </button>
                  )}
                  {task.status === 'in_progress' && (
                    <button
                      onClick={() => updateStatus(task.id, 'pending')}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:border-white/20 transition-all"
                    >
                      Reset
                    </button>
                  )}
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:text-white transition-all"
                  >
                    <ExternalLink size={10} /> GitHub
                  </a>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/5 border border-red-500/10 text-red-500/50 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={10} /> Elimina
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
