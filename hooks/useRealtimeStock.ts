'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/types'

export function useRealtimeStock(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  useEffect(() => {
    const supabase = createClient()
    const channelId = `products-stock-${Math.random().toString(36).slice(2)}`

    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'products' },
        (payload) => {
          const updated = payload.new as Product
          setProducts((prev) =>
            prev.map((p) => (p.id === updated.id ? { ...p, stock: updated.stock } : p))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return products
}
