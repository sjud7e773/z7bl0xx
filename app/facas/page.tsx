'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementStrip from '@/components/layout/AnnouncementStrip'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Filter } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const ITEMS = [
  { id: '1', name: 'Shark', rarity: 'Godly', price: 45.00, image_url: 'https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png' },
  { id: '2', name: 'Slasher', rarity: 'Chroma', price: 38.00, image_url: 'https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png' },
  { id: '3', name: 'Knife', rarity: 'Vintage', price: 25.00, image_url: 'https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png' },
  { id: '4', name: 'Blade', rarity: 'Raro', price: 15.00, image_url: 'https://static.wikia.nocookie.net/murdermystery/images/3/30/MM2logo.png' },
]

export default function FacasPage() {
  const [selectedFilter, setSelectedFilter] = useState('Todos')
  const { addItem } = useCartStore()

  const filteredItems = selectedFilter === 'Todos' 
    ? ITEMS 
    : ITEMS.filter(item => item.rarity === selectedFilter)

  return (
    <>
      <AnnouncementStrip />
      <Header />
      
      <main className="flex-1 w-full bg-background flex flex-col pt-24 md:pt-32 pb-12 md:pb-24">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-3">
            <h1 className="font-cabin font-bold text-[32px] md:text-[48px] text-text-primary leading-none">Facas</h1>
            <p className="font-inter text-[14px] md:text-[16px] text-text-muted">Explore nossa coleção premium de facas raras</p>
          </div>
          
          {/* Filter Bar */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar w-full">
            {['Todos', 'Comum', 'Incomum', 'Raro', 'Lendário', 'Vintage', 'Godly', 'Chroma', 'Ancient', 'Unique'].map((f) => (
              <button 
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`shrink-0 px-6 py-2.5 rounded-full font-inter font-bold text-[13px] uppercase tracking-wider transition-all ${
                  selectedFilter === f 
                    ? 'bg-accent-pink text-white' 
                    : 'bg-surface border border-border text-text-muted hover:border-text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-surface border border-border rounded-[12px] p-4 flex flex-col gap-4 group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
                <Link href={`/item/${item.id}`} className="w-full aspect-square bg-[#1a0535] rounded-[8px] relative overflow-hidden flex items-center justify-center">
                  <span className="absolute top-2 left-2 bg-accent-pink text-white font-cabin font-bold text-[10px] md:text-[11px] uppercase tracking-wider px-2 py-1 rounded-full z-10">
                    {item.rarity}
                  </span>
                  <Image src={item.image_url} alt={item.name} width={200} height={200} className="w-2/3 h-2/3 object-contain group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <Link href={`/item/${item.id}`} className="flex flex-col gap-1">
                  <h3 className="font-inter font-bold text-[14px] md:text-[15px] text-accent-pink truncate">{item.name}</h3>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <span className="font-inter font-medium text-[12px] text-text-muted">MM2 {item.rarity}</span>
                  </div>
                </Link>
                
                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border">
                  <span className="font-cabin font-bold text-[16px] md:text-[18px] text-text-primary">R$ {item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addItem({
                      id: item.id,
                      name: item.name,
                      slug: item.id,
                      category: 'knives',
                      price: item.price,
                      original_price: null,
                      stock: 1,
                      description: '',
                      image_url: item.image_url,
                      created_at: new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    })}
                    className="flex items-center justify-center w-10 h-10 bg-accent-pink hover:bg-[#d10074] text-white rounded-full transition-colors"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
