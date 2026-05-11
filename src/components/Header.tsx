import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export const Header = () => {
  const { t, lang, setLang } = useI18n()

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 bg-slate-950/70 backdrop-blur-xl border border-white/10 rounded-md px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          <span className="text-sm font-bold text-white tracking-tight">
            JustCrit<span className="text-slate-500">Spam</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">
          <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
          <a href="#experience" className="hover:text-white transition-colors">{t.nav.experience}</a>
          <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language switcher"
            className="hidden sm:flex items-center text-[10px] uppercase tracking-[0.2em] font-bold rounded-md border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setLang('it')}
              className={`px-3 py-1.5 transition-colors ${
                lang === 'it'
                  ? 'bg-white text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 transition-colors ${
                lang === 'en'
                  ? 'bg-white text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="https://github.com/justcritspam"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-md bg-white text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition-colors"
          >
            {t.nav.hireMe}
          </a>
        </div>
      </div>
    </motion.header>
  )
}
