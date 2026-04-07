'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback, useRef, useEffect, useSyncExternalStore } from 'react'
import { Rnd } from 'react-rnd'
import { useWindowStore } from '@/store/useWindowStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import TopBar from './TopBar'
import Dock from './Dock'
import WindowFrame from './WindowFrame'
import TitleUpdater from './TitleUpdater'

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia('(max-width: 767px)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getMobileSnapshot = () => window.matchMedia('(max-width: 767px)').matches
const getMobileServerSnapshot = () => false

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
  about: { w: 820, h: 640 },
  terminal: { w: 800, h: 600 },
  projects: { w: 820, h: 600 },
  skills: { w: 820, h: 600 },
  contact: { w: 600, h: 500 },
  browser: { w: 940, h: 620 },
}

type AppIconDef = { type: 'app'; labelPt: string; labelEn: string; id: string; emoji: string }
type DownloadIconDef = { type: 'download'; labelPt: string; labelEn: string; id: string; emoji: string; href: string }
type IconDef = AppIconDef | DownloadIconDef

const DESKTOP_ICONS: IconDef[] = [
  { type: 'app',      labelPt: 'Sobre Mim', labelEn: 'About Me', id: 'about',    emoji: '👤' },
  { type: 'app',      labelPt: 'Projetos',  labelEn: 'Projects', id: 'projects', emoji: '📁' },
  { type: 'app',      labelPt: 'Skills',    labelEn: 'Skills',   id: 'skills',   emoji: '⚡' },
  { type: 'app',      labelPt: 'Terminal',  labelEn: 'Terminal', id: 'terminal', emoji: '🖥️' },
  { type: 'download', labelPt: 'Currículo', labelEn: 'Resume',   id: 'resume',   emoji: '📄', href: '/Curriculum_FINAL_Polido.pdf' },
]

const DEFAULT_ICON_POSITIONS: Record<string, { x: number; y: number }> = {
  about:    { x: 16, y: 16 },
  projects: { x: 16, y: 104 },
  skills:   { x: 16, y: 192 },
  terminal: { x: 16, y: 280 },
  resume:   { x: 16, y: 368 },
}

export default function Desktop() {
  const { windows, openWindow } = useWindowStore()
  const { lang } = useLanguageStore()
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot)
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(DEFAULT_ICON_POSITIONS)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vilanir-icon-positions')
      if (saved) setIconPositions({ ...DEFAULT_ICON_POSITIONS, ...JSON.parse(saved) })
    } catch { /* ignore */ }
  }, [])
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const isDraggingRef = useRef(false)

  const handleIconDragStop = useCallback((id: string, x: number, y: number) => {
    const next = { ...iconPositions, [id]: { x, y } }
    setIconPositions(next)
    localStorage.setItem('vilanir-icon-positions', JSON.stringify(next))
  }, [iconPositions])

  const handleIconClick = useCallback((icon: IconDef) => {
    if (isDraggingRef.current) return
    setSelectedIcon(icon.id)

    if (icon.type === 'download') {
      const a = document.createElement('a')
      a.href = icon.href
      a.download = ''
      a.click()
    } else {
      openWindow(icon.id as Parameters<typeof openWindow>[0])
    }
  }, [openWindow])

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
      <div
        className="absolute inset-0 top-7 bottom-20"
        onClick={() => setSelectedIcon(null)}
      >
        {/* Mobile: centered icon grid with single-tap to open */}
        {isMobile ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-wrap justify-center gap-6 px-8 max-w-xs">
              {DESKTOP_ICONS.map((icon) => (
                <button
                  key={icon.id}
                  className="flex flex-col items-center gap-2 group active:scale-95 transition-transform duration-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (icon.type === 'download') {
                      const a = document.createElement('a')
                      a.href = icon.href
                      a.download = ''
                      a.click()
                    } else {
                      openWindow(icon.id as Parameters<typeof openWindow>[0])
                    }
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl backdrop-blur-md
                    border flex items-center justify-center text-3xl
                    shadow-lg active:bg-white/25
                    ${icon.type === 'download'
                      ? 'border-emerald-400/40 bg-emerald-500/10'
                      : 'border-white/20 bg-white/10'
                    }`}>
                    {icon.emoji}
                  </div>
                  <span className="text-white text-[11px] font-medium text-center leading-tight
                    drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {lang === 'pt' ? icon.labelPt : icon.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: draggable icons */
          DESKTOP_ICONS.map((icon) => {
            const pos = iconPositions[icon.id] ?? DEFAULT_ICON_POSITIONS[icon.id]
            const isSelected = selectedIcon === icon.id
            return (
              <Rnd
                key={icon.id}
                position={pos}
                size={{ width: 72, height: 88 }}
                enableResizing={false}
                dragAxis="both"
                bounds="parent"
                onDragStart={() => { isDraggingRef.current = false }}
                onDrag={() => { isDraggingRef.current = true }}
                onDragStop={(_e, d) => handleIconDragStop(icon.id, d.x, d.y)}
                style={{ zIndex: 10 }}
                className="cursor-default"
              >
                <button
                  className="flex flex-col items-center gap-1.5 w-full h-full group"
                  onClick={(e) => { e.stopPropagation(); handleIconClick(icon) }}
                >
                  <div className={`w-14 h-14 rounded-2xl backdrop-blur-md
                    border flex items-center justify-center text-2xl
                    transition-all duration-150 shadow-lg
                    ${isSelected
                      ? 'bg-white/30 border-white/50 scale-105'
                      : icon.type === 'download'
                        ? 'bg-emerald-500/10 border-emerald-400/40 group-hover:bg-emerald-500/20 group-hover:scale-105'
                        : 'bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:scale-105'
                    }`}>
                    {icon.emoji}
                  </div>
                  <span className={`text-white text-[11px] font-medium text-center
                    leading-tight px-1 rounded
                    ${isSelected ? 'bg-blue-500/60' : 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'}`}>
                    {lang === 'pt' ? icon.labelPt : icon.labelEn}
                  </span>
                </button>
              </Rnd>
            )
          })
        )}

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
