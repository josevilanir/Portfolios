'use client'

import { Code2, Database, Smartphone, Server, Wrench } from 'lucide-react'

interface Skill {
  name: string
  level: number
  color: string
}

interface Category {
  label: string
  icon: React.ReactNode
  color: string
  skills: Skill[]
}

const CATEGORIES: Category[] = [
  {
    label: 'Frontend',
    icon: <Code2 size={14} />,
    color: 'text-blue-400',
    skills: [
      { name: 'Next.js', level: 90, color: 'bg-blue-500' },
      { name: 'React', level: 92, color: 'bg-cyan-500' },
      { name: 'TypeScript', level: 88, color: 'bg-blue-600' },
      { name: 'Tailwind CSS', level: 95, color: 'bg-teal-500' },
    ],
  },
  {
    label: 'Mobile',
    icon: <Smartphone size={14} />,
    color: 'text-pink-400',
    skills: [
      { name: 'Flutter', level: 82, color: 'bg-pink-500' },
      { name: 'Dart', level: 80, color: 'bg-rose-500' },
    ],
  },
  {
    label: 'Backend',
    icon: <Server size={14} />,
    color: 'text-green-400',
    skills: [
      { name: 'Node.js', level: 85, color: 'bg-green-500' },
      { name: 'Python', level: 90, color: 'bg-yellow-500' },
      { name: 'REST APIs', level: 88, color: 'bg-emerald-500' },
    ],
  },
  {
    label: 'Data Engineering',
    icon: <Database size={14} />,
    color: 'text-purple-400',
    skills: [
      { name: 'Apache Spark', level: 85, color: 'bg-purple-500' },
      { name: 'Hadoop', level: 80, color: 'bg-violet-500' },
      { name: 'Apache Hive', level: 78, color: 'bg-indigo-500' },
      { name: 'Oracle SQL', level: 85, color: 'bg-orange-500' },
    ],
  },
  {
    label: 'DevOps & Ferramentas',
    icon: <Wrench size={14} />,
    color: 'text-orange-400',
    skills: [
      { name: 'Docker', level: 75, color: 'bg-blue-500' },
      { name: 'Git / GitHub', level: 92, color: 'bg-gray-500' },
      { name: 'Prisma ORM', level: 82, color: 'bg-slate-500' },
      { name: 'PostgreSQL', level: 80, color: 'bg-sky-500' },
    ],
  },
]

export default function Skills() {
  return (
    <div className="h-full overflow-auto text-white p-5 flex flex-col gap-5">
      {CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <div className={`flex items-center gap-2 mb-3 ${cat.color}`}>
            {cat.icon}
            <span className="text-xs font-semibold uppercase tracking-wider">{cat.label}</span>
          </div>

          <div className="flex flex-col gap-2">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-xs text-white/80 w-28 shrink-0">{skill.name}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${skill.color} opacity-80 transition-all duration-700`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/40 w-8 text-right shrink-0">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
