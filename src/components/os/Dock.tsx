'use client'

import { useState } from 'react'
import { User, FolderOpen, Terminal, Zap, Mail } from 'lucide-react'
import { useWindowStore, AppId } from '@/store/useWindowStore'

interface DockItem {
  id: AppId
  label: string
  icon: React.ReactNode
  color: string
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: 'about',
    label: 'Sobre Mim',
    icon: <User size={28} />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'projects',
    label: 'Projetos',
    icon: <FolderOpen size={28} />,
    color: 'from-orange-400 to-pink-500',
  },
  {
    id: 'terminal',
    label: 'Experiência',
    icon: <Terminal size={28} />,
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <Zap size={28} />,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'contact',
    label: 'Contato',
    icon: <Mail size={28} />,
    color: 'from-emerald-400 to-teal-600',
  },
]

export default function Dock() {
  const { openWindow, windows } = useWindowStore()
  const [hovered, setHovered] = useState<AppId | null>(null)

  const isOpen = (id: AppId) => windows.some((w) => w.id === id && !w.isMinimized)
  const isMinimized = (id: AppId) => windows.some((w) => w.id === id && w.isMinimized)

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9998]">
      <div
        className="flex items-end gap-2 px-4 py-2 rounded-2xl
          bg-white/10 backdrop-blur-2xl
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]"
      >
        {DOCK_ITEMS.map((item) => {
          const isHovered = hovered === item.id
          const open = isOpen(item.id)
          const mini = isMinimized(item.id)

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              <div
                className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1
                  bg-black/70 backdrop-blur-sm rounded-lg
                  text-white text-xs font-medium whitespace-nowrap
                  border border-white/10 pointer-events-none
                  transition-all duration-150
                  ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}
              >
                {item.label}
              </div>

              {/* Icon */}
              <button
                onClick={() => openWindow(item.id)}
                className={`relative flex items-center justify-center rounded-2xl text-white
                  transition-all duration-200 ease-out
                  bg-gradient-to-br ${item.color}
                  shadow-lg
                  ${isHovered ? 'w-14 h-14 -translate-y-3 shadow-2xl' : 'w-12 h-12 translate-y-0'}
                `}
              >
                {item.icon}
              </button>

              {/* Open indicator dot */}
              <div
                className={`mt-1 rounded-full transition-all duration-200
                  ${open ? 'w-1 h-1 bg-white/80' : ''}
                  ${mini ? 'w-1.5 h-1.5 bg-white/40' : ''}
                  ${!open && !mini ? 'w-0 h-0' : ''}
                `}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
