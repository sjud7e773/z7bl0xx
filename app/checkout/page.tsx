'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [robloxUsername, setRobloxUsername] = useState('')
  const { items, getSubtotal } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = getSubtotal()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="font-inter font-bold text-[14px] text-text-primary">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-surface border border-border rounded-[10px] px-4 py-3 font-inter text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-colors"
              />
            </div>

            {/* Roblox Username */}
            <div className="flex flex-col gap-3">
              <label className="font-inter font-bold text-[14px] text-text-primary">Usuário Roblox</label>
              <input 
                type="text"
                value={robloxUsername}
                onChange={(e) => setRobloxUsername(e.target.value)}
                placeholder="seu_usuario_roblox"
                className="w-full bg-surface border border-border rounded-[10px] px-4 py-3 font-inter text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-colors"
              />
              <p className="font-inter text-[12px] text-text-muted">Os itens serão entregues para este usuário</p>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-4">
              <h2 className="font-cabin font-bold text-[18px] text-text-primary">Método de Pagamento</h2>
              
              <label className="flex items-center gap-4 p-4 bg-surface border-2 rounded-[12px] cursor-pointer transition-all" style={{ borderColor: paymentMethod === 'card' ? 'var(--accent-pink)' : 'var(--border)' }}>
                <input 
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-accent-pink"
                />
                <div className="flex items-center gap-3 flex-1">
                  <CreditCard size={24} className="text-accent-pink" />
                  <div className="flex flex-col">
                    <span className="font-inter font-bold text-[14px] text-text-primary">Cartão de Crédito/Débito</span>
                    <span className="font-inter text-[12px] text-text-muted">Visa, Mastercard, Elo</span>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-4 p-4 bg-surface border-2 rounded-[12px] cursor-pointer transition-all" style={{ borderColor: paymentMethod === 'pix' ? 'var(--accent-pink)' : 'var(--border)' }}>
                <input 
                  type="radio"
                  name="payment"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-accent-pink"
                />
                <div className="flex items-center gap-3 flex-1">
                  <Smartphone size={24} className="text-accent-pink" />
                  <div className="flex flex-col">
                    <span className="font-inter font-bold text-[14px] text-text-primary">PIX</span>
                    <span className="font-inter text-[12px] text-text-muted">Transferência instantânea</span>
                  </div>
                </div>
              </label>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-[10px]">
              <input type="checkbox" className="w-4 h-4 accent-accent-pink mt-1 shrink-0" />
              <p className="font-inter text-[12px] text-text-muted">
                Ao confirmar a compra, você concorda com nossos <Link href="/termos" className="text-accent-pink hover:underline">Termos de Uso</Link> e <Link href="/termos" className="text-accent-pink hover:underline">Política de Privacidade</Link>
              </p>
            </div>

            {/* Confirm Button */}
            <button className="w-full bg-accent-pink hover:bg-[#d10074] text-white font-inter font-bold text-[15px] py-4 rounded-full transition-colors">
              Confirmar Compra
            </button>

          </div>

          {/* Order Summary */}
          <div className="lg:w-[350px] flex flex-col gap-6">
            <div className="bg-surface border border-border rounded-[16px] p-6 flex flex-col gap-6 sticky top-32">
              
              <h2 className="font-cabin font-bold text-[18px] text-text-primary">Resumo do Pedido</h2>

              {/* Items */}
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0">
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="font-inter font-bold text-[13px] text-text-primary">{item.product.name}</span>
                      <span className="font-inter text-[12px] text-text-muted">x{item.quantity}</span>
                    </div>
                    <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-border" />

              {/* Totals */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[13px] text-text-muted">Subtotal</span>
                  <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[13px] text-text-muted">Impostos (8%)</span>
                  <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div className="flex items-center justify-between">
                <span className="font-cabin font-bold text-[16px] text-text-primary">Total</span>
                <span className="font-cabin font-bold text-[24px] text-accent-pink">{formatPrice(total)}</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
