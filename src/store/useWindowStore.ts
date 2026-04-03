import { create } from 'zustand'

export type AppId = 'about' | 'terminal' | 'projects' | 'skills' | 'contact'

export interface WindowInstance {
  id: AppId
  title: string
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

interface WindowStore {
  windows: WindowInstance[]
  topZIndex: number
  openWindow: (id: AppId) => void
  closeWindow: (id: AppId) => void
  focusWindow: (id: AppId) => void
  minimizeWindow: (id: AppId) => void
  toggleMaximize: (id: AppId) => void
}

const APP_DEFAULTS: Record<AppId, { title: string }> = {
  about: { title: 'Sobre Mim — José Vilanir' },
  terminal: { title: 'Terminal — Experiência' },
  projects: { title: 'Projetos' },
  skills: { title: 'Skills & Stack' },
  contact: { title: 'Contato' },
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZIndex: 100,

  openWindow: (id) => {
    const { windows, topZIndex } = get()
    const exists = windows.find((w) => w.id === id)
    if (exists) {
      // Restore if minimized, then focus
      set({
        windows: windows.map((w) =>
          w.id === id
            ? { ...w, isMinimized: false, isActive: true, zIndex: topZIndex + 1 }
            : { ...w, isActive: false }
        ),
        topZIndex: topZIndex + 1,
      })
      return
    }
    const newWindow: WindowInstance = {
      id,
      title: APP_DEFAULTS[id].title,
      isActive: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: topZIndex + 1,
    }
    set({
      windows: [...windows.map((w) => ({ ...w, isActive: false })), newWindow],
      topZIndex: topZIndex + 1,
    })
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }))
  },

  focusWindow: (id) => {
    const { topZIndex } = get()
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, isActive: true, zIndex: topZIndex + 1 }
          : { ...w, isActive: false }
      ),
      topZIndex: topZIndex + 1,
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isActive: false } : w
      ),
    }))
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }))
  },
}))
