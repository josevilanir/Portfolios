'use client'

import { useState, useRef, useSyncExternalStore } from 'react'
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
  const forceFullscreen = isMaximized

  const windowInner = (
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
        <div className="flex items-center gap-[6px] group">
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
            title="Fechar" aria-label="Fechar"
          >
            <X size={7} className="text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors flex items-center justify-center"
            title="Minimizar" aria-label="Minimizar"
          >
            <Minus size={7} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id) }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
            title={forceFullscreen ? 'Restaurar' : 'Maximizar'}
            aria-label={forceFullscreen ? 'Restaurar' : 'Maximizar'}
          >
            {forceFullscreen
              ? <Minimize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
              : <Maximize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
            }
          </button>
        </div>
        <span className="flex-1 text-center text-xs font-medium text-white/70 truncate pr-12">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
        {children}
      </div>
    </div>
  )

  // Mobile drag state
  const [mobilePos, setMobilePos] = useState({ x: 0, y: 28 })
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  function onTitleTouchStart(e: React.TouchEvent) {
    focusWindow(id)
    const t = e.touches[0]
    dragRef.current = { startX: t.clientX, startY: t.clientY, origX: mobilePos.x, origY: mobilePos.y }
  }

  function onTitleTouchMove(e: React.TouchEvent) {
    if (!dragRef.current) return
    const t = e.touches[0]
    const dx = t.clientX - dragRef.current.startX
    const dy = t.clientY - dragRef.current.startY
    const newX = dragRef.current.origX + dx
    const newY = Math.max(28, dragRef.current.origY + dy)
    setMobilePos({ x: newX, y: newY })
  }

  function onTitleTouchEnd() {
    dragRef.current = null
  }

  // On mobile: plain fixed div — no Rnd so touch scroll works natively
  if (isMobile) {
    return (
      <div
        className="fixed"
        style={{
          left: `${mobilePos.x}px`,
          top: `${mobilePos.y}px`,
          width: '100vw',
          height: '50dvh',
          zIndex,
        }}
        onMouseDown={() => focusWindow(id)}
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
          {/* Title bar — draggable */}
          <div
            className={`flex items-center gap-2 px-4 h-10 shrink-0 select-none
              ${isActive ? 'bg-white/10' : 'bg-white/5'}
              border-b border-white/10 cursor-grab active:cursor-grabbing`}
            onTouchStart={onTitleTouchStart}
            onTouchMove={onTitleTouchMove}
            onTouchEnd={onTitleTouchEnd}
          >
            <div className="flex items-center gap-[6px] group">
              <button
                onClick={(e) => { e.stopPropagation(); closeWindow(id) }}
                className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center"
                aria-label="Fechar"
              >
                <X size={7} className="text-red-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(id) }}
                className="w-3 h-3 rounded-full bg-yellow-400 flex items-center justify-center"
                aria-label="Minimizar"
              >
                <Minus size={7} className="text-yellow-900 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMaximize(id) }}
                className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center"
                aria-label="Maximizar"
              >
                <Maximize2 size={7} className="text-green-900 opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <span className="flex-1 text-center text-xs font-medium text-white/70 truncate pr-12">
              {title}
            </span>
          </div>

          {/* Content — scrollable, não interfere com o drag */}
          <div className="flex-1 min-h-0 overflow-y-auto" style={{ touchAction: 'pan-y' }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

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
            position: { x: 0, y: 0 },
            size: { width: '100%', height: 'calc(100% - 0px)' },
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
      {windowInner}
    </Rnd>
  )
}
