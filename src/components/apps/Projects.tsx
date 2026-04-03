'use client'

import { useState } from 'react'
import { FolderOpen, GitBranch, ExternalLink, Smartphone, Globe, Code2 } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  type: 'mobile' | 'web' | 'fullstack'
  color: string
}

const PROJECTS: Project[] = [
  {
    id: 'gym-tracker',
    name: 'Gym Tracker',
    description: 'App mobile para rastreamento de treinos, séries e evolução física com interface fluida e offline-first.',
    stack: ['Flutter', 'Dart', 'SQLite'],
    type: 'mobile',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'mural-oracao',
    name: 'Mural de Oração',
    description: 'Plataforma web para comunidades compartilharem pedidos de oração, com autenticação, feed em tempo real e moderação.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    type: 'fullstack',
    color: 'from-violet-500 to-purple-700',
  },
  {
    id: 'codeminer42',
    name: 'Imersão CodeMiner42',
    description: 'Projeto desenvolvido durante imersão intensiva com desafios de Front-end e Back-end integrado.',
    stack: ['React', 'Node.js', 'TypeScript'],
    type: 'web',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'vilanir-os',
    name: 'Vilanir OS',
    description: 'Este portfólio! Simulação de desktop OS no browser com Glassmorphism, janelas arrastáveis e apps interativos.',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'react-rnd'],
    type: 'web',
    color: 'from-emerald-500 to-teal-600',
  },
]

const TYPE_ICON = {
  mobile: <Smartphone size={14} />,
  web: <Globe size={14} />,
  fullstack: <Code2 size={14} />,
}

const TYPE_LABEL = {
  mobile: 'Mobile',
  web: 'Web',
  fullstack: 'Full Stack',
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  if (selected) {
    return (
      <div className="h-full flex flex-col text-white p-6 gap-4 overflow-auto">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          ← Voltar para projetos
        </button>

        <div className={`rounded-2xl bg-gradient-to-br ${selected.color} p-6 flex items-center gap-4`}>
          <FolderOpen size={40} className="text-white/90" />
          <div>
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-white/70 text-xs">
              {TYPE_ICON[selected.type]}
              {TYPE_LABEL[selected.type]}
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-sm text-white/80 leading-relaxed">{selected.description}</p>
        </div>

        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Stack</p>
          <div className="flex flex-wrap gap-2">
            {selected.stack.map((s) => (
              <span key={s} className="text-xs px-3 py-1.5 bg-white/10 rounded-full border border-white/15 text-white/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/15 text-sm text-white/80 hover:bg-white/20 transition-colors">
            <GitBranch size={14} /> GitHub
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/15 text-sm text-white/80 hover:bg-white/20 transition-colors">
            <ExternalLink size={14} /> Demo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col text-white overflow-auto">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
        <FolderOpen size={14} className="text-orange-400" />
        <span className="text-xs text-white/60">~/projetos</span>
      </div>

      <div className="p-5 grid grid-cols-2 gap-3">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="group relative flex flex-col gap-3 p-4 rounded-xl
              bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
              text-left transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Folder icon gradient */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color}
              flex items-center justify-center shadow-lg`}>
              <FolderOpen size={20} className="text-white" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white/90">{project.name}</p>
              <div className="flex items-center gap-1 mt-0.5 text-white/40 text-xs">
                {TYPE_ICON[project.type]}
                <span>{TYPE_LABEL[project.type]}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.stack.slice(0, 3).map((s) => (
                <span key={s} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
