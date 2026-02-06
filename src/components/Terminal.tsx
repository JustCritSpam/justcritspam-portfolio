import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Initializing JustCritSpam.core...',
    '[OK] Minecraft API established (v1.20.1)',
    '[OK] Ready to build something epic.'
  ])
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const triggerInitSequence = () => {
    const sequence = [
      '[CRITICAL] Bypassing secure firewall...',
      '[SYSTEM] Attempting neural handshake...',
      '[ACCESS] Encrypted tunnel established.',
      '[INFO] Downloading project assets...',
      '[OK] Identity verified: developer@justcritspam',
      '[SYSTEM] Core initialization complete.'
    ]

    sequence.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg])
        if (i === sequence.length - 1) {
          setTimeout(() => {
            const element = document.getElementById('plugins')
            element?.scrollIntoView({ behavior: 'smooth' })
          }, 800)
        }
      }, i * 400)
    })
  }

  useEffect(() => {
    const handleInit = () => triggerInitSequence()
    window.addEventListener('terminal-init', handleInit)
    return () => window.removeEventListener('terminal-init', handleInit)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const cmd = inputValue.toLowerCase().trim()
    const newLogs = [...logs, `> ${inputValue}`]

    switch (cmd) {
      case 'help':
        newLogs.push('Available commands:', '  help - Show this list', '  contact - How to reach me', '  clear - Clear the console', '  about - Learn about me')
        break
      case 'contact':
        newLogs.push('Reach me at:', '  Telegram: @JustCritSpam', '  Discord: justcritspam')
        break
      case 'about':
        newLogs.push('Developer Java/Kotlin specializzato in plugin Minecraft ad alte prestazioni.')
        break
      case 'clear':
        setLogs([])
        setInputValue('')
        return
      default:
        newLogs.push(`Command not found: ${cmd}. Type 'help' for assistance.`)
    }

    setLogs(newLogs)
    setInputValue('')
  }

  return (
    <div 
      className="w-full max-w-2xl mx-auto mt-8 font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-white/5 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-slate-500 text-[10px] ml-2 uppercase tracking-widest font-bold">system_console</span>
        </div>
        <div ref={scrollRef} className="p-6 h-72 overflow-y-auto custom-scrollbar bg-slate-950/50">
          {logs.map((log, i) => {
            const isUser = log.startsWith('>');
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1 flex gap-2"
              >
                <span className="text-emerald-500 shrink-0">{isUser ? '$' : '>'}</span>
                <span className={`${isUser ? 'text-white' : 'text-slate-400'}`}>
                  {isUser ? log.slice(1).trim() : log}
                </span>
              </motion.div>
            );
          })}
          
          <form onSubmit={handleCommand} className="flex items-center gap-2 relative mt-1">
            <span className="text-emerald-500 shrink-0">$</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full p-0 caret-transparent focus:ring-0"
                autoFocus
                spellCheck={false}
              />
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute w-2 h-4 bg-emerald-500 pointer-events-none"
                style={{ 
                  left: `calc(${inputValue.length}ch + 0.1ch)`,
                  display: 'inline-block'
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
