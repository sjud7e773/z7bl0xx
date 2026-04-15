'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart, Zap, Lock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductDetailActions({ product }: Props) {
  const router = useRouter()
  const { addItem, openCart } = useCartStore()
  const isSoldOut = product.stock === 0

  const handleAddToCart = () => {
    if (isSoldOut) return
    addItem(product)
    openCart()
  }

  const handleBuyNow = () => {
    if (isSoldOut) return
    addItem(product)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className="btn-secondary flex-1 justify-center"
          style={{ height: '54px', fontSize: '15px', borderRadius: '40px' }}
        >
          <ShoppingCart size={16} /> Carrinho
        </button>
        <button
          onClick={handleBuyNow}
          disabled={isSoldOut}
          className="btn-primary flex-1 justify-center"
          style={{ height: '54px', fontSize: '15px', borderRadius: '40px' }}
        >
          {isSoldOut ? 'Esgotado' : <><Zap size={16} /> Comprar Agora</>}
        </button>
      </div>
      <p
        className="text-xs text-center"
        style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}
      >
        <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Pagamento seguro via Stripe · Entrega em minutos
      </p>
    </div>
  )
}
