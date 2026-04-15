'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Smartphone, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCanceled, setIsCanceled] = useState(false)
  const { items, getSubtotal, robloxUsername, setRobloxUsername } = useCartStore()

  useEffect(() => {
    setMounted(true)
    const params = new URLSearchParams(window.location.search)
    setIsCanceled(params.get('canceled') === 'true')
  }, [])

  if (!mounted) return null

  const subtotal = getSubtotal()
  const processingFee = subtotal * 0.15
  const total = subtotal + processingFee

  const handleCheckout = async () => {
    const trimmedEmail = email.trim()
    const trimmedRobloxUsername = robloxUsername.trim()

    if (items.length === 0) {
      setErrorMessage('Seu carrinho está vazio.')
      return
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Informe um e-mail válido.')
      return
    }

    if (!trimmedRobloxUsername) {
      setErrorMessage('Informe o usuário do Roblox que receberá o trade.')
      return
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmedRobloxUsername)) {
      setErrorMessage('O usuário do Roblox deve ter entre 3 e 20 caracteres válidos.')
      return
    }

    if (!termsAccepted) {
      setErrorMessage('Você precisa aceitar os termos para continuar.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          email: trimmedEmail || undefined,
          robloxUsername: trimmedRobloxUsername,
          paymentMethod,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.url) {
        setErrorMessage(data.error || 'Não foi possível iniciar o checkout agora.')
        return
      }

      window.location.href = data.url as string
    } catch {
      setErrorMessage('Erro ao iniciar o pagamento. Tente novamente em instantes.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnnouncementStrip />
      <Header />
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-cabin font-bold text-[28px] md:text-[40px] text-text-primary">Finalizar compra</h1>
              <p className="font-inter text-[14px] text-text-muted">
                Confirme seus dados e siga para o pagamento seguro via Stripe.
              </p>
            </div>

            {isCanceled && (
              <div className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-[12px]">
                <AlertCircle size={18} className="text-accent-pink shrink-0 mt-0.5" />
                <p className="font-inter text-[13px] text-text-muted">
                  Seu pagamento foi cancelado. Revise os dados abaixo e tente novamente quando quiser.
                </p>
              </div>
            )}

            {items.length === 0 ? (
              <div className="bg-surface border border-border rounded-[16px] p-8 flex flex-col gap-4">
                <h2 className="font-cabin font-bold text-[20px] text-text-primary">Seu carrinho está vazio</h2>
                <p className="font-inter text-[14px] text-text-muted">
                  Adicione um item antes de ir para o checkout.
                </p>
                <Link href="/categoria/facas" className="w-full sm:w-fit bg-accent-pink text-white font-inter font-bold text-[14px] px-6 py-3 rounded-full text-center hover:bg-[#d10074] transition-colors">
                  Explorar itens
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <label className="font-inter font-bold text-[14px] text-text-primary">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-surface border border-border rounded-[10px] px-4 py-3 font-inter text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-colors"
                  />
                  <p className="font-inter text-[12px] text-text-muted">
                    Opcional. Se informado, o recibo do Stripe será enviado para este e-mail.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-inter font-bold text-[14px] text-text-primary">Usuário Roblox</label>
                  <input
                    type="text"
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value.replace(/\s+/g, ''))}
                    placeholder="seu_usuario_roblox"
                    className="w-full bg-surface border border-border rounded-[10px] px-4 py-3 font-inter text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-colors"
                    maxLength={20}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <div className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-[12px]">
                    <ShieldCheck size={18} className="text-accent-cyan shrink-0 mt-0.5" />
                    <p className="font-inter text-[12px] text-text-muted">
                      Use o username exato do Roblox. É para essa conta que o trade será enviado após o pagamento.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h2 className="font-cabin font-bold text-[18px] text-text-primary">Método de pagamento</h2>
                  <label className="flex items-center gap-4 p-4 bg-surface border-2 rounded-[12px] cursor-pointer transition-all" style={{ borderColor: paymentMethod === 'card' ? 'var(--accent-pink)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 accent-accent-pink"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <CreditCard size={24} className="text-accent-pink" />
                      <div className="flex flex-col">
                        <span className="font-inter font-bold text-[14px] text-text-primary">Cartão</span>
                        <span className="font-inter text-[12px] text-text-muted">Checkout rápido pelo Stripe</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 bg-surface border-2 rounded-[12px] cursor-pointer transition-all" style={{ borderColor: paymentMethod === 'pix' ? 'var(--accent-pink)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={() => setPaymentMethod('pix')}
                      className="w-4 h-4 accent-accent-pink"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <Smartphone size={24} className="text-accent-pink" />
                      <div className="flex flex-col">
                        <span className="font-inter font-bold text-[14px] text-text-primary">PIX</span>
                        <span className="font-inter text-[12px] text-text-muted">Pagamento instantâneo no Stripe</span>
                      </div>
                    </div>
                  </label>
                </div>

                <label className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-[10px]">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 accent-accent-pink mt-1 shrink-0"
                  />
                  <p className="font-inter text-[12px] text-text-muted">
                    Ao confirmar a compra, você concorda com nossos <Link href="/termos" className="text-accent-pink hover:underline">Termos de Uso</Link> e com a <Link href="/privacidade" className="text-accent-pink hover:underline">Política de Privacidade</Link>.
                  </p>
                </label>

                {errorMessage && (
                  <div className="flex items-start gap-3 p-4 bg-surface-elevated border border-border rounded-[12px]">
                    <AlertCircle size={18} className="text-accent-pink shrink-0 mt-0.5" />
                    <p className="font-inter text-[13px] text-text-muted">{errorMessage}</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full bg-accent-pink hover:bg-[#d10074] disabled:opacity-70 disabled:cursor-not-allowed text-white font-inter font-bold text-[15px] py-4 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isSubmitting ? 'Abrindo pagamento...' : 'Ir para pagamento seguro'}
                </button>
              </>
            )}
          </div>

          <div className="lg:w-[380px] flex flex-col gap-6">
            <div className="bg-surface border border-border rounded-[16px] p-6 flex flex-col gap-6 sticky top-32">
              <h2 className="font-cabin font-bold text-[18px] text-text-primary">Resumo do pedido</h2>

              <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between pb-3 border-b border-border last:border-b-0">
                    <div className="flex flex-col gap-1 flex-1 pr-4">
                      <span className="font-inter font-bold text-[13px] text-text-primary">{item.product.name}</span>
                      <span className="font-inter text-[12px] text-text-muted">x{item.quantity}</span>
                    </div>
                    <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-border" />

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[13px] text-text-muted">Subtotal</span>
                  <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-[13px] text-text-muted">Taxa de processamento</span>
                  <span className="font-inter font-bold text-[13px] text-text-primary">{formatPrice(processingFee)}</span>
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
