'use client'

import { useState } from 'react'
import { Code2, Database, Smartphone, Server, Wrench } from 'lucide-react'

interface Skill {
  name: string
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

const CATEGORIES: Category[] = [
  {
    label: 'Frontend',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    badgeBg: 'bg-cyan-500/15',
    icon: <Code2 size={13} />,
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
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
      { name: 'Flutter' },
      { name: 'Dart' },
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
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'Ruby' },
      { name: 'Ruby on Rails' },
      { name: 'REST APIs' },
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
      { name: 'Apache Spark' },
      { name: 'Hadoop' },
      { name: 'Apache Hive' },
      { name: 'ETL' },
      { name: 'Redis' },
      { name: 'Oracle SQL' },
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
      { name: 'Docker' },
      { name: 'Git / GitHub' },
      { name: 'Prisma ORM' },
      { name: 'PostgreSQL' },
      { name: 'TDD' },
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
        className="flex-1 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-start"
        style={{ padding: '28px 24px', gap: '16px', animation: 'skillsFadeIn 0.25s ease forwards' }}
      >
        {cat.skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`relative rounded-xl border ${cat.border} bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center gap-4 shadow-lg ${cat.glow} transition-all duration-200 hover:scale-[1.02] cursor-default`}
            style={{ padding: '20px 24px', animationDelay: `${i * 30}ms`, animation: 'skillsSlideUp 0.3s ease forwards', opacity: 0 }}
          >
            <div className={`h-2 w-2 rounded-full bg-current ${cat.accent} shadow-[0_0_8px_currentColor]`} />
            <span className="text-[14px] font-semibold text-white/90 leading-tight tracking-wide">{skill.name}</span>
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
      `}</style>
    </div>
  )
}
