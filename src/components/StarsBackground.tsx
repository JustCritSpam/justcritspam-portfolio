import { useMemo } from 'react'

type Props = {
  shootingCount?: number
  starCount?: number
}

export const StarsBackground = ({
  shootingCount = 6,
  starCount = 60,
}: Props) => {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.4,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.6,
      })),
    [starCount]
  )

  const shooting = useMemo(
    () =>
      Array.from({ length: shootingCount }, (_, i) => ({
        id: i,
        top: Math.random() * 60,
        delay: i * 2.4 + Math.random() * 2,
        duration: 2.4 + Math.random() * 2.2,
        length: 80 + Math.random() * 140,
      })),
    [shootingCount]
  )

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]"
    >
      {stars.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {shooting.map((s) => (
        <span
          key={`sh-${s.id}`}
          className="absolute left-[-15%] h-px animate-shooting will-change-transform"
          style={{
            top: `${s.top}%`,
            width: `${s.length}px`,
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), rgba(52,211,153,0.6), transparent)',
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            filter: 'drop-shadow(0 0 6px rgba(52,211,153,0.6))',
          }}
        />
      ))}
    </div>
  )
}
