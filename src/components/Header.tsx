import { motion } from 'framer-motion'
import { Terminal, Github, Send } from 'lucide-react'

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Terminal size={18} className="text-slate-950" />
          </div>
          <span className="font-mono font-black text-white tracking-tighter text-xl">
            JC<span className="text-emerald-500">SPAM</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
          <a href="#plugins" className="hover:text-emerald-400 transition-colors">Plugins</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/justcritspam" 
            target="_blank" 
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://t.me/justcritspam" 
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 group"
          >
            <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="font-mono text-[10px] font-black uppercase">Hire_Me</span>
          </a>
        </div>
      </div>
    </motion.header>
  )
}
