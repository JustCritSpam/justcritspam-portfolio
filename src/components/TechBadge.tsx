import type { ComponentType } from 'react'
import {
  SiOpenjdk,
  SiKotlin,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiNextdotjs,
  SiGo,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiLinux,
  SiDiscord,
  SiPrisma,
  SiTailwindcss,
  SiVuedotjs,
  SiHtml5,
  SiCss,
  SiCplusplus,
  SiFigma,
  SiInstagram,
  SiGooglesearchconsole,
} from 'react-icons/si'
import { TbBrandMinecraft, TbServer2, TbBolt, TbNetwork } from 'react-icons/tb'

type IconProps = { size?: number; color?: string; className?: string }
type IconComp = ComponentType<IconProps>

type TechStyle = {
  bg: string
  fg: string
  name: string
  Icon: IconComp
}

export const TECH_MAP: Record<string, TechStyle> = {
  java: { bg: '#ED8B00', fg: '#ffffff', name: 'Java', Icon: SiOpenjdk },
  kotlin: { bg: '#7F52FF', fg: '#ffffff', name: 'Kotlin', Icon: SiKotlin },
  react: { bg: '#20232A', fg: '#61DAFB', name: 'React', Icon: SiReact },
  typescript: { bg: '#3178C6', fg: '#ffffff', name: 'TypeScript', Icon: SiTypescript },
  javascript: { bg: '#F7DF1E', fg: '#1a1a1a', name: 'JavaScript', Icon: SiJavascript },
  node: { bg: '#339933', fg: '#ffffff', name: 'Node.js', Icon: SiNodedotjs },
  nextjs: { bg: '#0a0a0a', fg: '#ffffff', name: 'Next.js', Icon: SiNextdotjs },
  spigot: { bg: '#F5A623', fg: '#1a1a1a', name: 'Spigot', Icon: TbBrandMinecraft },
  paper: { bg: '#DC2626', fg: '#ffffff', name: 'Paper', Icon: TbBrandMinecraft },
  velocity: { bg: '#6366f1', fg: '#ffffff', name: 'Velocity', Icon: TbBolt },
  go: { bg: '#00ADD8', fg: '#ffffff', name: 'Go', Icon: SiGo },
  grpc: { bg: '#244c5a', fg: '#ffffff', name: 'gRPC', Icon: TbNetwork },
  postgres: { bg: '#336791', fg: '#ffffff', name: 'PostgreSQL', Icon: SiPostgresql },
  redis: { bg: '#DC382D', fg: '#ffffff', name: 'Redis', Icon: SiRedis },
  mongo: { bg: '#47A248', fg: '#ffffff', name: 'MongoDB', Icon: SiMongodb },
  mysql: { bg: '#4479A1', fg: '#ffffff', name: 'MySQL', Icon: SiMysql },
  docker: { bg: '#2496ED', fg: '#ffffff', name: 'Docker', Icon: SiDocker },
  git: { bg: '#F05032', fg: '#ffffff', name: 'Git', Icon: SiGit },
  linux: { bg: '#1f2937', fg: '#fbbf24', name: 'Linux', Icon: SiLinux },
  discord: { bg: '#5865F2', fg: '#ffffff', name: 'Discord.js', Icon: SiDiscord },
  prisma: { bg: '#0a0a0a', fg: '#ffffff', name: 'Prisma', Icon: SiPrisma },
  tailwind: { bg: '#06B6D4', fg: '#ffffff', name: 'Tailwind', Icon: SiTailwindcss },
  vue: { bg: '#42b883', fg: '#ffffff', name: 'Vue', Icon: SiVuedotjs },
  html: { bg: '#E34F26', fg: '#ffffff', name: 'HTML', Icon: SiHtml5 },
  css: { bg: '#1572B6', fg: '#ffffff', name: 'CSS', Icon: SiCss },
  cpp: { bg: '#00599C', fg: '#ffffff', name: 'C++', Icon: SiCplusplus },
  figma: { bg: '#F24E1E', fg: '#ffffff', name: 'Figma', Icon: SiFigma },
  seo: { bg: '#10b981', fg: '#ffffff', name: 'SEO', Icon: SiGooglesearchconsole },
  social: { bg: '#E1306C', fg: '#ffffff', name: 'Social Media', Icon: SiInstagram },
  server: { bg: '#475569', fg: '#ffffff', name: 'Server', Icon: TbServer2 },
}

type Props = {
  id: string
  size?: number
}

export const TechBadge = ({ id, size = 38 }: Props) => {
  const style = TECH_MAP[id]
  if (!style) return null
  const { Icon } = style

  return (
    <span
      title={style.name}
      style={{
        width: size,
        height: size,
        background: style.bg,
      }}
      className="group relative inline-flex items-center justify-center rounded-full ring-[3px] ring-slate-950 shadow-lg shadow-black/40 hover:scale-110 hover:z-10 transition-transform duration-200"
    >
      <Icon size={size * 0.5} color={style.fg} />
      <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-slate-900 border border-white/10 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
        {style.name}
      </span>
    </span>
  )
}

export const TechBadgeRow = ({
  ids,
  size = 38,
}: {
  ids: string[]
  size?: number
}) => {
  return (
    <div className="flex flex-wrap items-center gap-y-3 -space-x-2">
      {ids.map((id) => (
        <TechBadge key={id} id={id} size={size} />
      ))}
    </div>
  )
}
