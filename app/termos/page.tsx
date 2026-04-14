import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'

export default function TermosPage() {
  return (
    <div>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-16">
          
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-[240px] shrink-0 sticky top-[100px] h-fit gap-2">
            <h2 className="font-cabin font-bold text-text-primary text-[18px] mb-4">Sumário</h2>
            {[
              '1. Sobre a Z7Blox',
              '2. Uso da Plataforma',
              '3. Processo de Compra',
              '4. Requisitos de Recebimento',
              '5. Entrega',
              '6. Reembolso',
              '7. Responsabilidades',
              '8. Itens Virtuais',
              '9. Coleta de Dados e Publicidade',
              '10. Cookies',
              '11. Contato'
            ].map((s, i) => (
              <a 
                key={i} 
                href={`#section-${i+1}`} 
                className="font-inter font-medium text-[13px] hover:text-white transition-colors pl-3 py-1 border-l-2"
              >
                {s}
              </a>
            ))}
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-12 max-w-[800px] flex-1">
            <div className="flex flex-col gap-4">
              <h1 className="font-cabin font-bold text-[36px] md:text-[48px] text-text-primary leading-none">Termos de Uso</h1>
              <p className="font-inter font-medium text-[14px] text-text-muted">Atualizado em abril de 2026.</p>
            </div>

            <div className="flex flex-col gap-12 font-inter text-[15px] text-text-muted leading-[1.8]">
              
              <section id="section-1" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">1. Sobre a Z7Blox</h3>
                <p>1.1 A Z7Blox é uma plataforma de venda de itens virtuais do jogo Murder Mystery 2, disponível na plataforma Roblox.</p>
                <p>1.2 Operamos de forma independente e não temos nenhuma afiliação com a Roblox Corporation ou os criadores do Murder Mystery 2.</p>
                <p>1.3 Ao usar este site, você concorda com todos os termos abaixo.</p>
              </section>

              <section id="section-2" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">2. Uso da Plataforma</h3>
                <p>2.1 Para comprar na Z7Blox, você deve ter capacidade legal para celebrar contratos no seu país.</p>
                <p>2.2 É proibido usar a plataforma para fraudes, chargebacks indevidos ou qualquer prática desonesta.</p>
                <p>2.3 Chargebacks após recebimento confirmado podem resultar em bloqueio permanente e ser reportados como fraude.</p>
                <p>2.4 A Z7Blox pode recusar pedidos suspeitos a qualquer momento.</p>
              </section>

              <section id="section-3" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">3. Processo de Compra</h3>
                <p>3.1 Ao finalizar o pedido, você concorda com o preço exibido no checkout.</p>
                <p>3.2 Os preços podem mudar sem aviso. O preço válido é sempre o do momento da compra.</p>
                <p>3.3 Após o pagamento, você informa o usuário da conta Roblox que receberá o item.</p>
              </section>

              <section id="section-4" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">4. Requisitos de Recebimento</h3>
                <p>4.1 Para receber itens via trade no Murder Mystery 2, sua conta no jogo precisa ter nível mínimo 10.</p>
                <p>4.2 Sua conta Roblox precisa estar com a funcionalidade de trade habilitada nas configurações de privacidade.</p>
                <p>4.3 A Z7Blox não se responsabiliza pela não entrega causada por conta do comprador não atender esses requisitos.</p>
              </section>

              <section id="section-5" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">5. Entrega</h3>
                <p>5.1 A entrega é feita automaticamente via trade no Roblox após a confirmação do pagamento.</p>
                <p>5.2 Em caso de falha técnica, nossa equipe faz a entrega manualmente.</p>
                <p>5.3 O usuário informado deve ser exatamente o da conta que receberá o item. Não realizamos reenvios para outro usuário após o início da entrega.</p>
              </section>

              <section id="section-6" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">6. Reembolso</h3>
                <p>6.1 O reembolso é garantido apenas quando não conseguimos entregar o item por falha nossa.</p>
                <p>6.2 Após a entrega confirmada na conta informada, a compra está finalizada e não é reembolsável.</p>
                <p>6.3 Não realizamos reembolsos por: usuário errado informado pelo comprador, trade recusado pelo comprador, conta sem requisitos mínimos.</p>
                <p>6.4 Para solicitar reembolso, entre em contato pelo chat ou <a href="mailto:z7bloxsuporte@gmail.com" className="text-accent-pink hover:underline">z7bloxsuporte@gmail.com</a> com o número do pedido.</p>
                <p>6.5 Respondemos em até 72 horas úteis.</p>
              </section>

              <section id="section-7" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">7. Responsabilidades</h3>
                <p>7.1 A Z7Blox é responsável por garantir a entrega do item adquirido dentro das condições descritas.</p>
                <p>7.2 Não somos responsáveis por: perda após entrega, banimentos da Roblox na conta do comprador, mudanças no jogo.</p>
              </section>

              <section id="section-8" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">8. Itens Virtuais</h3>
                <p>8.1 Os itens são bens virtuais do MM2 sem valor monetário fora do Roblox.</p>
                <p>8.2 Não garantimos permanência ou disponibilidade futura de nenhum item.</p>
              </section>

              <section id="section-9" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">9. Coleta de Dados e Publicidade</h3>
                <p>9.1 Podemos coletar dados de navegação anônimos para melhorar o site e veicular anúncios da Z7Blox em Google e Meta.</p>
                <p>9.2 Nunca vendemos dados pessoais identificáveis a terceiros.</p>
                <p>9.3 Dados fornecidos na compra são usados apenas para processar o pedido e oferecer suporte.</p>
              </section>

              <section id="section-10" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">10. Cookies</h3>
                <p>10.1 Usamos cookies essenciais (tema, idioma, carrinho, sessão), de análise anônima e de publicidade.</p>
                <p>10.2 Continuar usando o site implica aceitar esses cookies.</p>
              </section>

              <section id="section-11" className="flex flex-col gap-4">
                <h3 className="font-cabin font-bold text-[24px] text-text-primary">11. Contato</h3>
                <p>11.1 <a href="mailto:z7bloxsuporte@gmail.com" className="text-accent-pink hover:underline">z7bloxsuporte@gmail.com</a> — respondemos em até 48 horas úteis.</p>
                <p>11.2 Chat ao vivo disponível no site.</p>
              </section>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
