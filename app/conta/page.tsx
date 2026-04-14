'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import Link from 'next/link'
import { LogOut, Package, Settings, CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function ContaPage() {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'config'>('pedidos')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Redirect logic would go here if using Next.js auth hooks
    // if (!user) router.push('/login')
  }, [])

  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1000px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 bg-surface border border-border rounded-[16px] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-[#1a0535] rounded-full border-2 border-accent-pink flex items-center justify-center text-white font-cabin font-bold text-[28px] shrink-0">
                P
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <h1 className="font-cabin font-bold text-[24px] md:text-[32px] text-text-primary leading-none">PlayerX_123</h1>
                <div className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-3 py-1 rounded-full border border-accent-green/20">
                  <CheckCircle2 size={14} />
                  <span className="font-inter font-bold text-[10px] uppercase tracking-wider">Conectado via Roblox</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-surface-elevated border border-border text-text-primary px-6 py-3 rounded-full hover:bg-border transition-colors font-inter font-bold text-[14px]">
              <LogOut size={18} />
              Sair
            </button>
          </div>
          
          {/* Content Tabs */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-border w-full no-scrollbar overflow-x-auto">
              <button 
                onClick={() => setActiveTab('pedidos')}
                className={`flex items-center gap-2 font-inter font-bold text-[14px] uppercase tracking-wider pb-4 transition-colors shrink-0 ${activeTab === 'pedidos' ? 'text-accent-pink border-b-2 border-accent-pink' : 'text-text-muted'}`}
              >
                <Package size={18} />
                Meus Pedidos
              </button>
              <button 
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-2 font-inter font-bold text-[14px] uppercase tracking-wider pb-4 transition-colors shrink-0 ${activeTab === 'config' ? 'text-accent-pink border-b-2 border-accent-pink' : 'text-text-muted'}`}
              >
                <Settings size={18} />
                Configurações
              </button>
            </div>

            {/* Pedidos Tab */}
            {activeTab === 'pedidos' && (
              <div className="flex flex-col gap-4">
                
                {/* Single Order Card */}
                <div className="bg-surface border border-border rounded-[12px] p-6 flex flex-col gap-6 hover:border-text-muted transition-colors cursor-pointer">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div className="flex flex-col gap-1">
                      <span className="font-inter font-bold text-[12px] text-text-muted uppercase tracking-wider">Pedido #Z7-12345</span>
                      <span className="font-inter font-medium text-[14px] text-text-primary">13 de abril de 2026, 14:30</span>
                    </div>
                    <div className="bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-[8px] border border-accent-green/20 w-fit flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span className="font-inter font-bold text-[12px] uppercase tracking-wider">Entregue</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-between">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-4 bg-surface-elevated border border-border rounded-[8px] p-3 w-full sm:w-auto">
                        <div className="w-12 h-12 bg-[#1a0535] rounded-[4px] border border-border flex items-center justify-center">
                          <Image src="https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png" alt="item" width={48} height={48} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-inter font-bold text-[14px] text-rarity-chroma">Chroma Shark</span>
                          <span className="font-inter font-medium text-[12px] text-text-muted">1x MM2 Chroma</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start sm:items-end justify-center gap-1">
                      <span className="font-inter font-medium text-[12px] text-text-muted">Total pago</span>
                      <span className="font-cabin font-bold text-[24px] text-text-primary leading-none">R$ 45,00</span>
                    </div>
                  </div>

                </div>

                {/* Another Order Card (Processing) */}
                <div className="bg-surface border border-border rounded-[12px] p-6 flex flex-col gap-6 hover:border-text-muted transition-colors cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div className="flex flex-col gap-1">
                      <span className="font-inter font-bold text-[12px] text-text-muted uppercase tracking-wider">Pedido #Z7-12346</span>
                      <span className="font-inter font-medium text-[14px] text-text-primary">13 de abril de 2026, 17:00</span>
                    </div>
                    <div className="bg-[#ffc107]/10 text-[#ffeb99] px-3 py-1.5 rounded-[8px] border border-[#ffc107]/20 w-fit flex items-center gap-2">
                      <AlertCircle size={16} className="text-[#ffc107]" />
                      <span className="font-inter font-bold text-[12px] uppercase tracking-wider text-[#ffc107]">Em processamento</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 justify-between">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-4 bg-surface-elevated border border-border rounded-[8px] p-3 w-full sm:w-auto">
                        <div className="w-12 h-12 bg-[#1a0535] rounded-[4px] border border-border flex items-center justify-center">
                          <Image src="https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png" alt="item" width={48} height={48} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-inter font-bold text-[14px] text-rarity-godly">Godly Slasher</span>
                          <span className="font-inter font-medium text-[12px] text-text-muted">1x MM2 Godly</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end justify-center gap-1">
                      <span className="font-inter font-medium text-[12px] text-text-muted">Total pago</span>
                      <span className="font-cabin font-bold text-[24px] text-text-primary leading-none">R$ 38,00</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Configurações Tab */}
            {activeTab === 'config' && (
              <div className="flex flex-col gap-8 max-w-[500px]">
                
                <div className="flex flex-col gap-4">
                  <h2 className="font-cabin font-bold text-[20px] text-text-primary">Aparência do Site</h2>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between bg-surface-elevated border border-border p-4 rounded-[10px] cursor-pointer hover:border-text-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} className="w-4 h-4 accent-accent-pink" />
                        <span className="font-inter font-bold text-[15px] text-text-primary">Tema Escuro</span>
                      </div>
                      <span className="font-inter text-[13px] text-text-muted bg-surface px-2 py-1 rounded">Recomendado</span>
                    </label>
                    <label className="flex items-center justify-between bg-surface-elevated border border-border p-4 rounded-[10px] cursor-pointer hover:border-text-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} className="w-4 h-4 accent-accent-pink" />
                        <span className="font-inter font-bold text-[15px] text-text-primary">Tema Claro</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h2 className="font-cabin font-bold text-[20px] text-text-primary">Idioma</h2>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between bg-surface-elevated border border-border p-4 rounded-[10px] cursor-pointer hover:border-text-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="lang" value="pt" defaultChecked className="w-4 h-4 accent-accent-pink" />
                        <span className="font-inter font-bold text-[15px] text-text-primary">Português (BR)</span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between bg-surface-elevated border border-border p-4 rounded-[10px] cursor-pointer hover:border-text-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="lang" value="en" className="w-4 h-4 accent-accent-pink" />
                        <span className="font-inter font-bold text-[15px] text-text-primary">English</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="w-full h-px bg-border my-2" />
                
                <button className="w-fit text-accent-red font-inter font-bold text-[15px] hover:underline transition-all">
                  Excluir minha conta e dados
                </button>

              </div>
            )}
            
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
