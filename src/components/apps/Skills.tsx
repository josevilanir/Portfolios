'use client'

import { useState } from 'react'
import { Code2, Database, Smartphone, Server, Wrench } from 'lucide-react'

interface Skill {
  name: string
  level: number
  color: string
  glow: string
}

interface Category {
  label: string
  icon: React.ReactNode
  accent: string
  border: string
  glow: string
  skills: Skill[]
}

const CATEGORIES: Category[] = [
  {
    label: 'Frontend',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    icon: <Code2 size={13} />,
    skills: [
      { name: 'Next.js', level: 90, color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/40' },
      { name: 'React', level: 92, color: 'from-blue-400 to-cyan-400', glow: 'shadow-blue-400/40' },
      { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-400', glow: 'shadow-blue-500/40' },
      { name: 'Tailwind CSS', level: 95, color: 'from-teal-400 to-cyan-500', glow: 'shadow-teal-400/40' },
    ],
  },
  {
    label: 'Mobile',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'shadow-pink-500/20',
    icon: <Smartphone size={13} />,
    skills: [
      { name: 'Flutter', level: 82, color: 'from-pink-500 to-fuchsia-500', glow: 'shadow-pink-500/40' },
      { name: 'Dart', level: 80, color: 'from-rose-400 to-pink-500', glow: 'shadow-rose-400/40' },
    ],
  },
  {
    label: 'Backend',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    icon: <Server size={13} />,
    skills: [
      { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-400', glow: 'shadow-green-500/40' },
      { name: 'Python', level: 90, color: 'from-yellow-400 to-green-400', glow: 'shadow-yellow-400/40' },
      { name: 'REST APIs', level: 88, color: 'from-emerald-500 to-teal-400', glow: 'shadow-emerald-500/40' },
    ],
  },
  {
    label: 'Data',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/20',
    icon: <Database size={13} />,
    skills: [
      { name: 'Apache Spark', level: 85, color: 'from-purple-500 to-violet-400', glow: 'shadow-purple-500/40' },
      { name: 'Hadoop', level: 80, color: 'from-violet-500 to-indigo-400', glow: 'shadow-violet-500/40' },
      { name: 'Apache Hive', level: 78, color: 'from-indigo-500 to-violet-500', glow: 'shadow-indigo-500/40' },
      { name: 'Oracle SQL', level: 85, color: 'from-orange-400 to-amber-400', glow: 'shadow-orange-400/40' },
    ],
  },
  {
    label: 'DevOps',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'shadow-orange-500/20',
    icon: <Wrench size={13} />,
    skills: [
      { name: 'Docker', level: 75, color: 'from-sky-500 to-blue-400', glow: 'shadow-sky-500/40' },
      { name: 'Git / GitHub', level: 92, color: 'from-gray-400 to-slate-300', glow: 'shadow-gray-400/40' },
      { name: 'Prisma ORM', level: 82, color: 'from-slate-400 to-gray-300', glow: 'shadow-slate-400/40' },
      { name: 'PostgreSQL', level: 80, color: 'from-sky-400 to-cyan-400', glow: 'shadow-sky-400/40' },
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
      <div className="flex items-center justify-center gap-1 px-4 pt-3 pb-0 shrink-0 border-b border-white/5">
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
        className="flex-1 overflow-auto p-4 grid grid-cols-2 gap-3 content-start"
        style={{ animation: 'skillsFadeIn 0.25s ease forwards' }}
      >
        {cat.skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`relative rounded-xl border ${cat.border} bg-white/5 backdrop-blur-md p-4 flex flex-col gap-3 shadow-lg ${cat.glow}`}
            style={{ animationDelay: `${i * 40}ms`, animation: 'skillsSlideUp 0.3s ease forwards', opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-end justify-between">
              <span className="text-[13px] font-semibold text-white/90 leading-tight">{skill.name}</span>
              <span className={`text-xl font-bold tabular-nums leading-none ${cat.accent}`}>
                {skill.level}
                <span className="text-[10px] font-normal text-white/40 ml-0.5">%</span>
              </span>
            </div>

            {/* Bar */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-md ${skill.glow}`}
                style={{
                  width: `${skill.level}%`,
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
