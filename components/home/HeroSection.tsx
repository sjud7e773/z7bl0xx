'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { Zap, Sword, Crosshair } from 'lucide-react'

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
    }))

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        star.alpha += star.speed
        if (star.alpha > 1 || star.alpha < 0) star.speed *= -1
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${star.alpha * 0.8})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

const wordReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

const stats = [
  { value: '10.000+', label: 'Clientes' },
  { value: '500+', label: 'Itens' },
  { value: '24/7', label: 'Suporte' },
]

export default function HeroSection() {
  const { theme } = useThemeStore()

  return (
    <section className="hero-section" style={{ position: 'relative' }}>
      {/* Background layers */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{ background: 'var(--bg-base)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 110%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 10% -10%, color-mix(in srgb, var(--accent-alt) 6%, transparent) 0%, transparent 60%)',
          }}
        />
      </div>

      {theme === 'space' && <StarCanvas />}

      {/* Content */}
      <div
        className="relative w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
        style={{ zIndex: 10 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
            color: 'var(--accent)',
            fontFamily: 'Inter',
          }}
        >
          <Zap size={14} />
          Entrega Instantânea via Trade
        </motion.div>

        {/* Title */}
        <h1
          className="font-black leading-none tracking-tight"
          style={{
            fontFamily: 'Inter',
            fontSize: 'clamp(38px, 7vw, 76px)',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}
        >
          {['Itens', 'MM2', 'com'].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            custom={3}
            variants={wordReveal}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ color: 'var(--accent)' }}
          >
            Entrega Instantânea
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-xl mx-auto text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
        >
          Compre Godlys, Ancients, Pets e muito mais com segurança. 
          Trade direto no Roblox, sem risco, com suporte em tempo real.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <Link href="/categoria/facas" className="btn-primary">
            <Sword size={18} /> Ver Facas
          </Link>
          <Link href="/categoria/guns" className="btn-secondary">
            <Crosshair size={18} /> Ver Guns
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center gap-8 pt-4 flex-wrap justify-center"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              {i > 0 && (
                <div
                  className="h-8 w-px"
                  style={{ background: 'var(--border)' }}
                />
              )}
              <div className="text-center">
                <div
                  className="font-bold"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '28px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
