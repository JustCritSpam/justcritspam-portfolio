import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ShieldAlert, Cpu, CheckCircle2, Lock, Unlock, Zap } from 'lucide-react'

export const HackerGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'failed'>('idle')
  const [sequence, setSequence] = useState<string[]>([])
  const [userInput, setUserInput] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(30) // Increased time for better experience
  const [hackingProgress, setHackingProgress] = useState(0)

  const generateSequence = useCallback(() => {
    const chars = ['0', '1', 'F', 'X', 'A', '#']
    return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)])
  }, [])

  const startGame = () => {
    const newSeq = generateSequence()
    setSequence(newSeq)
    setUserInput([])
    setTimeLeft(30)
    setHackingProgress(0)
    setGameState('playing')
  }

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('failed')
      setTimeout(() => setGameState('idle'), 2000)
    }
  }, [timeLeft, gameState])

  const handleInput = (char: string) => {
    if (gameState !== 'playing') return
    
    const nextInput = [...userInput, char]
    const currentStep = userInput.length
    
    if (char === sequence[currentStep]) {
      setUserInput(nextInput)
      setHackingProgress((nextInput.length / sequence.length) * 100)
      if (nextInput.length === sequence.length) {
        setGameState('won')
        setTimeout(() => setGameState('idle'), 4000)
      }
    } else {
      setUserInput([])
      setHackingProgress(0)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4">
      <motion.div 
        className="bg-slate-950 border-2 border-emerald-500/30 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden group"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Win Animation Overlay */}
        <AnimatePresence>
          {gameState === 'won' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/10 backdrop-blur-sm pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
                className="bg-slate-950 border-4 border-emerald-500 rounded-full p-12 shadow-[0_0_100px_rgba(16,185,129,0.5)]"
              >
                <Unlock size={80} className="text-emerald-500" />
              </motion.div>
              {/* Particles/Scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_4px] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Cpu className="text-emerald-500 animate-pulse" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter">ROOT_EXPLOIT.v2</h3>
            </div>
            <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-[0.3em] mb-4">Status: {gameState === 'playing' ? 'Brute-forcing kernel...' : 'Awaiting initialization'}</p>
            <p className="text-white/40 text-xs font-mono max-w-md">
              Decripta la sequenza di accesso al kernel trovando i nodi corretti. Se sbagli, il sistema resetterà l'iniezione per motivi di sicurezza. Hai poco tempo prima che il firewall ti rilevi.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {gameState === 'playing' && (
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-mono text-red-500/60 uppercase">System_Shutdown_In:</span>
                <div className="bg-red-500/10 border border-red-500/30 px-6 py-2 rounded-xl font-mono text-red-500 text-xl font-bold">
                  {timeLeft.toString().padStart(2, '0')}s
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Hacking Interface */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono text-emerald-500/40 uppercase">
                <span>Iniezione Pacchetti...</span>
                <span>{Math.round(hackingProgress)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${hackingProgress}%` }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 py-8 bg-black/20 rounded-3xl border border-white/5 shadow-inner">
              {sequence.map((char, i) => (
                <div key={i} className="relative">
                  <motion.div 
                    animate={userInput[i] ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } : {}}
                    className={`w-12 h-16 md:w-16 md:h-20 rounded-2xl border-2 flex items-center justify-center text-2xl md:text-3xl font-black font-mono transition-all duration-300 ${
                      userInput[i] === char 
                        ? 'border-emerald-500 text-emerald-500 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                        : 'border-white/10 text-white/5 bg-white/5'
                    }`}
                  >
                    {userInput[i] ? char : <Lock size={20} className="opacity-20" />}
                  </motion.div>
                  {userInput[i] === char && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 rounded-full p-1"
                    >
                      <Zap size={12} fill="currentColor" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {['0', '1', 'F', 'X', 'A', '#'].map((char) => (
                <button
                  key={char}
                  onClick={() => handleInput(char)}
                  disabled={gameState !== 'playing'}
                  className="h-16 bg-slate-900 hover:bg-emerald-500 hover:text-slate-950 border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 rounded-xl font-mono font-bold text-xl transition-all disabled:opacity-10 group"
                >
                  <span className="group-hover:scale-125 transition-transform inline-block">{char}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-5 bg-black/60 rounded-[2rem] p-6 border border-white/5 font-mono text-[11px] h-[360px] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 opacity-50">
              <span>DEBUG_CONSOLE_v2.0</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden space-y-2 opacity-80">
              <AnimatePresence mode="popLayout">
                {gameState === 'won' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-emerald-400 gap-4 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/50">
                      <Unlock size={40} className="animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black tracking-tighter">ACCESS_GRANTED</p>
                      <p className="text-[10px] opacity-60 uppercase tracking-widest">Payload delivered successfully.<br/>Root privileges obtained.</p>
                    </div>
                  </motion.div>
                ) : gameState === 'failed' ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-red-500 gap-4 text-center"
                  >
                    <ShieldAlert size={48} className="animate-pulse" />
                    <p className="text-xl font-black">TRACE_DETECTED</p>
                    <p className="text-[10px] opacity-60 uppercase">Emergency logout initiated.<br/>Connection closed by host.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-emerald-500/50">{`> initializing_brute_force_module...`}</p>
                    <p className="text-emerald-500/50">{`> scanning_vulnerabilities... OK`}</p>
                    <p className="text-cyan-500">{`> target_id: 0xCF_SPAM_ROOT`}</p>
                    {userInput.map((input, i) => (
                      <motion.p 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        key={i} 
                        className="text-emerald-400"
                      >
                        {`> node_${i + 1}_decrypted: [${input}] - sync_complete`}
                      </motion.p>
                    ))}
                    {gameState === 'playing' && (
                      <motion.p 
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="text-emerald-500"
                      >
                        {`> awaiting_node_${userInput.length + 1}_input_`}
                      </motion.p>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 opacity-40 italic">
              User: developer@justcritspam ~ %
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          {gameState !== 'playing' && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-12 py-5 bg-emerald-500 text-slate-950 rounded-2xl font-black flex items-center gap-3 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <Terminal size={20} className="relative z-10" />
              <span className="relative z-10 uppercase tracking-tighter text-lg">
                {gameState === 'won' ? 'Ricomincia_Hack' : 'Inizializza_Exploit'}
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
