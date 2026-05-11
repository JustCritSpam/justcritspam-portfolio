import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { TechBadgeRow } from './TechBadge'

export const Experience = () => {
  const { t } = useI18n()

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-6"
          >
            {t.experience.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6"
          >
            {t.experience.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base md:text-lg font-light"
          >
            {t.experience.subtitle}
          </motion.p>
        </div>

        <div className="relative pl-6 md:pl-12">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-1.5 md:left-3 w-px bg-gradient-to-b from-emerald-400/0 via-white/15 to-white/0"
          />

          <div className="space-y-20 md:space-y-28">
            {t.experience.items.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                <span
                  aria-hidden
                  className="absolute -left-[26px] md:-left-[44px] top-3 flex items-center justify-center"
                >
                  <span className="absolute h-5 w-5 rounded-full bg-emerald-400/15 animate-ping" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-emerald-400 bg-slate-950 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                </span>

                <div className="lg:col-span-4 xl:col-span-4">
                  <p className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter text-slate-500/80 leading-none">
                    {item.date}
                  </p>
                  <h3 className="mt-4 text-xl md:text-2xl font-bold text-white tracking-tight">
                    {item.company}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{item.role}</p>
                </div>

                <div className="lg:col-span-8 xl:col-span-8">
                  <TechBadgeRow ids={item.tech} size={34} />

                  <p className="mt-6 text-slate-400 text-base md:text-[17px] font-light leading-relaxed">
                    {item.desc}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {item.tags.map((tag, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: 0.05 + j * 0.04 }}
                        className="flex items-start gap-3 text-slate-300 text-sm md:text-[15px]"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 mt-[2px] text-emerald-400"
                          strokeWidth={2}
                        />
                        <span className="font-light">{tag}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
