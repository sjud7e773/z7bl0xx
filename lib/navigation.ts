import type { ProductCategory } from '@/types'

export const categoryLinks = [
  { label: 'Facas', href: '/categoria/facas', aliases: ['facas', 'knives'] },
  { label: 'Armas', href: '/categoria/guns', aliases: ['armas', 'guns'] },
  { label: 'Pets', href: '/categoria/pets', aliases: ['pets'] },
  { label: 'Sets', href: '/categoria/bundles', aliases: ['sets', 'bundles'] },
] as const

export const infoLinks = [
  { label: 'Como usar', href: '/como-funciona' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Suporte', href: '/suporte' },
  { label: 'Termos de uso', href: '/termos' },
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Reembolso', href: '/reembolso' },
] as const

export function getCategoryHref(category: ProductCategory | string): string {
  switch (category) {
    case 'knives':
    case 'facas':
      return '/categoria/facas'
    case 'guns':
    case 'armas':
      return '/categoria/guns'
    case 'pets':
      return '/categoria/pets'
    case 'bundles':
    case 'sets':
      return '/categoria/bundles'
    default:
      return '/'
  }
}

export function getCategoryLabel(category: ProductCategory | string): string {
  switch (category) {
    case 'knives':
    case 'facas':
      return 'Facas'
    case 'guns':
    case 'armas':
      return 'Armas'
    case 'pets':
      return 'Pets'
    case 'bundles':
    case 'sets':
      return 'Sets'
    default:
      return 'Catálogo'
  }
}

export function getProductHref(slug: string): string {
  return `/produto/${slug}`
}
