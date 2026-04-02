import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

type Priority = 'Bassa' | 'Media' | 'Alta' | 'Urgente'

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'Bassa',   label: 'Bassa',   color: 'border-slate-500 text-slate-400 hover:border-slate-400' },
  { value: 'Media',   label: 'Media',   color: 'border-blue-500/50 text-blue-400 hover:border-blue-400' },
  { value: 'Alta',    label: 'Alta',    color: 'border-yellow-500/50 text-yellow-400 hover:border-yellow-400' },
  { value: 'Urgente', label: '🔴 Urgente', color: 'border-red-500/50 text-red-400 hover:border-red-400' },
]

export function TaskSubmit() {
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
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Errore imprevisto')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="commissiona" className="py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-2/5">
          <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">Open Queue</h2>
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-8 leading-none">
            Hai qualcosa<br/>in mente?
          </h3>
          <div className="space-y-5 text-slate-400 text-lg font-light leading-relaxed">
            <p>
              Lasciami un task con il tuo nome, la descrizione e la priorità.
              Lo vedrò direttamente nella mia dashboard e ti risponderò su Discord.
            </p>
            <p>
              <span className="text-emerald-400 font-medium">Nessuna registrazione</span> richiesta — solo scrivi cosa ti serve.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {[
              { label: 'Risposta media', value: '< 24h' },
              { label: 'Contatto', value: 'Discord DM' },
              { label: 'Disponibilità', value: 'Plugin, Web, Consulting' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <p className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-1">{item.label}</p>
                <p className="text-white font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-3/5 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/5 rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 via-cyan-500/50 to-transparent" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                  <p className="text-2xl font-bold text-white">Task inviato!</p>
                  <p className="text-slate-400">Lo vedrò a breve nella dashboard.</p>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <p className="text-2xl font-bold text-white">Qualcosa è andato storto</p>
                  <p className="text-slate-400 text-sm">{errorMsg}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
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
                      Descrivi il task
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Ho bisogno di un plugin che..."
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
                      <><Loader2 className="w-4 h-4 animate-spin" /> Invio in corso...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Invia Task</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
