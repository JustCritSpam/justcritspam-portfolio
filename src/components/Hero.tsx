import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { StarsBackground } from './StarsBackground'

export const Hero = () => {
  const { t } = useI18n()

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 overflow-hidden"
    >
      <StarsBackground />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-emerald-500/[0.07] blur-[160px] rounded-full -z-10 animate-pulse-slow"
      />

      <div
        aria-hidden
        className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 hidden md:block"
      >
        <p className="flex items-center gap-2">
          <span className="h-1 w-1 bg-emerald-400 animate-pulse" /> SYS / ONLINE
        </p>
        <p className="mt-1">BUILD · v3.0.0</p>
      </div>
      <div
        aria-hidden
        className="absolute top-6 right-6 md:top-10 md:right-10 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-600 text-right hidden md:block"
      >
        <p>LOCATION · IT</p>
        <p className="mt-1">STATUS · OPEN_FOR_WORK</p>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
            {t.hero.role}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] md:text-[10vw] lg:text-[9rem] font-black tracking-[-0.04em] leading-[0.85]"
        >
          <span className="bg-gradient-to-br from-white via-white to-slate-300 bg-clip-text text-transparent">
            JUSTCRIT
          </span>
          <br />
          <span className="bg-[linear-gradient(120deg,#475569,#94a3b8,#475569)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">
            SPAM
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-slate-950 font-medium text-sm hover:bg-emerald-400 transition-colors"
            >
              {t.hero.cta}
              <ArrowUpRight
                size={16}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-white font-medium text-sm hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          <a
            href="#about"
            className="hidden md:flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span>{t.hero.scrollDown}</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
