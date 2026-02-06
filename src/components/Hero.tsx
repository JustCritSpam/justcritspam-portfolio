import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Float, Stars, Environment } from '@react-three/drei'
import { MinecraftPlayer } from './MinecraftPlayer'
import { ShootingStars } from './ShootingStars'
import { Terminal } from './Terminal'

export const Hero = () => {
  const handleInitialize = () => {
    window.dispatchEvent(new CustomEvent('terminal-init'))
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 overflow-hidden py-20">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#10b981" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={3} />
          <Environment preset="night" />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ShootingStars />
          
          <MinecraftPlayer />
        </Canvas>
      </div>

      {/* HUD Decorative Elements */}
      <div className="absolute top-10 left-10 hidden lg:block font-mono text-[10px] text-emerald-500/40 uppercase tracking-[0.2em] space-y-2 pointer-events-none">
        <p>System: Online</p>
        <p>Host: localhost:5173</p>
        <p>Build: v2.0.4-beta</p>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block font-mono text-[10px] text-cyan-500/40 uppercase tracking-[0.2em] text-right pointer-events-none">
        <p>Lat: 45.4642 N</p>
        <p>Long: 9.1900 E</p>
        <p>Memory: 1024MB allocated</p>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pointer-events-none">
        <div className="text-left pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6"
          >
            Developer Interface v2.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none text-white"
          >
            JUST<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CRIT</span>SPAM
          </motion.h1>
          
          <Terminal />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-6 mt-12"
          >
            <button 
              onClick={handleInitialize}
              className="group relative px-10 py-4 bg-emerald-500 text-slate-900 rounded-full font-bold transition-all overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            >
              <span className="relative z-10 uppercase">Initialize_Sequence</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <a 
              href="https://github.com/justcritspam"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              VIEW_SOURCE
            </a>
          </motion.div>
        </div>
        
        <div className="hidden lg:block h-[600px]" />
      </div>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
    </section>
  )
}
