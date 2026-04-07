import { create } from 'zustand'

export type Lang = 'pt' | 'en'

interface LanguageStore {
  lang: Lang
  toggle: () => void
  setLang: (lang: Lang) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: 'pt',
  toggle: () => set((state) => ({ lang: state.lang === 'pt' ? 'en' : 'pt' })),
  setLang: (lang) => set({ lang }),
}))
