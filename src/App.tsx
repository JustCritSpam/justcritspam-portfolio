import { Hero } from './components/Hero'
import { TechStack } from './components/TechStack'
import { Contact } from './components/Contact'
import { AudioPlayer } from './components/AudioPlayer'
import { HackerGame } from './components/HackerGame'
import { Header } from './components/Header'
import { Dossier } from './components/Dossier'
import { motion } from 'framer-motion'
import { Code2, Globe, Database, Cpu, ExternalLink, Github } from 'lucide-react'

function App() {
  const projects = [
    {
      title: 'AuraTournament',
      desc: 'Plugin automatizzato per tornei 1v1 e 2v2 con integrazione WebAPI per la gestione dei bracket in tempo reale.',
      tags: ['Java', 'WebAPI', 'MySQL', 'High-Performance'],
      links: { github: '#', live: '#' },
      type: 'Minecraft Plugin',
      status: 'Pronto'
    },
    {
      title: 'AuraProxy',
      desc: 'Infrastruttura di rete basata su Velocity con sistema di bilanciamento del carico e protezione DDoS custom.',
      tags: ['Velocity', 'Netty', 'Distributed', 'Proxy'],
      links: { github: '#', live: '#' },
      type: 'Network Architecture',
      status: 'In Sviluppo'
    },
    {
      title: 'AuraShield',
      desc: 'Sistema di sicurezza avanzato per il filtraggio dei pacchetti NMS e prevenzione exploit a livello kernel.',
      tags: ['Kotlin', 'Security', 'Exploit-Prevention', 'NMS'],
      links: { github: '#', live: '#' },
      type: 'Security System',
      status: 'Completato'
    },
    {
      title: 'Neural Terminal UI',
      desc: 'Interfaccia portfolio ispirata ai terminali hacker con simulazione di sistema e mini-giochi interattivi.',
      tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      links: { github: '#', live: '#' },
      type: 'Web Frontend',
      status: 'Completato'
    },
    {
      title: 'AuraMicro API',
      desc: 'Architettura a microservizi scalabile in Go/gRPC per la gestione sincronizzata di profili, valute e stats cross-platform.',
      tags: ['Go', 'gRPC', 'Microservices', 'PostgreSQL'],
      links: { github: '#', live: '#' },
      type: 'Distributed Systems',
      status: 'Completato'
    },
    {
      title: 'AuraEngine V3',
      desc: 'Fork ottimizzato del server Minecraft con rewrite del sistema di ticking e gestione asincrona delle entità per massime performance.',
      tags: ['C++', 'Java', 'Low-Level', 'Optimization'],
      links: { github: '#', live: '#' },
      type: 'Core Development',
      status: 'In Sviluppo'
    }
  ]
  const skills = [
    { 
      name: 'Frontend', 
      icon: <Globe className="w-6 h-6" />, 
      desc: 'Creazione di interfacce moderne, reattive e ad alte prestazioni.',
      tags: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Framer Motion'],
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      name: 'Backend', 
      icon: <Database className="w-6 h-6" />, 
      desc: 'Architetture solide, scalabili e gestione efficiente dei dati.',
      tags: ['Node.js', 'PostgreSQL', 'Redis', 'Express', 'Prisma'],
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    { 
      name: 'Minecraft', 
      icon: <Cpu className="w-6 h-6" />, 
      desc: 'Sviluppo di sistemi complessi per network e server.',
      tags: ['Spigot/Paper', 'Velocity', 'NMS', 'Java', 'Kotlin'],
      color: 'from-orange-500/20 to-red-500/20'
    },
    { 
      name: 'Tooling', 
      icon: <Code2 className="w-6 h-6" />, 
      desc: 'Automazione e gestione del ciclo di vita del software.',
      tags: ['Docker', 'Git', 'Linux', 'GitHub Actions', 'CI/CD'],
      color: 'from-purple-500/20 to-pink-500/20'
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow delay-1000" />
      </div>

      <Hero />
      
      <TechStack />

      <Dossier />

      {/* Sviluppo Plugin Section */}
      <section id="plugins" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">Plugin Development</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">Sviluppo <br/>Custom Plugin.</h3>
            <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
              <p>
                Il mio viaggio nell'universo del codice ha avuto un inizio iconico tra i blocchi di <span className="text-white font-medium">Minecraft</span>. Quella che era nata come pura curiosità si è evoluta in una profonda dedizione per lo sviluppo di plugin ad alte prestazioni.
              </p>
              <p>
                Specializzato in <span className="text-emerald-400 font-medium">Spigot, Paper e Velocity</span>, realizzo soluzioni custom che spaziano da core di gioco complessi a sistemi di gestione database ultra-efficienti.
              </p>
              <p>
                Con oltre <span className="text-white font-medium">6 anni</span> di esperienza pratica, coniugo rigore teorico e soluzioni innovative per superare i limiti tecnici e creare esperienze di gioco impeccabili.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/3 grid grid-cols-1 gap-4">
            {[
              { label: 'Specializzazione', value: 'Spigot/Paper API & NMS' },
              { label: 'Esperienza', value: '6+ Anni Java & Kotlin' },
              { label: 'Performance', value: 'Ottimizzazione Lag-Free' },
              { label: 'Database', value: 'Redis, PostgreSQL, MongoDB' },
              { label: 'Disponibilità', value: 'Custom Work & Consulting' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AuraMC Work Section - MOVED HERE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden p-8 md:p-10 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group hover:bg-emerald-500/10 transition-all duration-500 mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/30 transition-all" />
            <img 
              src="/logo-1.webp" 
              alt="AuraMC Logo" 
              className="relative w-24 h-24 md:w-32 md:h-32 object-contain rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="relative text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Currently Active
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Developer @ <span className="text-emerald-500">AuraMC Network</span>
            </h3>
            <p className="text-slate-400 text-lg font-light max-w-xl leading-relaxed">
              Attualmente contribuisco allo sviluppo e all'innovazione tecnica di uno dei network più dinamici in Italia, focalizzandomi su performance e scalabilità.
            </p>
          </div>
        </motion.div>

        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-white">Esperienza & Skill.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`group p-8 bg-gradient-to-br ${skill.color} rounded-[2rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity group-hover:scale-110 duration-700">
                {skill.icon}
              </div>
              
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-500 text-emerald-500">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-emerald-400 transition-colors">{skill.name}</h3>
                  <p className="text-slate-400 leading-relaxed font-light mb-6">{skill.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skill.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 uppercase tracking-wider group-hover:border-emerald-500/20 group-hover:text-emerald-400 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Progetti in <br/>Esecuzione.</h3>
          </div>
          <p className="text-slate-400 text-lg font-light max-w-md md:text-right leading-relaxed">
            Una selezione di sistemi complessi e interfacce moderne sviluppate con focus sulla precisione tecnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={80} />
              </div>
              
              <div className="mb-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                  {project.type}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-tighter ${project.status === 'In Sviluppo' ? 'text-yellow-500' : 'text-emerald-500/50'}`}>
                  {project.status}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h4>
              
              <p className="text-slate-400 font-light mb-8 flex-1 leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-white/5">
                <a 
                  href={project.links.github} 
                  className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  title="GitHub Source"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={project.links.live} 
                  className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                  title="Live Demo"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />

      {/* Game Introduction */}
      <section className="pt-24 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold">Challenge_Entry</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Mettiti alla prova.</h3>
          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Il sistema ha rilevato un'anomalia. Hai <span className="text-emerald-500 font-bold">30 secondi</span> per decriptare la sequenza di accesso al kernel prima che il firewall chiuda la connessione. Trova i nodi corretti: se sbagli, il sistema resetterà l'iniezione!
          </p>
        </motion.div>
      </section>

      <HackerGame />
      
      <AudioPlayer />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 text-center text-slate-600">
        <p>© {new Date().getFullYear()} JustCritSpam. All rights reserved.</p>
      </footer>
    </main>
  )
}


export default App
