'use client'

import { useState } from 'react'
import { Code2, Database, Smartphone, Server, Wrench } from 'lucide-react'

type SkillLevel = 'Basico' | 'Intermediario' | 'Avançado' | 'Expert'

interface Skill {
  name: string
  level: SkillLevel
  color: string
  glow: string
}

interface Category {
  label: string
  icon: React.ReactNode
  accent: string
  border: string
  glow: string
  badgeBg: string
  skills: Skill[]
}

const LEVEL_MAP: Record<SkillLevel, number> = {
  'Basico': 35,
  'Intermediario': 65,
  'Avançado': 85,
  'Expert': 100,
}

const CATEGORIES: Category[] = [
  {
    label: 'Frontend',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    badgeBg: 'bg-cyan-500/15',
    icon: <Code2 size={13} />,
    skills: [
      { name: 'Next.js', level: 'Basico', color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/40' },
      { name: 'React', level: 'Intermediario', color: 'from-blue-400 to-cyan-400', glow: 'shadow-blue-400/40' },
      { name: 'TypeScript', level: 'Avançado', color: 'from-blue-600 to-blue-400', glow: 'shadow-blue-500/40' },
      { name: 'Tailwind CSS', level: 'Avançado', color: 'from-teal-400 to-cyan-500', glow: 'shadow-teal-400/40' },
    ],
  },
  {
    label: 'Mobile',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    badgeBg: 'bg-pink-500/15',
    icon: <Smartphone size={13} />,
    skills: [
      { name: 'Flutter', level: 'Intermediario', color: 'from-pink-500 to-fuchsia-500', glow: 'shadow-pink-500/40' },
      { name: 'Dart', level: 'Intermediario', color: 'from-rose-400 to-pink-500', glow: 'shadow-rose-400/40' },
    ],
  },
  {
    label: 'Backend',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    badgeBg: 'bg-emerald-500/15',
    icon: <Server size={13} />,
    skills: [
      { name: 'Node.js', level: 'Intermediario', color: 'from-green-500 to-emerald-400', glow: 'shadow-green-500/40' },
      { name: 'Python', level: 'Avançado', color: 'from-yellow-400 to-green-400', glow: 'shadow-yellow-400/40' },
      { name: 'Ruby', level: 'Intermediario', color: 'from-red-500 to-rose-400', glow: 'shadow-red-500/40' },
      { name: 'Ruby on Rails', level: 'Intermediario', color: 'from-red-700 to-red-500', glow: 'shadow-red-700/40' },
      { name: 'REST APIs', level: 'Intermediario', color: 'from-emerald-500 to-teal-400', glow: 'shadow-emerald-500/40' },
    ],
  },
  {
    label: 'Data',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    badgeBg: 'bg-violet-500/15',
    icon: <Database size={13} />,
    skills: [
      { name: 'Apache Spark', level: 'Basico', color: 'from-purple-500 to-violet-400', glow: 'shadow-purple-500/40' },
      { name: 'Hadoop', level: 'Basico', color: 'from-violet-500 to-indigo-400', glow: 'shadow-violet-500/40' },
      { name: 'Apache Hive', level: 'Basico', color: 'from-indigo-500 to-violet-500', glow: 'shadow-indigo-500/40' },
      { name: 'ETL', level: 'Avançado', color: 'from-violet-400 to-fuchsia-400', glow: 'shadow-violet-400/40' },
      { name: 'Redis', level: 'Basico', color: 'from-red-600 to-rose-500', glow: 'shadow-red-600/40' },
      { name: 'Oracle SQL', level: 'Intermediario', color: 'from-orange-400 to-amber-400', glow: 'shadow-orange-400/40' },
    ],
  },
  {
    label: 'DevOps',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    badgeBg: 'bg-orange-500/15',
    icon: <Wrench size={13} />,
    skills: [
      { name: 'Docker', level: 'Avançado', color: 'from-sky-500 to-blue-400', glow: 'shadow-sky-500/40' },
      { name: 'Git / GitHub', level: 'Avançado', color: 'from-gray-400 to-slate-300', glow: 'shadow-gray-400/40' },
      { name: 'Prisma ORM', level: 'Intermediario', color: 'from-slate-400 to-gray-300', glow: 'shadow-slate-400/40' },
      { name: 'PostgreSQL', level: 'Avançado', color: 'from-sky-400 to-cyan-400', glow: 'shadow-sky-400/40' },
      { name: 'TDD', level: 'Intermediario', color: 'from-amber-400 to-orange-500', glow: 'shadow-amber-400/40' },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const cat = CATEGORIES[active]

  function selectTab(i: number) {
    if (i === active) return
    setActive(i)
    setAnimKey((k) => k + 1)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden text-white">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-0 shrink-0 border-b border-white/5 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((c, i) => (
          <button
            key={c.label}
            onClick={() => selectTab(i)}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-[11px] font-semibold tracking-wide transition-all duration-200 select-none',
              i === active
                ? `${c.accent} bg-white/10 border-b-2 border-current`
                : 'text-white/40 hover:text-white/70 hover:bg-white/5',
            ].join(' ')}
          >
            <span className={i === active ? c.accent : ''}>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div
        key={animKey}
        className="flex-1 overflow-auto grid grid-cols-2 content-start"
        style={{ padding: '28px 24px 24px', gap: '16px', animation: 'skillsFadeIn 0.25s ease forwards' }}
      >
        {cat.skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`relative rounded-xl border ${cat.border} bg-white/5 hover:bg-white/10 backdrop-blur-md flex flex-col gap-3 shadow-lg ${cat.glow} transition-all duration-200 hover:scale-[1.02] cursor-default`}
            style={{ padding: '18px 20px', animationDelay: `${i * 40}ms`, animation: 'skillsSlideUp 0.3s ease forwards', opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-semibold text-white/90 leading-tight">{skill.name}</span>
              <span className={`flex items-center gap-1.5 shrink-0 text-[11px] font-bold leading-none ${cat.accent}`}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-current" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                </span>
                {skill.level}
              </span>
            </div>

            {/* Bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-md ${skill.glow}`}
                style={{
                  width: `${LEVEL_MAP[skill.level]}%`,
                  animation: `skillsBarFill 0.6s ${i * 80}ms cubic-bezier(0.4,0,0.2,1) forwards`,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes skillsFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes skillsSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes skillsBarFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}
