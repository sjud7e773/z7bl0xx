import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Link from 'next/link'
import { MessageCircle, HelpCircle, RefreshCw, Clock, ArrowLeft, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import ChatButton from './ChatButton'

export const metadata: Metadata = {
  title: 'Suporte & Contato | z7Blox',
  description: 'Entre em contato com o suporte da z7Blox. Chat ao vivo e e-mail, resposta rí¡pida para díºvidas sobre pedidos MM2.',
}

const channels: { icon: ReactNode; title: string; sub: string; cta: string; href: string; external: boolean; primary: boolean; onClick?: boolean }[] = [
  {
    icon: <MessageCircle size={28} />,
    title: 'Chat ao Vivo',
    sub: 'Resposta imediata durante o horí¡rio de atendimento',
    cta: 'Abrir Chat',
    href: '#',
    external: false,
    primary: true,
    onClick: true,
  },
  {
    icon: <Mail size={28} />,
    title: 'E-mail',
    sub: 'z7bloxsuporte@gmail.com â€” resposta em atí© 24h',
    cta: 'Enviar E-mail',
    href: 'mailto:z7bloxsuporte@gmail.com',
    external: true,
    primary: false,
  },
  {
    icon: <HelpCircle size={28} />,
    title: 'Perguntas Frequentes',
    sub: 'Respostas para as díºvidas mais comuns',
    cta: 'Ver FAQ',
    href: '/#faq',
    external: false,
    primary: false,
  },
  {
    icon: <RefreshCw size={28} />,
    title: 'Como Funciona',
    sub: 'Entenda o processo completo de compra e entrega',
    cta: 'Ver Tutorial',
    href: '/como-funciona',
    external: false,
    primary: false,
  },
]

// ChatButton agora é um Client Component importado, evitando handlers no lado do servidor

export default function ContatoPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-16">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h1
              className="font-black"
              style={{
                fontFamily: 'Inter',
                fontSize: 'clamp(32px, 6vw, 56px)',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
              }}
            >
              Suporte & Contato
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}>
              Nossa equipe estí¡ online para ajudar com pedidos, díºvidas e qualquer problema.
            </p>
          </div>

          {/* Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-14">
            {channels.map((ch) => (
              <div
                key={ch.title}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div style={{ color: 'var(--accent)' }}>{ch.icon}</div>
                <div>
                  <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}>
                    {ch.title}
                  </h2>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                    {ch.sub}
                  </p>
                </div>
                {ch.onClick ? (
                  <ChatButton
                    className={ch.primary ? 'btn-primary text-sm justify-center' : 'btn-secondary text-sm justify-center'}
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                  >
                    {ch.cta}
                  </ChatButton>
                ) : ch.external ? (
                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ch.primary ? 'btn-primary text-sm justify-center' : 'btn-secondary text-sm justify-center'}
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                  >
                    {ch.cta}
                  </a>
                ) : (
                  <Link
                    href={ch.href}
                    className={ch.primary ? 'btn-primary text-sm justify-center' : 'btn-secondary text-sm justify-center'}
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                  >
                    {ch.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Response time */}
          <div
            className="max-w-2xl mx-auto rounded-2xl p-6 text-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <p className="font-semibold text-sm mb-1 flex items-center justify-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}>
              <Clock size={14} /> Tempo mí©dio de resposta: menos de 10 minutos
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Suporte ativo de seg a dom, das 8h í s 23h (horí¡rio de Brasí­lia). Fora do horí¡rio, envie e-mail para z7bloxsuporte@gmail.com.
            </p>
          </div>

          <div className="text-center mt-10">
            <Link href="/" className="btn-secondary" style={{ fontSize: '14px', padding: '11px 24px' }}>
              <ArrowLeft size={16} /> Voltar para a Loja
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
