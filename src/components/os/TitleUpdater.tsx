'use client'

import { useEffect } from 'react'
import { useWindowStore } from '@/store/useWindowStore'

export default function TitleUpdater() {
  const windows = useWindowStore((s) => s.windows)

  useEffect(() => {
    const active = windows.find((w) => w.isActive && !w.isMinimized)
    document.title = active
      ? `${active.title} — Vilanir OS`
      : 'Vilanir OS — Portfolio'
  }, [windows])

  return null
}
