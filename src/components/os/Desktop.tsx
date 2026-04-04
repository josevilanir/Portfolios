'use client'

import dynamic from 'next/dynamic'
import { useWindowStore } from '@/store/useWindowStore'
import TopBar from './TopBar'
import Dock from './Dock'
import WindowFrame from './WindowFrame'
import TitleUpdater from './TitleUpdater'

// Lazy load apps
const AboutMe = dynamic(() => import('@/components/apps/AboutMe'))
const TerminalApp = dynamic(() => import('@/components/apps/TerminalApp'))
const Projects = dynamic(() => import('@/components/apps/Projects'))
const Skills = dynamic(() => import('@/components/apps/Skills'))
const Contact = dynamic(() => import('@/components/apps/Contact'))
const BrowserApp = dynamic(() => import('@/components/apps/BrowserApp'))

const APP_COMPONENTS = {
  about: AboutMe,
  terminal: TerminalApp,
  projects: Projects,
  skills: Skills,
  contact: Contact,
  browser: BrowserApp,
}

const APP_SIZES: Record<string, { w: number; h: number }> = {
  about: { w: 580, h: 460 },
  terminal: { w: 660, h: 520 },
  projects: { w: 680, h: 500 },
  skills: { w: 520, h: 560 },
  contact: { w: 420, h: 460 },
  browser: { w: 940, h: 620 },
}

const DESKTOP_ICONS = [
  { label: 'Sobre Mim', id: 'about' as const, emoji: '👤' },
  { label: 'Projetos', id: 'projects' as const, emoji: '📁' },
  { label: 'Skills', id: 'skills' as const, emoji: '⚡' },
  { label: 'Terminal', id: 'terminal' as const, emoji: '🖥️' },
]

export default function Desktop() {
  const { windows, openWindow } = useWindowStore()

  const visibleWindows = windows.filter((w) => !w.isMinimized)

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 70%, #0f0c29 100%)',
      }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
          bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full
          bg-purple-600/15 blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full
          bg-cyan-500/10 blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      <TitleUpdater />
      <TopBar />

      {/* Desktop area (between TopBar and Dock) */}
      <div className="absolute inset-0 top-7 bottom-20">
        {/* Desktop icons */}
        <div className="absolute top-4 left-4 flex flex-col gap-4">
          {DESKTOP_ICONS.map((icon) => (
            <button
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id)}
              className="flex flex-col items-center gap-1.5 w-16 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md
                border border-white/20 flex items-center justify-center text-2xl
                group-hover:bg-white/20 group-hover:scale-105 transition-all duration-150
                shadow-lg">
                {icon.emoji}
              </div>
              <span className="text-white text-[11px] font-medium text-center
                drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight px-1">
                {icon.label}
              </span>
            </button>
          ))}
        </div>

        {/* Windows */}
        {visibleWindows.map((win) => {
          const AppComponent = APP_COMPONENTS[win.id]
          const size = APP_SIZES[win.id]
          return (
            <WindowFrame
              key={win.id}
              id={win.id}
              title={win.title}
              isActive={win.isActive}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              defaultWidth={size.w}
              defaultHeight={size.h}
            >
              <AppComponent />
            </WindowFrame>
          )
        })}
      </div>

      <Dock />
    </div>
  )
}
