import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border pt-12 pb-24 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="font-cabin text-2xl font-bold text-text-primary tracking-tight">
              Z7Blox
            </Link>
            <p className="font-inter text-text-muted text-sm leading-relaxed max-w-[280px]">
              Itens raros de Murder Mystery 2 com entrega automática no Roblox.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-surface-elevated border border-border rounded-full px-4 py-2 text-sm text-text-primary outline-none focus:border-accent-pink transition-colors w-full max-w-[200px]"
              />
              <button className="bg-text-primary text-background font-inter font-bold px-4 py-2 rounded-full text-sm hover:bg-accent-pink hover:text-white transition-colors">
                Assinar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-inter font-bold text-text-primary text-sm uppercase tracking-widest">Explorar</h4>
            <div className="flex flex-col gap-3">
              {['Facas', 'Armas', 'Pets', 'Sets'].map(item => (
                <Link key={item} href={`/ ${item.toLowerCase()}`} className="font-inter text-sm text-text-muted hover:text-accent-pink transition-colors w-fit">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-inter font-bold text-text-primary text-sm uppercase tracking-widest">Empresa</h4>
            <div className="flex flex-col gap-3">
              {['Como Usar', 'FAQ', 'Suporte', 'Termos de Uso', 'Privacidade', 'Reembolso'].map(item => (
                <Link key={item} href={`/ ${item.toLowerCase()} `} className="font-inter text-sm text-text-muted hover:text-accent-pink transition-colors w-fit">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-inter font-bold text-text-primary text-sm uppercase tracking-widest">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:z7bloxsuporte@gmail.com" className="font-inter text-sm text-text-muted hover:text-accent-pink transition-colors w-fit">
                z7bloxsuporte@gmail.com
              </a>
              <Link href="/suporte" className="font-inter text-sm font-bold text-accent-cyan hover:text-accent-pink transition-colors w-fit">
                Chat ao Vivo
              </Link>
              <a href="#" className="font-inter text-sm text-text-muted hover:text-accent-pink transition-colors w-fit flex items-center gap-2">
                TikTok
              </a>
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-border mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-inter text-xs text-text-muted text-center md:text-left">
            2026 Z7Blox. Todos os direitos reservados.{' '}
            <span className="hidden md:inline">
              · <Link href="/termos" className="hover:text-accent-pink transition-colors">Termos</Link> · <Link href="/privacidade" className="hover:text-accent-pink transition-colors">Privacidade</Link> · <Link href="/reembolso" className="hover:text-accent-pink transition-colors">Reembolso</Link>
            </span>
          </p>

          <div className="flex items-center gap-3">
            {['Pix', 'Visa', 'Mastercard', 'Amex', 'GPay'].map(brand => (
              <div key={brand} className="bg-surface-elevated border border-border px-3 py-1 rounded-md flex items-center justify-center">
                <span className="font-inter text-[10px] font-bold text-text-muted uppercase tracking-wider">{brand}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
