import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

export const metadata: Metadata = {
  title: 'Polí­tica de Privacidade | z7Blox',
  description: 'Polí­tica de privacidade da z7Blox. Saiba como coletamos, usamos e protegemos seus dados.',
}

export default function PrivacidadePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-16 max-w-3xl mx-auto">
          <h1 className="font-black text-4xl mb-6" style={{ fontFamily: 'Inter', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            Polí­tica de Privacidade
          </h1>
          <div className="flex flex-col gap-6" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.7' }}>
            <p>Sua privacidade í© importante para nós. Esta polí­tica descreve como coletamos e usamos seus dados.</p>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Dados coletados</h2>
              <p>Coletamos apenas as informaçíµes necessí¡rias para processar seu pedido: e-mail, nome de usuí¡rio do Roblox e dados de pagamento (processados com segurança pelo Stripe â€” nunca armazenamos dados de cartão).</p>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Uso dos dados</h2>
              <p>Seus dados são usados exclusivamente para processar e entregar seu pedido. Não vendemos ou compartilhamos seus dados com terceiros.</p>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Cookies</h2>
              <p>Usamos cookies essenciais para manter o estado do carrinho e preferíªncias do usuí¡rio. Não usamos cookies de rastreamento de terceiros.</p>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Contato</h2>
              <p>Díºvidas sobre privacidade? Entre em contato pelo chat ao vivo no site ou pelo e-mail <strong>z7bloxsuporte@gmail.com</strong>.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
