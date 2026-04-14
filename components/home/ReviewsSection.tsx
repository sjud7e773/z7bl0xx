'use client'

import { motion } from 'framer-motion'
import type { Review } from '@/types'

const reviews: Review[] = [
  {
    id: '1',
    author: 'Gabriel M.',
    country: 'BR',
    date: 'Jan 10, 2026',
    initials: 'GM',
    text: 'Comprei o Icewing e recebi em menos de 2 minutos. Trade direto no Roblox, super seguro. Recomendo muito a z7Blox!',
  },
  {
    id: '2',
    author: 'Lucas R.',
    country: 'BR',
    date: 'Feb 03, 2026',
    initials: 'LR',
    text: 'Melhor loja de MM2 do Brasil. Preços ótimos, entrega na hora, suporte sempre presente. Jí¡ comprei 5 vezes.',
  },
  {
    id: '3',
    author: 'Ana C.',
    country: 'BR',
    date: 'Mar 12, 2026',
    initials: 'AC',
    text: 'Fiquei com medo no começo mas o processo í© tudo automatizado. Recebi meu Godly em 3 minutos. Muito profissional!',
  },
  {
    id: '4',
    author: 'Pedro S.',
    country: 'BR',
    date: 'Mar 28, 2026',
    initials: 'PS',
    text: 'Atendimento impecí¡vel. Tive um problema e o suporte resolveu na hora. Loja sí©ria e confií¡vel. 5 estrelas!',
  },
]

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section style={{ background: 'var(--bg-base)', padding: '80px 0' }}>
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-black"
            style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(24px, 4vw, 40px)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Confiado por <span style={{ color: 'var(--accent)' }}>10.000+</span> Jogadores de MM2
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-3 text-base"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
          >
            Veja o que nossos clientes estão dizendo
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={cardReveal} className="review-card">
              <StarRating />
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', fontFamily: 'Inter' }}
                >
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}>
                    {review.author}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                    {review.country} Â· {review.date}
                  </p>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
              >
                {review.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
