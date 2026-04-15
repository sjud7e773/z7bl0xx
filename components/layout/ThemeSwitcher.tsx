'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { Sparkles, Moon, Sun, Check } from 'lucide-react'
import type { Theme } from '@/types'

const themes: { id: Theme; label: string; icon: ReactNode; desc: string }[] = [
  { id: 'space', label: 'Space', icon: <Sparkles size={16} />, desc: 'Roxo espacial' },
  { id: 'dark', label: 'Dark', icon: <Moon size={16} />, desc: 'Preto puro' },
  { id: 'light', label: 'Light', icon: <Sun size={16} />, desc: 'Branco limpo' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const current = themes.find((t) => t.id === theme)

  return (
    <div className="theme-switcher-wrap" ref={ref}>
      <button
        className="theme-trigger-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Mudar tema"
        aria-expanded={open}
        title={`Tema atual: ${current?.label}`}
      >
        <span className="theme-trigger-icon">{current?.icon}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="theme-dropdown" role="menu">
          <p className="theme-dropdown-label">Aparência</p>
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option${theme === t.id ? ' active' : ''}`}
              onClick={() => {
                setTheme(t.id)
                setOpen(false)
              }}
              role="menuitem"
            >
              <span className="theme-option-icon">{t.icon}</span>
              <span className="theme-option-info">
                <span className="theme-option-name">{t.label}</span>
                <span className="theme-option-desc">{t.desc}</span>
              </span>
              {theme === t.id && (
                <Check size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
