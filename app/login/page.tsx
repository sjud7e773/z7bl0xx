import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <nav className="w-full flex items-center justify-between px-6 py-8 md:px-12 relative z-50">
        <Link href="/" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span className="font-inter text-sm font-bold tracking-wider uppercase">Voltar</span>
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 relative z-10 py-12">
        <div className="w-full max-w-[900px] bg-surface rounded-[16px] border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 md:gap-16 shadow-2xl relative overflow-hidden">
          
          {/* subtle glow behind card */}
          <div className="absolute top-0 right-0 w-full h-full bg-accent-pink/5 blur-[100px] pointer-events-none" />

          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 relative z-10">
            <Link href="/" className="font-cabin text-3xl font-bold text-text-primary tracking-tight">
              Z7Blox
            </Link>
            <div className="flex flex-col gap-4">
              <h1 className="font-cabin font-bold text-[32px] text-text-primary leading-tight">
                Acesse sua conta para continuar
              </h1>
              <p className="font-inter font-medium text-[15px] text-text-muted leading-relaxed">
                O login é feito de forma segura pelo Roblox. Nunca pedimos sua senha.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 relative z-10">
            
            {/* Security Pills */}
            <div className="flex flex-col gap-3">
              <div className="bg-surface-elevated border border-border rounded-full px-4 py-2.5 flex items-center gap-3 w-fit">
                <svg className="text-text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span className="font-inter font-bold text-[12px] text-text-primary uppercase tracking-widest">SEM SENHA</span>
              </div>
              <div className="bg-surface-elevated border border-border rounded-full px-4 py-2.5 flex items-center gap-3 w-fit">
                <svg className="text-text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                <span className="font-inter font-bold text-[12px] text-text-primary uppercase tracking-widest">100% SEGURO</span>
              </div>
              <div className="bg-surface-elevated border border-border rounded-full px-4 py-2.5 flex items-center gap-3 w-fit">
                <svg className="text-text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span className="font-inter font-bold text-[12px] text-text-primary uppercase tracking-widest">AUTORIZADO PELO ROBLOX</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button className="w-full bg-white text-black font-inter font-bold text-[15px] h-[52px] rounded-[12px] flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                Entrar com Roblox
              </button>
              <button className="w-full bg-transparent border border-border text-text-primary font-inter font-bold text-[15px] h-[52px] rounded-[12px] flex items-center justify-center gap-3 hover:bg-surface-elevated transition-colors">
                Criar conta com Roblox
              </button>
              
              <Link href="/suporte" className="font-inter font-medium text-[13px] text-text-muted hover:text-accent-pink text-center mt-2 transition-colors">
                Problemas ao entrar? Fale com o suporte
              </Link>
            </div>

            <p className="font-inter font-medium text-[12px] text-text-muted text-center mt-4">
              Ao continuar, você concorda com nossos <Link href="/termos" className="hover:text-text-primary underline">Termos de Uso</Link> e <Link href="/privacidade" className="hover:text-text-primary underline">Política de Privacidade</Link>.
            </p>

          </div>

        </div>
      </main>

      <footer className="w-full py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 z-50">
        <div className="flex items-center gap-4 font-inter text-[12px] font-bold tracking-widest text-text-muted uppercase">
          <Link href="/termos" className="hover:text-text-primary transition-colors">Termos</Link>
          <span>·</span>
          <Link href="/privacidade" className="hover:text-text-primary transition-colors">Privacidade</Link>
          <span>·</span>
          <Link href="/seguranca" className="hover:text-text-primary transition-colors">Segurança</Link>
        </div>
        <p className="font-inter text-[12px] font-bold tracking-widest text-text-muted uppercase">
          © 2026 Z7Blox
        </p>
      </footer>
    </div>
  )
}
