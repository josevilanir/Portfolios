'use client'

import MacOSDock from '@/components/ui/mac-os-dock'
import { useWindowStore, AppId } from '@/store/useWindowStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ALL_APPS, DOCK_APP_IDS } from '@/constants/apps'

export default function Dock() {
  const { openWindow, windows } = useWindowStore()
  const { lang } = useLanguageStore()

  const dockApps = ALL_APPS
    .filter(app => DOCK_APP_IDS.includes(app.id))
    .map(app => ({
      id: app.id,
      name: lang === 'pt' ? app.labelPt : app.labelEn,
      icon: app.icon
    }))

  const openApps = windows
    .filter((w) => !w.isMinimized)
    .map((w) => w.id)

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9998]">
      <MacOSDock
        apps={dockApps}
        onAppClick={(id) => openWindow(id as AppId)}
        openApps={openApps}
      />
    </div>
  )
}
