import { motion } from 'framer-motion'

type Props = {
  label?: string
}

export const SectionOrnament = ({ label }: Props) => {
  return (
    <div className="relative flex items-center justify-center py-10 md:py-14 px-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4 md:gap-6"
      >
        <svg
          width="32"
          height="14"
          viewBox="0 0 32 14"
          fill="none"
          className="text-emerald-400/60"
          aria-hidden
        >
          <path
            d="M30 1 H10 L4 7 L10 13 H30"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative flex items-center justify-center">
          <span className="absolute inset-0 m-auto h-3 w-3 rotate-45 border border-emerald-400/70" />
          <span className="absolute inset-0 m-auto h-3 w-3 rotate-45 border border-emerald-400/30 animate-ping" />
          <span className="relative h-1.5 w-1.5 rotate-45 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
        </div>

        {label && (
          <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold hidden md:inline">
            {label}
          </span>
        )}

        <span className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-white/30 to-transparent" />

        <svg
          width="32"
          height="14"
          viewBox="0 0 32 14"
          fill="none"
          className="text-emerald-400/60"
          aria-hidden
        >
          <path
            d="M2 1 H22 L28 7 L22 13 H2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
