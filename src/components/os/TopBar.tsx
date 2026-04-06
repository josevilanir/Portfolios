'use client'

import { useState, useEffect } from 'react'
import { Wifi, Battery, Volume2, Search } from 'lucide-react'

export default function TopBar() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 z-[9999]
        bg-black/40 backdrop-blur-xl border-b border-white/10
        flex items-center justify-between px-4 select-none"
    >
      {/* Left: OS Name */}
      <div className="flex items-center gap-4">
        <span className="text-white text-xs font-semibold tracking-wide">Vilanir OS</span>
        <span className="text-white/40 text-xs hidden sm:block">Finder</span>
        <span className="text-white/40 text-xs hidden sm:block">File</span>
        <span className="text-white/40 text-xs hidden sm:block">View</span>
      </div>

      {/* Center: Date */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
        <span suppressHydrationWarning className="text-white/60 text-xs capitalize">{date}</span>
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-3">
        <Search size={12} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <Volume2 size={12} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <Wifi size={12} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <Battery size={12} className="text-white/60 hover:text-white cursor-pointer transition-colors" />
        <span suppressHydrationWarning className="text-white text-xs font-medium min-w-[42px] text-right">{time}</span>
      </div>
    </div>
  )
}
