'use client'

import { createClient } from '@/lib/supabase/client'
import type { Product } from '@/types'

export async function fetchAllProductsClient(): Promise<Product[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gt('stock', 0)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) return []
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}
