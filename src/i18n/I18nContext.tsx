import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, type Lang, type Dict } from './translations'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
}

const I18nContext = createContext<Ctx | null>(null)

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'it'
    const saved = window.localStorage.getItem('lang')
    if (saved === 'it' || saved === 'en') return saved
    return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem('lang', l)
    } catch {}
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
