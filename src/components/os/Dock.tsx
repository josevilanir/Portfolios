'use client'

import MacOSDock from '@/components/ui/mac-os-dock'
import { useWindowStore, AppId } from '@/store/useWindowStore'

const CDN = 'https://cdn.jim-nielsen.com/macos/1024'

const DOCK_APPS = [
  { id: 'about',    name: 'Sobre Mim', icon: `${CDN}/photos-2021-05-28.png` },
  { id: 'projects', name: 'Projetos',  icon: `${CDN}/finder-2021-09-10.png` },
  { id: 'terminal', name: 'Terminal',  icon: `${CDN}/terminal-2021-06-03.png` },
  { id: 'skills',   name: 'Skills',    icon: `${CDN}/notes-2021-05-25.png` },
  { id: 'contact',  name: 'Contato',   icon: `${CDN}/mail-2021-05-25.png` },
  { id: 'browser',  name: 'Projetos ao Vivo', icon: `${CDN}/safari-2021-05-28.png` },
]

export default function Dock() {
  const { openWindow, windows } = useWindowStore()

  const openApps = windows
    .filter((w) => !w.isMinimized)
    .map((w) => w.id)

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9998]">
      <MacOSDock
        apps={DOCK_APPS}
        onAppClick={(id) => openWindow(id as AppId)}
        openApps={openApps}
      />
    </div>
  )
}
