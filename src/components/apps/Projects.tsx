'use client'

import { useState } from 'react'
import { Folder, GitBranch, ExternalLink, Smartphone, Globe, Code2, Monitor, Info } from 'lucide-react'

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
  github?: string
  demo?: string
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
    name: 'Movie Night',
    description: 'App full-stack para grupos decidirem qual filme assistir juntos. Host cria sala, convidados entram por código, sugerem filmes e um vencedor é sorteado.',
    stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis'],
    type: 'fullstack',
    folderColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/60',
    shadowColor: '0 0 20px rgba(6,182,212,0.35)',
    glowBg: 'rgba(6,182,212,0.06)',
    github: 'https://github.com/josevilanir/ImersaoCodeMiner42',
    demo: 'https://imersao-codeminer42.vercel.app/',
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
  const [tab, setTab] = useState<'info' | 'preview'>('info')
  const [iframeError, setIframeError] = useState(false)

  function handleSelect(project: Project) {
    setSelected(project)
    setTab('info')
    setIframeError(false)
  }

  if (selected) {
    return (
      <div className="h-full w-full flex flex-col text-white overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-10 pt-8 pb-4 shrink-0 max-w-3xl mx-auto w-full">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            ← Voltar para projetos
          </button>
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setTab('info')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                tab === 'info' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Info size={12} /> Info
            </button>
            {selected.demo && (
              <button
                onClick={() => { setTab('preview'); setIframeError(false) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  tab === 'preview' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Monitor size={12} /> Preview
              </button>
            )}
          </div>
        </div>

        {/* Tab: Info */}
        {tab === 'info' && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="max-w-3xl mx-auto w-full flex flex-col px-10 pb-20 gap-10 pt-6">
              <div
                className={`rounded-3xl p-12 flex flex-col sm:flex-row items-center sm:items-start gap-8 border ${selected.borderColor} bg-black/20 backdrop-blur-sm`}
                style={{ boxShadow: selected.shadowColor, background: `linear-gradient(135deg, ${selected.glowBg}, rgba(0,0,0,0.3))` }}
              >
                <Folder size={48} fill="currentColor" className={selected.folderColor} />
                <div>
                  <h2 className="text-3xl font-bold leading-tight">{selected.name}</h2>
                  <div className="flex items-center gap-1.5 mt-2 text-white/50 text-sm">
                    {TYPE_ICON[selected.type]}
                    {TYPE_LABEL[selected.type]}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <p className="text-base text-white/75 leading-relaxed">{selected.description}</p>
              </div>

              <div className="px-2">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Stack</p>
                <div className="flex flex-wrap gap-3">
                  {selected.stack.map((s) => (
                    <span key={s} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pb-4">
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/8 rounded-xl border border-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors"
                  >
                    <GitBranch size={14} /> GitHub
                  </a>
                )}
                {selected.demo && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/8 rounded-xl border border-white/10 text-sm text-white/70 hover:bg-white/15 transition-colors"
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Preview */}
        {tab === 'preview' && selected.demo && (
          <div className="flex-1 relative overflow-hidden rounded-2xl mx-8 sm:mx-12 md:mx-16 mb-12 max-w-4xl self-center w-full shadow-2xl">
            {iframeError ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 bg-white/3 rounded-xl border border-white/10">
                <Monitor size={32} className="text-white/20" />
                <p className="text-sm text-white/40 text-center max-w-xs leading-relaxed">
                  Este site não permite ser exibido em iframe.<br />
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400/70 hover:text-cyan-400 underline underline-offset-2 transition-colors"
                  >
                    Abrir em nova aba →
                  </a>
                </p>
              </div>
            ) : (
              <iframe
                src={selected.demo}
                className="w-full h-full rounded-xl border border-white/10"
                style={{ background: '#000' }}
                onError={() => setIframeError(true)}
                title={`${selected.name} preview`}
              />
            )}
          </div>
        )}
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
              onClick={() => handleSelect(project)}
              className={`group relative flex flex-col rounded-2xl border ${project.borderColor} text-left transition-all duration-300 hover:-translate-y-0.5`}
              style={{
                padding: '20px',
                gap: '12px',
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

              <div className="flex flex-col text-left" style={{ gap: '4px' }}>
                <p className="text-base font-bold text-white leading-tight m-0">{project.name}</p>
                <div className="flex items-center text-white/45 text-xs m-0" style={{ gap: '6px' }}>
                  {TYPE_ICON[project.type]}
                  <span>{TYPE_LABEL[project.type]}</span>
                </div>
              </div>

              <div className="flex flex-wrap mt-auto" style={{ gap: '6px', paddingTop: '8px' }}>
                {project.stack.slice(0, 3).map((s) => (
                  <span key={s} className="text-[12px] rounded-full text-white/70"
                    style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.07)' }}>
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
