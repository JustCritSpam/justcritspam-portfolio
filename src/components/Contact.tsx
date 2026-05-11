import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export const Contact = () => {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/[0.02] p-10 md:p-20">
          <div
            aria-hidden
            className="absolute -top-1/3 -right-1/4 w-[60%] h-[120%] bg-emerald-500/[0.06] blur-3xl rounded-full"
          />

          <div className="relative z-10 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold mb-6"
            >
              {t.contact.kicker}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-8"
            >
              {t.contact.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-10"
            >
              {t.contact.body}
            </motion.p>

            <motion.a
              href="https://t.me/JustCritSpam"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-slate-950 font-medium text-sm hover:bg-emerald-400 transition-colors"
            >
              {t.contact.cta}
              <ArrowUpRight
                size={16}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
