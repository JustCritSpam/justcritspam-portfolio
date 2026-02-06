import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Shield, User, Lock, Terminal as TerminalIcon } from 'lucide-react'

const DecryptText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*'

  useEffect(() => {
    let iteration = 0
    let interval: any = null

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )

        if (iteration >= text.length) {
          clearInterval(interval)
        }
        iteration += 1 / 3
      }, 30)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, delay])

  return <span>{displayText}</span>
}

export const Dossier = () => {
  const [isOpen, setIsOpen] = useState(false)

  const stats = [
    { label: 'Codename', value: 'JUSTCRITSPAM' },
    { label: 'Signature', value: '0xCF_77_SPAM_88_V4' },
    { label: 'Clearance', value: 'Level 5 - Admin Access' },
    { label: 'Status', value: 'Active - Deployment AuraMC' },
  ]

  const technicalIntel = [
    { category: 'Infiltration', skills: 'NMS Bypass, Packet Injection, Protocol Manipulation' },
    { category: 'Defense', skills: 'Anti-DDoS, Heuristic Analysis, Bytecode Obfuscation' },
    { category: 'Infrastructure', skills: 'Distributed Systems, gRPC Mesh, Redis Sharding' },
  ]

  const logs = [
    { date: '2024.02.06', event: 'AuraCore kernel optimization stable' },
    { date: '2023.11.15', event: 'Detected and mitigated zero-day exploit' },
    { date: '2023.08.22', event: 'Neural engine warm-up sequence initialized' },
  ]

  return (
    <section id="about" className="py-32 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <FileText className="text-emerald-500" />
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold">Confidential_File</h2>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Subject_Dossier_v4.2</h3>
        </div>
      </div>

      <div className="relative">
        {!isOpen ? (
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(16,185,129,0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="w-full p-12 bg-slate-900/50 border-2 border-dashed border-emerald-500/30 rounded-[2.5rem] flex flex-col items-center gap-6 group transition-all"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-500">
              <Lock size={32} className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white mb-2">ACCESS_RESTRICTED</p>
              <p className="text-emerald-500/50 font-mono text-xs uppercase tracking-widest">Click to initialize decryption sequence</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-emerald-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            {/* Folder Tab Effect */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Shield size={120} />
            </div>

            <div className="p-8 md:p-12 border-b border-white/5 bg-white/5 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 border-emerald-500/30 overflow-hidden bg-slate-950 flex items-center justify-center">
                  <User size={64} className="text-emerald-500/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-emerald-500/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="w-1/2 h-full bg-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-1">
                  <h4 className="text-4xl font-black text-white tracking-tighter">
                    <DecryptText text="JUSTCRITSPAM" />
                  </h4>
                  <p className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase">Senior Systems Developer</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] text-emerald-500/40 uppercase font-bold tracking-widest">{stat.label}</p>
                      <p className="text-xs text-white/80 font-mono">
                        <DecryptText text={stat.value} delay={500 + i * 200} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Main Bio */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-500/60 font-mono text-xs">
                  <TerminalIcon size={14} />
                  <span>EXTRACTING_BIO...</span>
                </div>
                <div className="text-slate-400 font-light leading-relaxed text-lg space-y-4 border-l-2 border-emerald-500/20 pl-6">
                  <p>
                    Specialista in <span className="text-white font-bold">Ingegneria Inversa</span> e <span className="text-white font-bold">Ottimizzazione di Sistemi Distribuiti</span>. Ho dedicato gli ultimi 6 anni a smontare e ricostruire il protocollo di Minecraft, spingendo le performance oltre i limiti teorici del linguaggio Java.
                  </p>
                  <p>
                    Non mi limito a scrivere codice: progetto infrastrutture capaci di reggere carichi massivi attraverso l'uso di <span className="text-emerald-500">NMS</span>, manipolazione diretta del <span className="text-emerald-500">Bytecode</span> e sistemi di comunicazione asincrona a bassa latenza.
                  </p>
                </div>
              </div>

              {/* Technical Intel Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {technicalIntel.map((intel, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{intel.category}</p>
                    <p className="text-[11px] text-slate-400 font-mono leading-tight">{intel.skills}</p>
                  </div>
                ))}
              </div>

              {/* Incident Logs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-500/60 font-mono text-xs">
                  <Shield size={14} />
                  <span>INCIDENT_LOGS_HISTORY</span>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] space-y-2 border border-white/5">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
                      <span className="text-emerald-500">[{log.date}]</span>
                      <span className="text-slate-400">EVENT_ID_{i}:</span>
                      <span className="text-white">{log.event}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4">
                {['Java', 'Kotlin', 'Go', 'React', 'Cybersecurity'].map((tag, i) => (
                  <div key={i} className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
