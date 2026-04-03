'use client'

import { useState } from 'react'
import { Folder, GitBranch, ExternalLink, Smartphone, Globe, Code2 } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  type: 'mobile' | 'web' | 'fullstack'
  folderColor: string
  borderColor: string
  shadowColor: string
  glowBg: string
}

const PROJECTS: Project[] = [
  {
    id: 'gym-tracker',
    name: 'Gym Tracker',
    description: 'App mobile para rastreamento de treinos, séries e evolução física com interface fluida e offline-first.',
    stack: ['Flutter', 'Dart', 'SQLite'],
    type: 'mobile',
    folderColor: 'text-pink-400',
    borderColor: 'border-blue-500/60',
    shadowColor: '0 0 20px rgba(59,130,246,0.35)',
    glowBg: 'rgba(59,130,246,0.06)',
  },
  {
    id: 'mural-oracao',
    name: 'Mural de Oração',
    description: 'Plataforma web para comunidades compartilharem pedidos de oração, com autenticação, feed em tempo real e moderação.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    type: 'fullstack',
    folderColor: 'text-violet-400',
    borderColor: 'border-violet-500/60',
    shadowColor: '0 0 20px rgba(139,92,246,0.35)',
    glowBg: 'rgba(139,92,246,0.06)',
  },
  {
    id: 'codeminer42',
    name: 'Imersão CodeMiner42',
    description: 'Projeto desenvolvido durante imersão intensiva com desafios de Front-end e Back-end integrado.',
    stack: ['React', 'Node.js', 'TypeScript'],
    type: 'web',
    folderColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/60',
    shadowColor: '0 0 20px rgba(6,182,212,0.35)',
    glowBg: 'rgba(6,182,212,0.06)',
  },
  {
    id: 'vilanir-os',
    name: 'Vilanir OS',
    description: 'Este portfólio! Simulação de desktop OS no browser com Glassmorphism, janelas arrastáveis e apps interativos.',
    stack: ['Next.js', 'TypeScript', 'Zustand', 'react-rnd'],
    type: 'web',
    folderColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/60',
    shadowColor: '0 0 20px rgba(16,185,129,0.35)',
    glowBg: 'rgba(16,185,129,0.06)',
  },
]

const TYPE_ICON = {
  mobile: <Smartphone size={13} />,
  web: <Globe size={13} />,
  fullstack: <Code2 size={13} />,
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
      <div className="h-full w-full text-white overflow-y-auto overflow-x-hidden">
        <div className="max-w-5xl mx-auto w-full flex flex-col px-8 py-8 md:px-12 lg:px-16 gap-5">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors w-fit"
          >
            ← Voltar para projetos
          </button>

          <div
            className={`rounded-2xl p-6 flex items-center gap-5 border ${selected.borderColor} bg-black/20 backdrop-blur-sm`}
            style={{ boxShadow: selected.shadowColor, background: `linear-gradient(135deg, ${selected.glowBg}, rgba(0,0,0,0.3))` }}
          >
            <Folder size={48} fill="currentColor" className={selected.folderColor} />
            <div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <div className="flex items-center gap-1.5 mt-1.5 text-white/50 text-xs">
                {TYPE_ICON[selected.type]}
                {TYPE_LABEL[selected.type]}
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-white/75 leading-relaxed">{selected.description}</p>
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {selected.stack.map((s) => (
                <span key={s} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/70">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto pb-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/8 rounded-xl border border-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors">
              <GitBranch size={14} /> GitHub
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/8 rounded-xl border border-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors">
              <ExternalLink size={14} /> Demo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full text-white overflow-y-auto">
      <div style={{ padding: '24px 24px 32px 24px' }}>
        {/* Header */}
        <div className="pb-5">
          <span className="text-sm text-white/40 font-light tracking-wide">~/projects</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className={`group relative flex flex-col gap-2 p-4 rounded-2xl border ${project.borderColor} text-left transition-all duration-300 hover:-translate-y-0.5`}
              style={{
                background: `linear-gradient(135deg, ${project.glowBg} 0%, rgba(20,18,35,0.85) 100%)`,
                backdropFilter: 'blur(8px)',
                boxShadow: `${project.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {/* Folder icon */}
              <Folder
                size={34}
                fill="currentColor"
                className={`${project.folderColor} transition-transform duration-300 group-hover:scale-105 shrink-0`}
              />

              <div className="flex flex-col gap-1 text-left">
                <p className="text-base font-bold text-white leading-tight">{project.name}</p>
                <div className="flex items-center gap-1.5 text-white/45 text-xs">
                  {TYPE_ICON[project.type]}
                  <span>{TYPE_LABEL[project.type]}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.stack.slice(0, 3).map((s) => (
                  <span key={s} className="text-[12px] px-3 py-1 rounded-full text-white/70"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
