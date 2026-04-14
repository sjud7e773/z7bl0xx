import { createClient } from '@/lib/supabase/server'
import type { Product, ProductCategory } from '@/types'

export async function getProductsByCategory(
  category: ProductCategory,
  limit = 12
): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) return []
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return []
    return (data as Product[]) ?? []
  } catch {
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data as Product
  } catch {
    return null
  }
}

