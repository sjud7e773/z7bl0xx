'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Search, AlertCircle, ShieldCheck } from 'lucide-react'

interface RobloxUser {
  username: string;
  avatarUrl: string;
}

export default function PedidoConfirmarPage() {
  const [username, setUsername] = useState('')
  const [searchedUser, setSearchedUser] = useState<RobloxUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleSearch = () => {
    if (!username) return
    setIsLoading(true)
    setTimeout(() => {
      setSearchedUser({ username, avatarUrl: 'https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png' })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-accent-green/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[500px] bg-surface border border-border rounded-[16px] p-8 md:p-10 flex flex-col items-center gap-8 shadow-2xl relative z-10">
        
        {/* Animated Checkmark */}
        <div className="w-20 h-20 bg-accent-green/10 border border-accent-green/20 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-accent-green animate-[dash_0.8s_ease-in-out_forwards]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
            100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
          }
        `}} />

        <div className="flex flex-col gap-2 text-center w-full">
          <h1 className="font-cabin font-bold text-[28px] text-text-primary">
            Pagamento confirmado!
          </h1>
          <p className="font-inter font-medium text-[15px] text-text-muted">
            {isConfirmed 
              ? 'Perfeito. Seus itens serão enviados em breve. Fique online no Roblox para receber o trade.'
              : 'Agora informe qual conta Roblox vai receber os itens.'}
          </p>
        </div>

        {!isConfirmed && (
          <div className="w-full flex flex-col gap-6">
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário no Roblox"
                className="bg-surface-elevated border border-border rounded-[10px] px-4 py-3 flex-1 font-inter text-[15px] text-text-primary outline-none focus:border-accent-pink transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                disabled={isLoading || !username}
                className="bg-surface-elevated border border-border hover:bg-border text-text-primary px-4 py-3 rounded-[10px] flex items-center justify-center transition-colors disabled:opacity-50"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-text-muted border-t-text-primary rounded-full animate-spin" /> : <Search size={20} />}
              </button>
            </div>

            {searchedUser && (
              <div className="bg-surface-elevated border border-accent-green/30 rounded-[12px] p-4 flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-background border border-border rounded-full overflow-hidden shrink-0">
                      {/* Avatar placeholder */}
                      <div className="w-full h-full bg-surface-elevated flex items-center justify-center text-text-primary font-cabin font-bold text-xl">
                        {searchedUser.username.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-inter font-bold text-[16px] text-text-primary truncate max-w-[150px]">{searchedUser.username}</span>
                      <div className="flex items-center gap-1 mt-1 text-accent-green">
                        <Check size={14} />
                        <span className="font-inter font-bold text-[11px] uppercase tracking-wider">Usuário encontrado</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsConfirmed(true)}
                  className="w-full bg-accent-pink text-white font-inter font-bold text-[15px] py-4 rounded-full hover:bg-[#d10074] transition-colors"
                >
                  Confirmar esta conta
                </button>
              </div>
            )}
          </div>
        )}

        {/* Warning Card */}
        <div className="w-full bg-[#2a2000] border border-[#5c4a00] rounded-[10px] p-4 flex items-start gap-3 mt-2">
          <AlertCircle className="text-[#ffc107] shrink-0" size={20} />
          <p className="font-inter font-medium text-[13px] text-[#ffeb99] leading-snug">
            Certifique-se de que seu trade está habilitado nas configurações de privacidade do Roblox e que você está com <strong className="text-[#ffe066] font-bold">nível 10+</strong> no Murder Mystery 2.
          </p>
        </div>

        {isConfirmed && (
          <Link href="/conta" className="font-inter font-bold text-[14px] text-text-muted hover:text-white transition-colors mt-2">
            Acompanhar pedido no Perfil &rarr;
          </Link>
        )}

      </div>
    </div>
  )
}
