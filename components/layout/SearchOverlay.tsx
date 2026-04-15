'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { X, Search, Loader2, Sword, Crosshair, PawPrint, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { categoryLinks, getProductHref } from '@/lib/navigation'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  onClose: () => void
}

export default function SearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useBodyScrollLock(true)

  const search = useCallback(async (q: string) => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
        .limit(8)
      setResults((data as Product[]) ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => search(query), 300)
    return () => clearTimeout(timeout)
  }, [query, search])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const content = (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: 'color-mix(in srgb, black 70%, transparent)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-2xl mx-auto mt-20 rounded-2xl overflow-hidden flex flex-col"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', maxHeight: '70vh', margin: '80px auto 0', width: 'calc(100% - 32px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar itens MM2..."
            autoFocus
            className="flex-1 outline-none bg-transparent text-base"
            style={{ fontFamily: 'Inter', color: 'var(--text-primary)' }}
          />
          {loading && <Loader2 size={16} className="animate-spin" style={{ color: 'var(--text-muted)' }} />}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={getProductHref(product.slug)}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-3 transition-colors"
                style={{ textDecoration: 'none', borderBottom: '1px solid var(--border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div
                  className="relative flex-shrink-0 rounded-lg overflow-hidden"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(145deg, color-mix(in srgb, var(--accent-alt) 28%, var(--bg-card)) 0%, color-mix(in srgb, var(--bg-base) 88%, black 12%) 40%, color-mix(in srgb, var(--accent) 36%, var(--bg-base)) 100%)',
                  }}
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="48px"
                    style={{ objectFit: 'contain', padding: '6px' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}>
                    {product.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter', textTransform: 'capitalize' }}>
                    {product.category === 'knives' ? 'Faca' : product.category === 'guns' ? 'Gun' : product.category === 'pets' ? 'Pet' : 'Bundle'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm" style={{ color: 'var(--accent)', fontFamily: 'Inter' }}>
                    {formatPrice(product.price)}
                  </p>
                  {product.stock === 0 && (
                    <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>Esgotado</p>
                  )}
                </div>
              </Link>
            ))
          ) : query.length >= 2 && !loading ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : query.length === 0 ? (
            <div className="px-5 py-6">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'Inter', letterSpacing: '0.1em' }}>
                Categorias populares
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryLinks.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'Inter',
                      textDecoration: 'none',
                    }}
                  >
                    {c.href.includes('facas') ? <Sword size={14} /> : c.href.includes('guns') ? <Crosshair size={14} /> : c.href.includes('pets') ? <PawPrint size={14} /> : <Package size={14} />} {c.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(content, document.body)
}
