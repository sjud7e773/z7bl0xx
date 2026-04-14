'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, Zap } from 'lucide-react'
import { formatPrice, calcSavings } from '@/lib/utils'
import type { Produto } from '@/hooks/useProdutos'

interface Props {
  product: Produto
}

export default function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCartStore()

  const precoSeguro = product?.precoFinalBRL ?? product?.precoBRL ?? 0
  const precoOriginalSeguro = product?.precoOriginalUSD
    ? (product.precoOriginalUSD * 5.0 * 1.5)
    : precoSeguro * 1.2
  const economiaBRL = precoOriginalSeguro > 0 && precoOriginalSeguro > precoSeguro
    ? calcSavings(precoSeguro, precoOriginalSeguro)
    : 0

  const isSoldOut = !product.disponivel
  const imagemSegura = product.imagem || 'https://i.ibb.co/f36xqgk/z7blox-logo.png'

  const handleAddToCart = () => {
    if (isSoldOut) return
    addItem({
      id: product.id,
      name: product.nomeTraducido || product.nome,
      slug: product.id,
      category: product.categoria as 'knives' | 'guns' | 'pets' | 'bundles',
      price: precoSeguro,
      original_price: precoOriginalSeguro,
      stock: product.disponivel ? 100 : 0,
      description: product.descricaoTraduzida || product.descricao || '',
      image_url: imagemSegura,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    openCart()
  }

  const handleBuyNow = () => {
    if (isSoldOut) return
    addItem({
      id: product.id,
      name: product.nomeTraducido || product.nome,
      slug: product.id,
      category: product.categoria as 'knives' | 'guns' | 'pets' | 'bundles',
      price: precoSeguro,
      original_price: precoOriginalSeguro,
      stock: product.disponivel ? 100 : 0,
      description: product.descricaoTraduzida || product.descricao || '',
      image_url: imagemSegura,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    openCart()
  }

  return (
    <article className="product-card">
      {/* Image wrapper */}
      <Link href={`/produto/${product.id}`} className="block" style={{ textDecoration: 'none' }}>
      <div className="card-img-wrap">
        {economiaBRL > 0 && (
          <span className="badge-save">
            ECONOMIZE {formatPrice(economiaBRL)}
          </span>
        )}

        {isSoldOut && (
          <div className="card-sold-overlay">
            <span>Esgotado</span>
          </div>
        )}

        <div className="relative w-full aspect-square rounded-xl overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)' }}>
          <Image
            src={imagemSegura}
            alt={product.nomeTraducido || product.nome}
            width={500}
            height={300}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
            style={{ mixBlendMode: 'multiply' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://i.ibb.co/f36xqgk/z7blox-logo.png'
            }}
          />
        </div>
      </div>
      </Link>

      {/* Info */}
      <div className="card-body">
        <Link href={`/produto/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="card-name" title={product.nomeTraducido || product.nome}>
            {product.nomeTraducido || product.nome}
          </h3>
        </Link>
        <div className="card-pricing">
          <span className="card-price-current">{formatPrice(precoSeguro)}</span>
          {precoOriginalSeguro > precoSeguro && (
            <span className="card-price-original">{formatPrice(precoOriginalSeguro)}</span>
          )}
        </div>
        <div className="card-actions">
          <button
            className="btn-cart-small"
            onClick={handleAddToCart}
            disabled={isSoldOut}
          >
            <ShoppingCart size={12} /> Carrinho
          </button>
          <button
            className="btn-buy-small"
            onClick={handleBuyNow}
            disabled={isSoldOut}
          >
            <Zap size={12} /> Comprar
          </button>
        </div>
      </div>
    </article>
  )
}
