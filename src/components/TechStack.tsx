import { useI18n } from '../i18n/I18nContext'

const techs = [
  'Java',
  'Kotlin',
  'Spigot / Paper',
  'Velocity',
  'NMS',
  'Go',
  'gRPC',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'MongoDB',
  'Docker',
  'Linux',
  'Git',
  'CI/CD',
]

export const TechStack = () => {
  const { t } = useI18n()
  const doubled = [...techs, ...techs]

  return (
    <section className="relative py-20 md:py-24 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">
          {t.tech.kicker}
        </p>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"
        />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-12 md:gap-16 pr-12 md:pr-16">
            {doubled.map((tech, i) => (
              <span
                key={`a-${i}`}
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/15 hover:text-white/60 transition-colors whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="flex shrink-0 animate-marquee gap-12 md:gap-16 pr-12 md:pr-16"
          >
            {doubled.map((tech, i) => (
              <span
                key={`b-${i}`}
                className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/15 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
