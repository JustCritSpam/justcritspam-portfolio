import { motion } from 'framer-motion'
import { Globe, Database, Cpu, Code2, Cloud, Github, Terminal, Layers } from 'lucide-react'

export const TechStack = () => {
  const techs = [
    { name: 'React', icon: <Globe /> },
    { name: 'Node.js', icon: <Layers /> },
    { name: 'Docker', icon: <Cloud /> },
    { name: 'Java', icon: <Code2 /> },
    { name: 'Minecraft API', icon: <Cpu /> },
    { name: 'PostgreSQL', icon: <Database /> },
    { name: 'Git', icon: <Github /> },
    { name: 'Terminal', icon: <Terminal /> },
  ]

  return (
    <div className="py-20 bg-slate-950/50 border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {techs.concat(techs).concat(techs).map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 text-4xl md:text-5xl font-black text-white/10 hover:text-emerald-500/40 transition-all cursor-default select-none uppercase tracking-tighter group"
            >
              <span className="group-hover:scale-125 transition-transform duration-500">
                {tech.icon}
              </span>
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
