import { Github, Send } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export const Footer = () => {
  const { t } = useI18n()

  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-slate-500 font-light">
          {t.footer.built} <span className="text-emerald-400">♥</span>{' '}
          {t.footer.by}{' '}
          <span className="text-white font-medium">JustCritSpam</span> ·{' '}
          {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/justcritspam"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://t.me/JustCritSpam"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 hover:text-white transition-colors"
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
