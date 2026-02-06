import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Playlist Lo-Fi su YouTube
  const videoId = "jfKfPfyJRdk" // Lofi Girl - lofi hip hop radio

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Forza l'interazione per l'audio se il browser lo blocca
  useEffect(() => {
    const startAudio = () => {
      if (!isPlaying) setIsPlaying(true)
      window.removeEventListener('click', startAudio)
    }
    window.addEventListener('click', startAudio)
    return () => window.removeEventListener('click', startAudio)
  }, [isPlaying])

  return (
    <div className="fixed bottom-10 left-10 z-[100]">
      {/* YouTube Iframe (nascosto) con Autoplay */}
      <div className="hidden">
        <iframe
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? '1' : '0'}&loop=1&playlist=${videoId}&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      
      <motion.div className="flex flex-col gap-2">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-2xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl group transition-all hover:border-emerald-500/30"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="flex items-end gap-[2px] h-4"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 16, 8, 14, 4] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8, 
                        delay: i * 0.1,
                        ease: "easeInOut" 
                      }}
                      className="w-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="paused"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <VolumeX size={18} className="text-slate-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-start pr-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-black leading-none mb-1">
              Chill Songs
            </span>
            <span className="text-[11px] text-slate-300 font-mono flex items-center gap-2">
              {isPlaying ? "Playing_Now" : "Radio_Offline"}
              <Music size={10} className={isPlaying ? "animate-spin-slow" : "opacity-30"} />
            </span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  )
}
