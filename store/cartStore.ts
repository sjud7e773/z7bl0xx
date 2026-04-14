'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  drawerStep: 'cart' | 'roblox'
  robloxUsername: string
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  setDrawerStep: (step: 'cart' | 'roblox') => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setRobloxUsername: (username: string) => void
  getTotalItems: () => number
  getSubtotal: () => number
  isInCart: (productId: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      drawerStep: 'cart',
      robloxUsername: '',

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false, drawerStep: 'cart' }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setDrawerStep: (step) => set({ drawerStep: step }),

      addItem: (product: Product) => {
        const { items } = get()
        const existing = items.find((item) => item.product.id === product.id)
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      setRobloxUsername: (username: string) => set({ robloxUsername: username }),

      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),

      isInCart: (productId: string) =>
        get().items.some((item) => item.product.id === productId),
    }),
    {
      name: 'z7blox-cart',
      partialize: (state) => ({ items: state.items, robloxUsername: state.robloxUsername }),
    }
  )
)
