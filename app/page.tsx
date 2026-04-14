import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">
          <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-12 md:py-24">
            
            {/* Left Col */}
            <div className="flex flex-col gap-6 md:gap-8 max-w-[580px]">
              <h1 className="font-cabin font-bold text-text-primary text-[clamp(52px,6vw,80px)] leading-[1.05] tracking-tight">
                Os melhores itens de MM2, entregues na hora.
              </h1>
              <p className="font-inter font-medium text-text-muted text-[18px] leading-relaxed">
                Facas, armas e pets raros com pagamento seguro e entrega automatica direto no Roblox.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <Link href="#produtos" className="w-full sm:w-auto bg-accent-pink hover:bg-[#d10074] text-white font-inter font-bold text-[15px] px-8 py-4 rounded-full text-center transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Explorar Itens
                </Link>
                <Link href="/como-usar" className="w-full sm:w-auto bg-transparent border border-white text-white hover:bg-white/10 font-inter font-bold text-[15px] px-8 py-4 rounded-full text-center transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Como Funciona
                </Link>
              </div>
            </div>

            {/* Right Col */}
            <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
              {/* Particle animation placeholder */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(204,0,0,0.15) 0%, transparent 60%)' }} />
              
              {/* Floating element */}
              <div className="relative z-10 flex items-center justify-center animate-pulse" style={{ animation: 'float 4s ease-in-out infinite alternate' }}>
                <span className="font-cabin font-black text-[#cc0000] text-[280px] md:text-[380px] leading-none select-none tracking-tighter drop-shadow-2xl">
                  2
                </span>
                <div className="absolute inset-0 flex items-center justify-center -rotate-12 scale-[1.3] md:scale-[1.5]">
                  <Image src="https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png" alt="MM2" width={300} height={400} className="w-full max-w-[300px] md:max-w-[400px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </div>
            
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes float {
              0% { transform: translateY(-8px); }
              100% { transform: translateY(8px); }
            }
          `}} />
        </section>

        {/* PURCHASE WARNING BANNER */}
        <section className="w-full bg-background px-6 pb-12">
          <div className="max-w-[1000px] mx-auto bg-[#2a2000] border border-[#5c4a00] rounded-[10px] p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-[#ffc107] flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <p className="font-inter font-medium text-[14px] md:text-[15px] text-[#ffeb99] leading-snug">
              <strong className="text-[#ffe066] font-bold mr-1">Antes de comprar:</strong> 
              Para receber itens via trade no Roblox, sua conta precisa ter <strong className="text-[#ffe066] font-bold">nivel minimo 10</strong> no Murder Mystery 2. Certifique-se de atender esse requisito antes de finalizar sua compra.
            </p>
          </div>
        </section>

        {/* CAROUSELS PLACEHOLDER */}
        <section id="produtos" className="w-full px-6 py-12 md:py-24 bg-background flex flex-col gap-24">
          
          {/* Facas */}
          <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-inter font-bold text-[12px] text-text-muted uppercase tracking-widest">Facas</span>
                <h2 className="font-cabin font-bold text-[24px] text-text-primary">Os mais buscados do jogo.</h2>
              </div>
              <Link href="/facas" className="font-inter font-bold text-accent-pink text-[14px] hover:text-white transition-colors">Ver Tudo &rarr;</Link>
            </div>
            
            <div className="w-full overflow-x-auto pb-8 no-scrollbar flex gap-4 snap-x">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="min-w-[260px] md:min-w-[280px] w-[260px] md:w-[280px] snap-center shrink-0 bg-surface border border-border rounded-[12px] p-4 flex flex-col gap-4 group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300">
                  <div className="w-full aspect-square bg-[#1a0535] rounded-[8px] relative overflow-hidden flex items-center justify-center">
                    <span className="absolute top-2 left-2 bg-[#ff1493] text-white font-cabin font-bold text-[11px] uppercase tracking-wider px-2 py-1 rounded-full z-10">Godly</span>
                    <Image src="https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png" alt="Product" width={200} height={200} className="w-2/3 h-2/3 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-inter font-bold text-[15px] text-[#ff1493] truncate">Chroma Slasher</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-inter font-bold text-[13px] text-white">R$ 35,90</span>
                      <span className="font-inter font-medium text-[13px] text-text-muted line-through">R$ 50,00</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button className="w-full bg-transparent border border-border text-white font-inter font-bold text-[12px] py-2.5 rounded-full hover:bg-surface-elevated transition-colors">Carrinho</button>
                    <button className="w-full bg-accent-pink text-white font-inter font-bold text-[12px] py-2.5 rounded-full hover:bg-[#d10074] transition-colors">Comprar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </section>

      </main>

      <Footer />
    </>
  )
}
