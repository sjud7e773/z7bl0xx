'use client'

import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import type { ProductCategory } from '@/types'
import { Produto } from '@/hooks/useProdutos'
import ProductCard from './ProductCard'

interface Props {
  title: string
  icon: ReactNode
  products: Produto[]
  category: ProductCategory
}

const SCROLL_AMOUNT = 264

const categorySlug: Record<ProductCategory, string> = {
  knives: 'facas',
  guns: 'guns',
  pets: 'pets',
  bundles: 'bundles',
}

export default function ProductSection({ title, icon, products, category }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    const el = trackRef.current
    if (!el) return
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateScrollState, products])

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: dir === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }

  if (products.length === 0) {
    return (
      <section className="products-section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="section-title">
              <span>{icon}</span>
              {title}
            </h2>
          </div>
          <div
            className="flex flex-col items-center justify-center py-16 rounded-xl"
            style={{ border: '1px dashed var(--border)', color: 'var(--text-muted)' }}
          >
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Nenhum item disponí­vel
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              Novos itens chegando em breve!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="products-section">
      <div className="page-container">
        <div className="section-header">
          <h2 className="section-title">
            <span>{icon}</span>
            {title}
          </h2>

          <div className="section-actions">
            <Link
              href={`/categoria/${categorySlug[category]}`}
              className="text-sm font-medium"
              style={{ color: 'var(--accent)', fontFamily: 'Inter' }}
            >
              <span className="inline-flex items-center gap-1">Ver Todos <ArrowRight size={14} /></span>
            </Link>
            <button
              className="carousel-btn"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="carousel-btn"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="carousel-track no-scrollbar" onScroll={updateScrollState}>
          {products.map((product) => (
            <div key={product.id} className="carousel-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
