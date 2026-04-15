'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Sun, Moon, Globe } from 'lucide-react'
import { categoryLinks } from '@/lib/navigation'

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
  theme: string
  toggleTheme: () => void
}

export default function SideDrawer({ isOpen, onClose, theme, toggleTheme }: SideDrawerProps) {
  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/60 z-[190]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 bottom-0 w-full md:w-[280px] bg-background z-[200] border-r border-border shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link href="/" onClick={onClose} className="flex items-center text-text-primary tracking-tight">
                <Image src="/z7blox-logo.svg" alt="Z7Blox" width={152} height={38} className="h-9 w-auto" />
              </Link>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
              <nav className="flex flex-col gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Coleção</div>
                {categoryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="font-inter font-medium text-lg text-text-primary hover:text-accent-pink transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <nav className="flex flex-col gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Info</div>
                <Link href="/como-funciona" onClick={onClose} className="font-inter font-medium text-lg text-text-primary hover:text-accent-pink transition-colors">Como Usar</Link>
                <Link href="/faq" onClick={onClose} className="font-inter font-medium text-lg text-text-primary hover:text-accent-pink transition-colors">FAQ</Link>
                <Link href="/suporte" onClick={onClose} className="font-inter font-medium text-lg text-text-primary hover:text-accent-pink transition-colors">Suporte</Link>
              </nav>

              <nav className="flex flex-col gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Conta</div>
                <Link href="/conta" onClick={onClose} className="font-inter font-medium text-lg text-text-primary hover:text-accent-pink transition-colors">Ver Conta</Link>
              </nav>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-between">
              <button onClick={toggleTheme} className="flex items-center gap-2 text-text-muted hover:text-text-primary font-inter font-medium transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
              <button className="flex items-center gap-2 text-text-muted hover:text-text-primary font-inter font-medium transition-colors">
                <Globe size={20} />
                <span>PT/EN</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
