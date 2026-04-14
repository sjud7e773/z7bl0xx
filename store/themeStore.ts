'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'space',
      setTheme: (theme: Theme) => {
        set({ theme })
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme)
        }
      },
    }),
    {
      name: 'z7blox-theme',
    }
  )
)
