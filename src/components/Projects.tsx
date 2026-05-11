import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

type Project = {
  title: string
  type: string
  status: 'ready' | 'wip' | 'done'
  desc: { it: string; en: string }
  tags: string[]
  features: { it: string[]; en: string[] }
  links: { github?: string; live?: string }
}

const projects: Project[] = [
  {
    title: 'AuraTournament',
    type: 'Minecraft Plugin',
    status: 'ready',
    desc: {
      it: 'Plugin automatizzato per tornei 1v1 e 2v2 con integrazione WebAPI per la gestione dei bracket in tempo reale.',
      en: 'Automated plugin for 1v1 and 2v2 tournaments with WebAPI integration for real-time bracket management.',
    },
    tags: ['Java', 'WebAPI', 'MySQL', 'High-Performance'],
    features: {
      it: [
        'Bracket dinamici in tempo reale',
        'Integrazione WebAPI dedicata',
        'Sistema di matchmaking automatico',
        'Statistiche e cronologia partite',
      ],
      en: [
        'Real-time dynamic brackets',
        'Dedicated WebAPI integration',
        'Automatic matchmaking system',
        'Match stats and history',
      ],
    },
    links: {},
  },
  {
    title: 'AuraProxy',
    type: 'Network Architecture',
    status: 'wip',
    desc: {
      it: 'Infrastruttura di rete basata su Velocity con sistema di bilanciamento del carico e protezione DDoS custom.',
      en: 'Velocity-based network infrastructure with custom load balancing and DDoS protection.',
    },
    tags: ['Velocity', 'Netty', 'Distributed', 'Proxy'],
    features: {
      it: [
        'Load balancing intelligente',
        'Protezione DDoS layer 7',
        'Routing dinamico tra backend',
        'Metriche e osservabilità',
      ],
      en: [
        'Smart load balancing',
        'Layer 7 DDoS protection',
        'Dynamic backend routing',
        'Metrics and observability',
      ],
    },
    links: {},
  },
  {
    title: 'AuraShield',
    type: 'Security System',
    status: 'done',
    desc: {
      it: 'Sistema di sicurezza avanzato per il filtraggio dei pacchetti NMS e prevenzione exploit a livello kernel.',
      en: 'Advanced security system for NMS packet filtering and kernel-level exploit prevention.',
    },
    tags: ['Kotlin', 'Security', 'Exploit-Prevention', 'NMS'],
    features: {
      it: [
        'Filtraggio pacchetti NMS',
        'Prevenzione exploit noti',
        'Logging avanzato anomalie',
        'Configurazione granulare',
      ],
      en: [
        'NMS packet filtering',
        'Known exploit prevention',
        'Advanced anomaly logging',
        'Granular configuration',
      ],
    },
    links: {},
  },
  {
    title: 'AuraMicro API',
    type: 'Distributed Systems',
    status: 'done',
    desc: {
      it: 'Architettura a microservizi scalabile in Go/gRPC per la gestione sincronizzata di profili, valute e stats cross-platform.',
      en: 'Scalable microservices architecture in Go/gRPC for synchronized profile, currency and stats management cross-platform.',
    },
    tags: ['Go', 'gRPC', 'Microservices', 'PostgreSQL'],
    features: {
      it: [
        'Comunicazione gRPC tra servizi',
        'Sincronizzazione cross-server',
        'PostgreSQL + cache Redis',
        'API REST per dashboard',
      ],
      en: [
        'gRPC inter-service communication',
        'Cross-server synchronization',
        'PostgreSQL + Redis cache',
        'REST API for dashboards',
      ],
    },
    links: {},
  },
  {
    title: 'AuraEngine V3',
    type: 'Core Development',
    status: 'wip',
    desc: {
      it: 'Fork ottimizzato del server Minecraft con rewrite del sistema di ticking e gestione asincrona delle entità per massime performance.',
      en: 'Optimized Minecraft server fork with ticking system rewrite and asynchronous entity handling for maximum performance.',
    },
    tags: ['C++', 'Java', 'Low-Level', 'Optimization'],
    features: {
      it: [
        'Ticking system asincrono',
        'Gestione entità ottimizzata',
        'Riduzione drastica del lag',
        'Compatibilità plugin Spigot',
      ],
      en: [
        'Asynchronous ticking system',
        'Optimized entity handling',
        'Drastic lag reduction',
        'Spigot plugin compatibility',
      ],
    },
    links: {},
  },
  {
    title: 'AuraBot',
    type: 'Discord Integration',
    status: 'ready',
    desc: {
      it: 'Bot Discord ufficiale del network con sistema di verifica, ticketing, statistiche live dei server e collegamento bidirezionale con la WebAPI di gioco.',
      en: "Official Discord bot for the network featuring user verification, ticketing, live server stats and two-way integration with the in-game WebAPI.",
    },
    tags: ['TypeScript', 'Discord.js', 'Node.js', 'Prisma'],
    features: {
      it: [
        'Sistema di verifica utenti',
        'Ticketing avanzato con categorie',
        'Statistiche live cross-server',
        'Integrazione WebAPI bidirezionale',
      ],
      en: [
        'User verification system',
        'Advanced ticketing with categories',
        'Live cross-server stats',
        'Two-way WebAPI integration',
      ],
    },
    links: {},
  },
]

const statusColor: Record<Project['status'], string> = {
  ready: 'text-emerald-400',
  wip: 'text-amber-400',
  done: 'text-slate-400',
}

const statusLabel: Record<Project['status'], { it: string; en: string }> = {
  ready: { it: 'Pronto', en: 'Ready' },
  wip: { it: 'In sviluppo', en: 'In progress' },
  done: { it: 'Completato', en: 'Completed' },
}

export const Projects = () => {
  const { t, lang } = useI18n()

  return (
    <section id="projects" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-6"
          >
            {t.projects.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6"
          >
            {t.projects.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl font-light"
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06 }}
              className="group relative flex flex-col p-8 md:p-10 bg-white/[0.02] border border-white/10 rounded-3xl hover:border-white/25 hover:bg-white/[0.04] transition-all duration-500"
            >
              <header className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-3">
                    {project.type}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={`shrink-0 text-[10px] uppercase tracking-[0.2em] font-bold ${statusColor[project.status]}`}
                >
                  {statusLabel[project.status][lang]}
                </span>
              </header>

              <p className="text-slate-400 font-light leading-relaxed mb-6">
                {project.desc[lang]}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
                  {t.projects.keyFeatures}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                  {project.features[lang].map((f, k) => (
                    <li
                      key={k}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                      <span className="font-light">{f}</span>
                    </li>
                  ))}
                </ul>

                {(project.links.github || project.links.live) && (
                  <div className="flex items-center gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-slate-300 text-xs hover:border-white/40 hover:text-white transition-all"
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-medium hover:bg-emerald-400 transition-colors"
                      >
                        Live <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold mb-3">
            {t.projects.moreSoon}
          </p>
          <p className="text-slate-500 font-light max-w-xl mx-auto">
            {t.projects.moreSoonBody}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
