'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/types'

const faqs: FaqItem[] = [
  {
    question: 'Comprar itens MM2 na z7Blox pode me banir?',
    answer: 'Não. A entrega í© feita via trade normal no jogo. Nunca pedimos sua senha ou acesso í  conta. O processo í© 100% dentro das regras do Roblox.',
  },
  {
    question: 'De onde víªm os itens MM2?',
    answer: 'Os itens são obtidos via trade e estoque próprio de jogadores coletores. O inventí¡rio pode variar conforme disponibilidade.',
  },
  {
    question: 'Como recebo meu item após a compra?',
    answer: 'Após o checkout, vocíª acessa a Claim Page, informa seu usuí¡rio do Roblox e segue o passo a passo para concluir o trade no jogo. Entrega mí©dia de 1 a 5 minutos.',
  },
  {
    question: 'A z7Blox í© segura para comprar godlys e chromas?',
    answer: 'Sim. Usamos checkout seguro via Stripe e entregamos atraví©s de trade no jogo. Nunca precisamos da sua senha ou acesso í  conta.',
  },
  {
    question: 'Como faço para resgatar meu pedido MM2?',
    answer: 'Clique aqui para ver o tutorial passo a passo completo do processo de claim após a compra.',
  },
  {
    question: 'í‰ legal e seguro comprar itens MM2?',
    answer: 'A entrega í© feita via trade normal no jogo â€” nunca usamos exploits, scripts ou bots. Siga as instruçíµes após o checkout para receber seus itens com segurança.',
  },
]

function FAQItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span style={{ color: 'var(--text-primary)', fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', textAlign: 'left' }}>
          {item.question}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: open ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'transform 0.25s ease, color 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="faq-answer"
          >
            <p className="faq-answer-inner">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" style={{ background: 'var(--bg-base)', padding: '80px 0' }}>
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-black inline-block relative"
              style={{
                fontFamily: 'Inter',
                fontSize: 'clamp(24px, 4vw, 40px)',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                borderBottom: '3px solid var(--accent)',
                paddingBottom: '8px',
              }}
            >
              Perguntas Frequentes
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-4 text-base"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
          >
            Tem díºvidas? Temos respostas!
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {faqs.filter((_, i) => i % 3 === 0).map((faq) => (
              <FAQItem key={faq.question} item={faq} />
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {faqs.filter((_, i) => i % 3 === 1).map((faq) => (
              <FAQItem key={faq.question} item={faq} />
            ))}
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {faqs.filter((_, i) => i % 3 === 2).map((faq) => (
              <FAQItem key={faq.question} item={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
