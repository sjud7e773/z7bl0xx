import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://z7blox.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/categoria/facas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categoria/guns`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categoria/pets`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/categoria/bundles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/como-funciona`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/reembolso`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let productRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .gt('stock', 0)
      .order('updated_at', { ascending: false })

    if (products) {
      productRoutes = products.map((p) => ({
        url: `${baseUrl}/produto/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }))
    }
  } catch {
    /* Supabase unavailable — return static routes only */
  }

  return [...staticRoutes, ...productRoutes]
}
