'use client'

import { useState, useSyncExternalStore } from 'react'
import { Rnd } from 'react-rnd'
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react'
import { useWindowStore, AppId } from '@/store/useWindowStore'

interface WindowFrameProps {
  id: AppId
  title: string
  isActive: boolean
  isMaximized: boolean
  zIndex: number
  children: React.ReactNode
  defaultWidth?: number
  defaultHeight?: number
}

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia('(max-width: 767px)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getMobileSnapshot = () => window.matchMedia('(max-width: 767px)').matches
const getMobileServerSnapshot = () => false

export default function WindowFrame({
  id,
  title,
  isActive,
  isMaximized,
  zIndex,
  children,
  defaultWidth = 680,
  defaultHeight = 480,
}: WindowFrameProps) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize } = useWindowStore()

  const [defaultPos] = useState(() => ({
    x: Math.random() * 80 + 60,
    y: Math.random() * 80 + 60,
  }))

  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot)
  const forceFullscreen = isMobile || isMaximized

  return (
    <Rnd
      default={{
        x: defaultPos.x,
        y: defaultPos.y,
        width: defaultWidth,
        height: defaultHeight,
      }}
      {...(forceFullscreen
        ? {
            position: { x: 0, y: 28 },
            size: { width: '100vw', height: 'calc(100vh - 28px - 72px)' },
            disableDragging: true,
            enableResizing: false,
          }
        : {
            disableDragging: false,
            enableResizing: true,
          })}
      minWidth={340}
      minHeight={240}
      dragHandleClassName="window-drag-handle"
      style={{ zIndex }}
      onMouseDown={() => focusWindow(id)}
      className="absolute"
      bounds="parent"
    >
      <div
        role="region"
        aria-label={title}
        className={`flex flex-col h-full rounded-xl overflow-hidden transition-all duration-150
          ${isActive
            ? 'shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/20'
            : 'shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/10'
          }
          bg-white/10 backdrop-blur-2xl border border-white/20`}
      >
        {/* Title bar */}
        <div
          className={`window-drag-handle flex items-center gap-2 px-4 h-10 shrink-0 select-none
            ${isActive ? 'bg-white/10' : 'bg-white/5'}
            border-b border-white/10 cursor-move`}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-[6px] group">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
              title="Fechar"
              aria-label="Fechar"
            >
              <X size={7} className="text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors flex items-center justify-center"
              title="Minimizar"
              aria-label="Minimizar"
            >
              <Minus size={7} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleMaximize(id) }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
              title={forceFullscreen ? 'Restaurar' : 'Maximizar'}
              aria-label={forceFullscreen ? 'Restaurar' : 'Maximizar'}
            >
              {isMaximized
                ? <Minimize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
                : <Maximize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
              }
            </button>
          </div>

          {/* Title */}
          <span className="flex-1 text-center text-xs font-medium text-white/70 truncate pr-12">
            {title}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  )
}
