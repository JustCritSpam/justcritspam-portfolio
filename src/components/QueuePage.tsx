import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2, Terminal } from 'lucide-react'

type Priority = 'Bassa' | 'Media' | 'Alta' | 'Urgente'

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'Bassa',   label: 'Bassa',   color: 'border-slate-500 text-slate-400 hover:border-slate-400' },
  { value: 'Media',   label: 'Media',   color: 'border-blue-500/50 text-blue-400 hover:border-blue-400' },
  { value: 'Alta',    label: 'Alta',    color: 'border-yellow-500/50 text-yellow-400 hover:border-yellow-400' },
  { value: 'Urgente', label: '🔴 Urgente', color: 'border-red-500/50 text-red-400 hover:border-red-400' },
]

export function QueuePage() {
  const [name, setName]         = useState('')
  const [message, setMessage]   = useState('')
  const [priority, setPriority] = useState<Priority>('Media')
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), priority }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Errore server')
      setStatus('success')
      setName('')
      setMessage('')
      setPriority('Media')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Errore imprevisto')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-4 py-16 selection:bg-emerald-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="flex items-center gap-3 mb-10">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Terminal size={18} className="text-slate-950" />
            </div>
            <span className="font-mono font-black text-white tracking-tighter text-xl">
              JC<span className="text-emerald-500">SPAM</span>
            </span>
          </a>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold mb-2">Staff Queue</p>
        <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Mandami un task.</h1>
        <p className="text-slate-500 text-sm mb-10 font-light">
          Scrivi cosa devo fare e lo vedo subito nella dashboard.
        </p>

        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-14 text-center gap-4"
              >
                <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                <p className="text-2xl font-bold text-white">Task inviato!</p>
                <p className="text-slate-500 text-sm">Lo vedo nella dashboard, ci penso io.</p>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-14 text-center gap-4"
              >
                <AlertCircle className="w-14 h-14 text-red-500" />
                <p className="text-2xl font-bold text-white">Errore</p>
                <p className="text-slate-500 text-sm">{errorMsg}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-500 font-bold mb-2">
                    Il tuo nome / Discord
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="es. Mario#1234"
                    required
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-500 font-bold mb-2">
                    Cosa devo fare
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Descrivi il task nel dettaglio..."
                    required
                    rows={5}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono text-sm resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-emerald-500 font-bold mb-3">
                    Priorità
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {priorities.map(p => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPriority(p.value)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                          priority === p.value
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : `bg-transparent ${p.color}`
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Invio...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Invia Task</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
