export type Theme = 'space' | 'dark' | 'light'

export type ProductCategory = 'knives' | 'guns' | 'pets' | 'bundles'

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  price: number
  original_price: number | null
  stock: number
  description: string
  image_url: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  author: string
  country: string
  date: string
  text: string
  initials: string
}

export interface FaqItem {
  question: string
  answer: string
}

