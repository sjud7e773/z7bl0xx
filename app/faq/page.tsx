'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import { ChevronDown, MessageCircle, Mail } from 'lucide-react'

function AccordionItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="bg-surface-elevated border border-border rounded-[12px] overflow-hidden transition-colors hover:border-text-muted">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-inter font-bold text-[15px] text-text-primary">{q}</span>
        <ChevronDown size={20} className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-border">
          <p className="font-inter text-[14px] text-text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const faqs = [
    {
      category: 'Compras',
      items: [
        { q: 'Como faço para comprar um item?', a: 'Navegue até a categoria desejada, selecione o item e clique em "Adicionar ao Carrinho". Depois vá para o checkout para finalizar a compra.' },
        { q: 'Quais são os métodos de pagamento?', a: 'Aceitamos cartão de crédito, débito e transferência bancária. Todos os pagamentos são processados de forma segura.' },
        { q: 'Qual é o tempo de entrega?', a: 'Os itens são entregues em até 24 horas após a confirmação do pagamento.' },
      ]
    },
    {
      category: 'Conta',
      items: [
        { q: 'Como faço login?', a: 'Clique em "Login" no header e use seu email para receber um link de acesso mágico.' },
        { q: 'Posso alterar meus dados?', a: 'Sim, você pode editar seus dados na página de perfil após fazer login.' },
        { q: 'Como faço para excluir minha conta?', a: 'Vá para Configurações na página de perfil e clique em "Excluir minha conta e dados".' },
      ]
    },
    {
      category: 'Itens',
      items: [
        { q: 'Os itens são originais?', a: 'Todos os nossos itens são 100% originais e verificados.' },
        { q: 'Posso devolver um item?', a: 'Sim, você tem 7 dias para devolver um item após a entrega.' },
        { q: 'Como verifico a autenticidade?', a: 'Cada item vem com um certificado de autenticidade e um código de verificação único.' },
      ]
    },
  ]

  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[900px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col gap-3 text-center">
            <h1 className="font-cabin font-bold text-[32px] md:text-[48px] text-text-primary leading-none">Perguntas Frequentes</h1>
            <p className="font-inter text-[14px] md:text-[16px] text-text-muted">Encontre respostas para as dúvidas mais comuns</p>
          </div>

          {/* FAQs */}
          <div className="flex flex-col gap-12">
            {faqs.map((section) => (
              <div key={section.category} className="flex flex-col gap-4">
                <h2 className="font-cabin font-bold text-[20px] text-text-primary">{section.category}</h2>
                <div className="flex flex-col gap-3">
                  {section.items.map((item, i) => (
                    <AccordionItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-surface border border-border rounded-[16px] p-8 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-accent-pink/10 rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-accent-pink" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-cabin font-bold text-[18px] text-text-primary">Chat ao Vivo</h3>
                <p className="font-inter text-[14px] text-text-muted">Fale com nosso time em tempo real</p>
              </div>
              <button className="mt-2 font-inter font-bold text-[14px] text-accent-pink hover:text-white transition-colors">
                Iniciar Chat
              </button>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-8 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-accent-pink/10 rounded-full flex items-center justify-center">
                <Mail size={24} className="text-accent-pink" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-cabin font-bold text-[18px] text-text-primary">Email</h3>
                <p className="font-inter text-[14px] text-text-muted">suporte@z7blox.com</p>
              </div>
              <button className="mt-2 font-inter font-bold text-[14px] text-accent-pink hover:text-white transition-colors">
                Enviar Email
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
