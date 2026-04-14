import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Link from 'next/link'
import { Zap, Lock, Sword, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Como Funciona | z7Blox',
  description: 'Entenda como comprar itens MM2 na z7Blox. Processo simples em 4 passos: escolha, informa usuí¡rio Roblox, pague e receba via trade.',
}

const steps = [
  {
    n: '01',
    title: 'Escolha seu item',
    desc: 'Navegue pelas categorias: Facas, Guns, Pets e Bundles. Encontre o item MM2 que deseja e clique em "Comprar".',
  },
  {
    n: '02',
    title: 'Informe seu usuí¡rio do Roblox',
    desc: 'No carrinho, preencha seu username do Roblox. Este í© o usuí¡rio que vai receber o item via trade.',
  },
  {
    n: '03',
    title: 'Finalize o pagamento',
    desc: 'Pague com segurança via Stripe â€” cartão de crí©dito, dí©bito ou Pix. Checkout rí¡pido e protegido.',
  },
  {
    n: '04',
    title: 'Receba seu item',
    desc: 'Entre no Roblox, aceite o trade do nosso bot e pronto! Seu item MM2 estarí¡ no seu inventí¡rio em minutos.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
                color: 'var(--accent)',
                fontFamily: 'Inter',
              }}
            >
              <Zap size={14} /> Entrega em menos de 5 minutos
            </div>
            <h1
              className="font-black"
              style={{
                fontFamily: 'Inter',
                fontSize: 'clamp(32px, 6vw, 60px)',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
              }}
            >
              Como Funciona
            </h1>
            <p
              className="mt-4 text-lg max-w-xl mx-auto"
              style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
            >
              Comprar itens MM2 na z7Blox í© simples, seguro e rí¡pido. Veja o processo completo abaixo.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 -right-4 z-10"
                    style={{ color: 'var(--accent)' }}
                  >
                    <ArrowRight size={24} />
                  </div>
                )}
                <div
                  className="text-4xl font-black"
                  style={{ color: 'var(--accent)', fontFamily: 'Inter', opacity: 0.3 }}
                >
                  {step.n}
                </div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}
                >
                  {step.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Safety note */}
          <div
            className="rounded-2xl p-8 max-w-3xl mx-auto text-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}
            >
              <span className="inline-flex items-center gap-2"><Lock size={20} /> Segurança Total</span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}>
              Nunca pedimos sua senha ou acesso í  conta. A entrega í© feita por{' '}
              <strong style={{ color: 'var(--text-primary)' }}>trade normal dentro do jogo</strong>.
              Seus dados de pagamento são protegidos pelo Stripe â€” a plataforma de pagamentos mais confií¡vel do mundo.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/" className="btn-primary">
              <Sword size={18} /> Começar a Comprar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
