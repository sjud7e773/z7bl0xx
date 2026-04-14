'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ANNOUNCEMENTS = [
  {
    text: 'Precisa de suporte? Fale com a gente agora.',
    action: { label: 'Chat ao Vivo', href: '#' }
  },
  {
    text: 'Pagamento seguro. Entrega automí¡tica direto no Roblox.',
    action: null
  },
  {
    text: 'Itens Chroma mudam de cor no jogo e no site.',
    action: null
  }
]

export default function AnnouncementStrip() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const current = ANNOUNCEMENTS[currentIndex]

  return (
    <div className="h-12 bg-surface-elevated overflow-hidden relative flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="flex items-center gap-4 text-[12px] md:text-sm"
        >
          <span className="font-inter text-text-muted font-medium">{current.text}</span>
          {current.action && (
            <button className="hidden md:inline-flex items-center justify-center border border-border rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-primary hover:bg-surface transition-colors">
              {current.action.label}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
