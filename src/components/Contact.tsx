import { motion } from 'framer-motion'
import { Send, Zap, ShieldCheck, Rocket } from 'lucide-react'

export const Contact = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-slate-800/20 to-emerald-500/5 rounded-[3rem] border border-emerald-500/10 p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Send size={200} className="-rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Sviluppo <br />
            <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Custom Plugin.</span>
          </motion.h2>
          
          <p className="text-slate-400 text-xl font-light mb-12 leading-relaxed">
            Dalla progettazione di core complessi alla realizzazione di meccaniche di gioco uniche. Se il tuo server ha bisogno di un salto di qualità tecnico, sei nel posto giusto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: <Zap />, text: "Performance Ottimizzata" },
              { icon: <ShieldCheck />, text: "Architettura Solida" },
              { icon: <Rocket />, text: "Supporto Post-Vendita" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-slate-300 font-medium group cursor-default"
              >
                <div className="text-emerald-500 group-hover:scale-125 transition-transform">{item.icon}</div>
                {item.text}
              </motion.div>
            ))}
          </div>

          <motion.a
            href="https://t.me/JustCritSpam"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-emerald-500 text-slate-900 rounded-full font-black text-xl shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.4)] transition-all"
          >
            CONTATTAMI @JUSTCRITSPAM
            <Send size={24} />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
