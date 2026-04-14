'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search, Sun, Moon, ShoppingCart, User } from 'lucide-react'
import SideDrawer from './SideDrawer'
import { useCartStore } from '@/store/cartStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  
  const { openCart, items } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('z7blox-theme')
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme)
        if (parsed.state && parsed.state.theme) {
          setTheme(parsed.state.theme)
        }
      } catch(e) {}
    } else {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 50) {
        setIsScrolled(true)
        if (currentScrollY > lastScrollY && !isDrawerOpen) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      } else {
        setIsScrolled(false)
        setIsHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isDrawerOpen])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    if (!(document as any).startViewTransition) {
      document.documentElement.setAttribute('data-theme', newTheme)
      setTheme(newTheme)
      localStorage.setItem('z7blox-theme', JSON.stringify({ state: { theme: newTheme } }))
      return
    }

    (document as any).startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', newTheme)
      setTheme(newTheme)
      localStorage.setItem('z7blox-theme', JSON.stringify({ state: { theme: newTheme } }))
    })
  }

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <header
        className="fixed top-12 left-0 w-full z-[100] transition-transform duration-250 ease-out"
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-text-primary hover:text-accent-pink transition-colors p-1"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="font-cabin text-xl font-bold tracking-tight text-text-primary hover:text-accent-pink transition-colors">
              Z7Blox
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Facas', 'Armas', 'Pets', 'Sets'].map((item) => (
              <Link
                key={item}
                href={`/ + item.toLowerCase() + `}
                className="font-inter font-medium text-sm text-text-muted hover:text-text-primary hover:underline decoration-accent-pink underline-offset-4 transition-all"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <button className="text-text-muted hover:text-text-primary transition-colors p-1">
              <Search size={20} />
            </button>

            <div className="hidden md:flex items-center text-xs font-inter font-medium border-x border-border px-3 mx-1">
              <button className="text-text-primary font-bold px-1 hover:text-accent-pink transition-colors">PT</button>
              <span className="text-border">/</span>
              <button className="text-text-muted px-1 hover:text-accent-pink transition-colors">EN</button>
            </div>

            <button onClick={toggleTheme} className="hidden md:flex text-text-muted hover:text-text-primary transition-colors p-1">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={openCart} className="relative text-text-primary hover:text-accent-pink transition-colors p-1 group">
              <ShoppingCart size={22} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 w-full z-[200] bg-background border-t border-border flex items-center justify-around h-[60px] pb-safe transition-transform duration-250 ease-out"
      >
        <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary w-16">
          <Menu size={20} />
          <span className="font-inter font-medium text-[10px] uppercase tracking-wider">Menu</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary w-16">
          <Search size={20} />
          <span className="font-inter font-medium text-[10px] uppercase tracking-wider">Buscar</span>
        </button>
        <Link href="/" className="flex flex-col items-center justify-center gap-1 text-text-primary hover:text-accent-pink w-16">
          <div className="w-10 h-10 bg-surface-elevated rounded-full flex items-center justify-center border border-border shadow-sm">
            <span className="font-cabin font-bold text-lg">Z</span>
          </div>
        </Link>
        <button onClick={openCart} className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary w-16 relative">
          <ShoppingCart size={20} />
          <span className="font-inter font-medium text-[10px] uppercase tracking-wider">Carrinho</span>
          {mounted && itemCount > 0 && (
            <span className="absolute top-0 right-2 bg-accent-pink text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
        <Link href="/conta" className="flex flex-col items-center justify-center gap-1 text-text-muted hover:text-text-primary w-16">
          <User size={20} />
          <span className="font-inter font-medium text-[10px] uppercase tracking-wider">Perfil</span>
        </Link>
      </div>

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  )
}
