'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Zap, Sword, Lock, X } from 'lucide-react'
import { abrirChatSuporte } from '@/components/TawkToChat'

const messages: { icon: ReactNode; text: ReactNode }[] = [
  { icon: <Zap size={14} />, text: 'Entrega instantânea via trade no Roblox — 100% segura' },
  { icon: <Sword size={14} />, text: 'Godlys, Ancients e Pets com preços competitivos no Brasil' },
  { icon: <Lock size={14} />, text: 'Pagamento seguro via Stripe — Pix, cartão e mais' },
  { 
    icon: <Lock size={14} />, 
    text: (
      <span className="flex items-center gap-2">
        Precisa de suporte? Fale conosco.
        <button 
          onClick={() => abrirChatSuporte()}
          className="ml-1 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-violet-700 transition-transform hover:scale-105 active:scale-95"
        >
          Falar com Suporte
        </button>
      </span>
    )
  },
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('z7blox-bar-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [visible])

  const handleDismiss = () => {
    setVisible(false)
    sessionStorage.setItem('z7blox-bar-dismissed', '1')
  }

  if (!visible) return null

  return (
    <div className="announcement-bar relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="inline-flex items-center gap-1.5"
        >
          {messages[current].icon}
          {messages[current].text}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Fechar aviso"
      >
        <X size={14} />
      </button>
    </div>
  )
}
