'use client'

import { useState, useRef } from 'react'
import { RotateCcw, ExternalLink, Lock } from 'lucide-react'

const PROJECTS = [
  {
    id: 'mural',
    name: 'Mural de Oração',
    url: 'https://mural-de-oracao-two.vercel.app/',
    emoji: '🙏',
  },
  {
    id: 'jukebox',
    name: 'Jukebox App',
    url: 'https://jukebox-app.fly.dev',
    emoji: '🎵',
  },
  {
    id: 'manga',
    name: 'Manga Creator',
    url: 'https://mangacreator.netlify.app',
    emoji: '📖',
  },
  {
    id: 'brownies',
    name: 'Evilly Brownies',
    url: 'https://evilly-brownies.vercel.app/',
    emoji: '🍫',
  },
]

export default function BrowserApp() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const active = PROJECTS.find((p) => p.id === activeId)!

  const handleTabChange = (id: string) => {
    if (id === activeId) return
    setActiveId(id)
    setIsLoading(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#12102a' }}>

      {/* Tab Bar */}
      <div
        className="flex items-end gap-px px-2 pt-2 overflow-x-auto shrink-0"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      >
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleTabChange(p.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border-t border-x ${
              activeId === p.id
                ? 'bg-white/10 text-white border-white/20'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5 border-transparent'
            }`}
          >
            <span className="text-sm">{p.emoji}</span>
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* URL / Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b"
        style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <button
          onClick={handleRefresh}
          title="Recarregar"
          className="text-white/40 hover:text-white/80 transition-colors p-1 rounded"
        >
          <RotateCcw size={12} className={isLoading ? 'animate-spin' : ''} />
        </button>

        <div
          className="flex-1 flex items-center gap-2 rounded-md px-3 py-[5px] border"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)' }}
        >
          <Lock size={10} className="text-emerald-400/80 shrink-0" />
          <span className="text-white/50 text-[11px] truncate">{active.url}</span>
        </div>

        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir em nova aba"
          className="text-white/40 hover:text-white/80 transition-colors p-1 rounded"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Iframe area */}
      <div className="relative flex-1 overflow-hidden">
        {isLoading && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
            style={{ background: '#12102a' }}
          >
            <div className="w-7 h-7 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
            <span className="text-white/40 text-xs">Carregando {active.name}…</span>
          </div>
        )}

        <iframe
          ref={iframeRef}
          key={activeId}
          src={active.url}
          title={active.name}
          className="w-full h-full border-none block"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />

        {/* Persistent open-in-tab hint (bottom-right corner) */}
        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-white/50
            hover:text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm
            border border-white/10 hover:border-white/25 px-2.5 py-1.5 rounded-full
            transition-all duration-150 z-20"
          title="Se o projeto não carregar, abra em nova aba"
        >
          <ExternalLink size={11} />
          Abrir em nova aba
        </a>
      </div>
    </div>
  )
}
