import { motion } from 'framer-motion'
import { useI18n } from '../i18n/I18nContext'
import { SkinShowcase } from './SkinShowcase'

export const About = () => {
  const { t } = useI18n()

  return (
    <section id="about" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-8"
        >
          {t.about.kicker}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]"
            >
              {t.about.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.15 }}
            >
              <SkinShowcase />
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-slate-400 text-lg leading-relaxed font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.1 }}
            >
              {t.about.p1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2 }}
            >
              {t.about.p2}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3 }}
              className="pt-10 border-t border-white/10 mt-10"
            >
              <h3 className="text-white text-2xl font-semibold mb-4">
                {t.about.experienceTitle}
              </h3>
              <p>{t.about.experienceBody}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
