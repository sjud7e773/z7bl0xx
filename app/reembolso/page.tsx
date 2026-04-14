import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Polí­tica de Reembolso | z7Blox',
  description: 'Polí­tica de reembolso da z7Blox. Saiba quando e como solicitar reembolsos para compras de itens MM2.',
}

export default function ReembolsoPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-16 max-w-3xl mx-auto">
          <h1 className="font-black text-4xl mb-6" style={{ fontFamily: 'Inter', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            Polí­tica de Reembolso
          </h1>
          <div className="flex flex-col gap-6" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.7' }}>
            <p>Nossa prioridade í© sua satisfação. Avaliamos todos os pedidos de reembolso com atenção.</p>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Quando reembolsamos</h2>
              <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: 'disc' }}>
                <li>Item não entregue dentro de 30 minutos após o pagamento</li>
                <li>Item entregue diferente do pedido</li>
                <li>Problemas tí©cnicos que impediram a entrega</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Quando não reembolsamos</h2>
              <ul className="flex flex-col gap-2 pl-4" style={{ listStyleType: 'disc' }}>
                <li>Após a entrega bem-sucedida do item via trade</li>
                <li>Arrependimento após uso do item no jogo</li>
                <li>Conta Roblox banida por violação das regras do jogo (independente de nossa ação)</li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Como solicitar</h2>
              <p>Entre em contato pelo chat ao vivo no site ou envie um e-mail para <strong>z7bloxsuporte@gmail.com</strong> com seu níºmero de pedido e descreva o problema. Reembolsos são processados em atí© 5 dias íºteis.</p>
            </div>
          </div>
          <div className="mt-8">
            <a href="mailto:z7bloxsuporte@gmail.com" className="btn-primary inline-flex w-fit">
              <Mail size={16} /> Solicitar Reembolso por E-mail
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
