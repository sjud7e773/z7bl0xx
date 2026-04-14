'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API: {
      toggle?: () => void
      onLoad?: () => void
      hideWidget?: () => void
      showWidget?: () => void
      [key: string]: unknown
    }
    Tawk_LoadStart: Date
  }
}

export default function TawkToChat() {
  useEffect(() => {
    if (document.querySelector('script[src*="tawk.to"]')) return

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    window.Tawk_API.onLoad = function () {
      // Chat de suporte carregado
    }

    const s1 = document.createElement('script')
    s1.async = true
    s1.src = 'https://embed.tawk.to/69d7c7518d80621c3581cfbb/1jlpe55ro'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')

    s1.onerror = () => {
      // Fallback silencioso se widget não carregar
    }

    document.body.appendChild(s1)

    return () => {
      // Não remove o script no unmount para evitar bugs de re-carregamento
    }
  }, [])

  return null
}

export function abrirChatSuporte() {
  if (typeof window !== 'undefined') {
    if (window.Tawk_API?.toggle) {
      window.Tawk_API.toggle()
    } else {
      window.location.href = 'mailto:z7bloxsuporte@gmail.com'
    }
  }
}
