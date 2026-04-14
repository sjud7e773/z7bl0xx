'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function ClearCartOnSuccess() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return null
}
