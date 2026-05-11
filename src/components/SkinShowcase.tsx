import { motion } from 'framer-motion'

export const SkinShowcase = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10 w-full max-w-[260px]"
    >
      <motion.img
        src="https://mc-heads.net/body/JustCritSpam/right"
        alt="JustCritSpam Minecraft Skin"
        loading="lazy"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        className="w-full h-auto select-none pointer-events-none"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.45)) drop-shadow(0 0 24px rgba(52,211,153,0.15))',
        }}
        draggable={false}
      />
    </motion.div>
  )
}
