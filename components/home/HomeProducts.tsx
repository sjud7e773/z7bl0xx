'use client'

import { Sword, Crosshair, PawPrint, Package } from 'lucide-react'
import { useProdutos } from '@/hooks/useProdutos'
import ProductSection from '@/components/products/ProductSection'
import { ProductSectionSkeleton } from '@/components/ui/ProductSkeleton'

export default function HomeProducts() {
  const { produtos, loading, erro } = useProdutos()

  if (loading) {
    return (
      <div className="flex flex-col gap-8 md:gap-16 py-8">
        <ProductSectionSkeleton />
        <ProductSectionSkeleton />
        <ProductSectionSkeleton />
        <ProductSectionSkeleton />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="py-16 flex flex-col items-center justify-center">
        <p className="font-medium" style={{ color: 'var(--accent-red)', fontFamily: 'Inter' }}>{erro}</p>
      </div>
    )
  }

  const knives = produtos.filter((p) => p.categoria === 'knives')
  const guns = produtos.filter((p) => p.categoria === 'guns')
  const pets = produtos.filter((p) => p.categoria === 'pets')
  const bundles = produtos.filter((p) => p.categoria === 'bundles')

  return (
    <div className="flex flex-col gap-8 md:gap-16 py-8">
      <ProductSection
        title="Facas MM2"
        icon={<Sword size={24} />}
        products={knives}
        category="knives"
      />
      <ProductSection
        title="Armas MM2"
        icon={<Crosshair size={24} />}
        products={guns}
        category="guns"
      />
      <ProductSection
        title="Pets MM2"
        icon={<PawPrint size={24} />}
        products={pets}
        category="pets"
      />
      <ProductSection
        title="Conjuntos"
        icon={<Package size={24} />}
        products={bundles}
        category="bundles"
      />
    </div>
  )
}
