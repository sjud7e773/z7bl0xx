'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Zap, MessageCircleQuestion, Plus, Minus, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  rarity: string
  category: string
  game: string
  image_url: string
  description: string
}

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params.slug === 'string' ? params.slug : (Array.isArray((params as any).slug) ? (params as any).slug[0] : '')
  const { addItem, openCart } = useCartStore()
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const fetchProduct = async () => {
      if (!slug) {
        setErrorMsg('Produto não encontrado')
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()
      if (!active) return
      if (error || !data) {
        setErrorMsg('Produto não encontrado')
        setProduct(null)
      } else {
        setProduct(data as Product)
        setErrorMsg(null)
      }
      setLoading(false)
    }
    fetchProduct()
    return () => { active = false }
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: slug || product.id,
      category: product.category as any,
      price: product.price,
      original_price: product.originalPrice ?? null,
      stock: 1,
      description: product.description,
      image_url: product.image_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    for (let i = 0; i < qty; i++) addItem(cartProduct)
    openCart()
  }

  const handleBuyNow = () => {
    if (!product) return
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: slug || product.id,
      category: product.category as any,
      price: product.price,
      original_price: product.originalPrice ?? null,
      stock: 1,
      description: product.description,
      image_url: product.image_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    for (let i = 0; i < qty; i++) addItem(cartProduct)
  }

  if (loading) {
    return (
      <>
        <AnnouncementStrip />
        <Header />
        <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
            <div className="font-inter text-[14px] text-text-muted">Carregando...</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (errorMsg || !product) {
    return (
      <>
        <AnnouncementStrip />
        <Header />
        <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
          <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
            <div className="font-inter text-[14px] text-text-muted">Produto não encontrado</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <AnnouncementStrip />
      <Header />

      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col gap-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-inter text-[12px] font-bold uppercase tracking-widest text-text-muted">
            <Link href="/" className="hover:text-accent-pink transition-colors">Início</Link>
            <span>/</span>
            <Link href={`/${product!.category.toLowerCase()}`} className="hover:text-accent-pink transition-colors">{product!.category}</Link>
            <span>/</span>
            <span className="text-text-primary truncate">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Image */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square bg-[#1a0535] rounded-[12px] flex items-center justify-center relative border border-border shadow-xl">
                <span className="absolute top-4 left-4 bg-rarity-chroma text-white font-cabin font-bold text-[12px] uppercase tracking-wider px-3 py-1.5 rounded-full z-10 chroma-bg shadow-[0_4px_20px_rgba(255,255,255,0.4)]">
                  {product!.rarity}
                </span>
                <Image src={product!.image_url} alt={product!.name} className="w-[70%] h-[70%] object-contain" />
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {[1, 2, 3].map((thumb) => (
                  <div key={thumb} className="w-20 h-20 bg-[#1a0535] rounded-[8px] border border-accent-pink flex items-center justify-center shrink-0 cursor-pointer hover:border-white transition-colors">
                    <Image src={product!.image_url} alt="thumbnail" className="w-[60%] h-[60%] object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-cabin font-bold text-[32px] md:text-[40px] leading-tight text-white chroma-text">
                    {product!.name}
                  </h1>
                  <span className="hidden md:inline-block bg-rarity-chroma text-white font-cabin font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded-full chroma-bg">
                    {product!.rarity}
                  </span>
                </div>
                <div className="font-inter font-medium text-[15px] text-text-muted">
                  {product!.game} — {product!.category}
                </div>
              </div>

              <p className="font-inter font-medium text-[15px] text-text-muted leading-relaxed">
                {product!.description}
              </p>

              <div className="flex flex-col gap-1">
                <div className="flex items-end gap-3">
                  <span className="font-cabin font-bold text-[36px] text-white leading-none">R$ {product!.price.toFixed(2).replace('.', ',')}</span>
                  <span className="font-inter font-medium text-[18px] text-text-muted line-through mb-1">R$ {product!.originalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-2 border-t border-border pt-6">
                
                {/* Quantity */}
                <div className="flex flex-col gap-2">
                  <span className="font-inter font-bold text-[11px] text-text-muted uppercase tracking-wider">Quantidade</span>
                  <div className="flex items-center w-fit border border-border rounded-full bg-surface-elevated">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-white transition-colors">
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-inter font-bold text-[16px] text-white">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center text-text-muted hover:text-white transition-colors">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-4">
                  <Link href="/checkout" onClick={handleBuyNow} className="w-full bg-accent-pink hover:bg-[#d10074] text-white font-inter font-bold text-[16px] py-4 rounded-full flex items-center justify-center transition-all hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(255,20,147,0.3)]">
                    Comprar Agora
                  </Link>
                  <button onClick={handleAddToCart} className="w-full bg-transparent border border-border hover:bg-surface-elevated hover:border-text-muted text-white font-inter font-bold text-[16px] py-4 rounded-full flex items-center justify-center transition-colors">
                    Adicionar ao Carrinho
                  </button>
                </div>

              </div>

              {/* Warning */}
              <div className="mt-4 bg-[#2a2000] border border-[#5c4a00] rounded-[10px] p-4 flex gap-3">
                <AlertCircle className="text-[#ffc107] shrink-0" size={20} />
                <p className="font-inter font-medium text-[13px] text-[#ffeb99] leading-snug">
                  Para receber o item, sua conta Roblox precisa ter <strong className="text-[#ffe066] font-bold">nível 10+</strong> no Murder Mystery 2.
                </p>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="flex items-center gap-2 font-inter font-bold text-[12px] text-text-muted tracking-wide">
                  <ShieldCheck size={18} className="text-accent-cyan" /> Pagamento seguro
                </div>
                <div className="flex items-center gap-2 font-inter font-bold text-[12px] text-text-muted tracking-wide">
                  <Zap size={18} className="text-accent-pink" /> Entrega automática
                </div>
                <div className="flex items-center gap-2 font-inter font-bold text-[12px] text-text-muted tracking-wide">
                  <MessageCircleQuestion size={18} className="text-text-primary" /> Suporte 24h
                </div>
              </div>

            </div>
          </div>

          {/* Related Items Carousel */}
          <div className="w-full flex flex-col gap-6 mt-16 pt-16 border-t border-border">
            <h2 className="font-cabin font-bold text-[24px] text-text-primary">Itens relacionados</h2>
            
            <div className="w-full overflow-x-auto pb-8 no-scrollbar flex gap-4 snap-x">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="min-w-[260px] md:min-w-[280px] w-[260px] md:w-[280px] snap-center shrink-0 bg-surface border border-border rounded-[12px] p-4 flex flex-col gap-4 group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300">
                  <div className="w-full aspect-square bg-[#1a0535] rounded-[8px] relative overflow-hidden flex items-center justify-center">
                    <span className="absolute top-2 left-2 bg-[#ff1493] text-white font-cabin font-bold text-[11px] uppercase tracking-wider px-2 py-1 rounded-full z-10">Godly</span>
                    <Image src="https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png" alt="Product" className="w-2/3 h-2/3 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-inter font-bold text-[15px] text-[#ff1493] truncate">Godly Item {i}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-inter font-bold text-[13px] text-white">R$ 29,90</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
