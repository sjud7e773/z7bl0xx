'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

const drawerSpring = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 32,
  mass: 0.8,
}

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useBodyScrollLock(isOpen)

  if (!mounted) return null

  const subtotal = getSubtotal()

  const handleUpdateQuantity = (productId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta
    if (newQty > 0 && newQty <= 10) {
      updateQuantity(productId, newQty)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={closeCart}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={drawerSpring}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-background border-l border-border z-[201] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-cabin text-xl font-bold text-text-primary">
                Carrinho <span className="text-text-muted text-lg font-medium ml-2">({items.length})</span>
              </h2>
              <button 
                onClick={closeCart}
                className="text-text-muted hover:text-text-primary transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center border border-border">
                    <ShoppingCart size={24} className="text-text-muted" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-cabin font-bold text-lg text-text-primary">Seu carrinho esta vazio.</h3>
                    <p className="font-inter text-sm text-text-muted">Adicione alguns itens raros para continuar.</p>
                  </div>
                  <button 
                    onClick={closeCart} 
                    className="mt-4 font-inter font-bold text-accent-pink hover:text-white transition-colors"
                  >
                    Explorar Itens
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const rarityLabel = item.product.category
                  const rarityColor = 'var(--accent-pink)'
                  return (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-surface rounded-xl border border-border relative group">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="absolute top-2 right-2 text-text-muted hover:text-accent-pink transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                      
                      <div className="w-[60px] h-[60px] rounded-lg bg-[#1a0535] relative flex items-center justify-center shrink-0 border border-border">
                        {item.product.image_url ? (
                          <Image
                            src={item.product.image_url}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : null}
                      </div>

                      <div className="flex flex-col flex-1 gap-1 pr-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-cabin font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: rarityColor }}>
                            {rarityLabel}
                          </span>
                        </div>
                        <h4 className="font-inter font-bold text-sm" style={{ color: rarityColor }}>
                          {item.product.name}
                        </h4>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-surface-elevated border border-border rounded-full px-2 py-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity, -1)}
                              className="text-text-muted hover:text-text-primary"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-inter font-bold text-[13px] text-text-primary w-4 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity, 1)}
                              className="text-text-muted hover:text-text-primary"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-inter font-bold text-[15px] text-text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-surface flex flex-col gap-4">
                <div className="flex items-center justify-between font-inter text-text-muted">
                  <span className="font-medium text-sm">Subtotal</span>
                  <span className="font-medium text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between font-cabin text-text-primary">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <Link 
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full bg-accent-pink text-white font-inter font-bold text-[15px] py-4 rounded-full flex items-center justify-center hover:bg-[#d10074] transition-colors"
                  >
                    Finalizar Compra
                  </Link>
                  <button 
                    onClick={closeCart}
                    className="font-inter font-bold text-[13px] text-text-muted hover:text-text-primary transition-colors text-center py-2"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ShoppingCart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
