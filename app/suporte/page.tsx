import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import Link from 'next/link'
import { MessageSquare, Mail, Plus } from 'lucide-react'

export default function SuportePage() {
  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1000px] w-full mx-auto px-6 md:px-12 flex flex-col gap-16">
          
          {/* Header */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h1 className="font-cabin font-bold text-[36px] md:text-[48px] text-text-primary leading-none">
              Suporte
            </h1>
            <p className="font-inter font-medium text-[16px] text-text-muted max-w-[600px] mx-auto md:mx-0">
              Estamos disponíveis para ajudar. Escolha o melhor canal de atendimento para sua necessidade.
            </p>
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chat Card */}
            <div className="bg-surface-elevated border border-border rounded-[16px] p-8 flex flex-col gap-6 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border border-border">
                <MessageSquare className="text-accent-pink" size={32} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-cabin font-bold text-[28px] text-text-primary">Chat ao Vivo</h3>
                <p className="font-inter text-[15px] text-text-muted leading-relaxed">
                  Resposta rápida pelo chat do site. Ideal para dúvidas sobre compras e entregas.
                </p>
              </div>
              <button className="mt-auto bg-white text-black font-inter font-bold text-[15px] px-8 py-4 rounded-full hover:bg-gray-100 transition-colors w-full md:w-fit text-center">
                Abrir chat
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-surface-elevated border border-border rounded-[16px] p-8 flex flex-col gap-6 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border border-border">
                <Mail className="text-accent-cyan" size={32} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-cabin font-bold text-[28px] text-text-primary">E-mail</h3>
                <p className="font-inter text-[15px] text-text-muted leading-relaxed">
                  z7bloxsuporte@gmail.com
                </p>
                <p className="font-inter text-[14px] text-text-muted opacity-80 mt-1">
                  Para suporte mais detalhado ou registros de reembolso. Respondemos em até 24h úteis.
                </p>
              </div>
              <a href="mailto:z7bloxsuporte@gmail.com" className="mt-auto bg-transparent border border-border text-white font-inter font-bold text-[15px] px-8 py-4 rounded-full hover:bg-surface transition-colors w-full md:w-fit text-center">
                Enviar e-mail
              </a>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-8 pt-16 border-t border-border flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="font-cabin font-bold text-[28px] text-text-primary">Dúvidas rápidas</h2>
              <Link href="/faq" className="hidden md:block font-inter font-bold text-[14px] text-accent-pink hover:underline">
                Ver todas as dúvidas &rarr;
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { q: 'O processo de entrega é seguro?', a: 'Sim. A entrega é feita automaticamente via sistema de trade do próprio Roblox, sem risco de banimentos.' },
                { q: 'Quanto tempo demora para eu receber meu item?', a: 'Na maioria das vezes o envio é automático e ocorre em poucos minutos após o pagamento.' },
                { q: 'Quais métodos de pagamento são aceitos?', a: 'Aceitamos Pix (aprovação imediata), Cartão de Crédito e Débito.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-elevated border border-border rounded-[12px] p-6 flex items-center justify-between cursor-pointer hover:border-text-muted transition-colors">
                  <span className="font-cabin font-bold text-[18px] text-text-primary">{item.q}</span>
                  <Plus className="text-text-muted ml-4 shrink-0" size={20} />
                </div>
              ))}
            </div>
            
            <Link href="/faq" className="md:hidden font-inter font-bold text-[14px] text-center text-accent-pink hover:underline mt-4">
              Ver todas as dúvidas &rarr;
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
