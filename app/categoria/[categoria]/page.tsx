import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Sword, Crosshair, PawPrint, Package } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import ProductCard from '@/components/products/ProductCard'
import { getProductsByCategory } from '@/lib/products'
import type { ProductCategory } from '@/types'
import type { ReactNode } from 'react'
import type { Produto } from '@/hooks/useProdutos'

const categoryMap: Record<string, { label: string; icon: ReactNode; db: ProductCategory }> = {
  facas:   { label: 'Facas MM2',  icon: <Sword size={28} />,     db: 'knives'  },
  guns:    { label: 'Guns MM2',   icon: <Crosshair size={28} />, db: 'guns'    },
  pets:    { label: 'Pets MM2',   icon: <PawPrint size={28} />,  db: 'pets'    },
  bundles: { label: 'Bundles',    icon: <Package size={28} />,   db: 'bundles' },
}

interface Props {
  params: Promise<{ categoria: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const cat = categoryMap[categoria]
  if (!cat) return {}
  return {
    title: `${cat.label} | z7Blox`,
    description: `Compre ${cat.label} com entrega instantânea via trade no Roblox. Preços baixos e checkout seguro.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((cat) => ({ categoria: cat }))
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params
  const cat = categoryMap[categoria]
  if (!cat) notFound()

  const products = await getProductsByCategory(cat.db, 50)
  const produtos: Produto[] = products.map((p) => ({
    id: p.id,
    nome: p.name,
    nomeTraducido: p.name,
    descricao: p.description,
    descricaoTraduzida: p.description,
    imagem: p.image_url,
    precoOriginalUSD: 0,
    precoBRL: p.price,
    precoFinalBRL: p.price,
    categoria: p.category,
    disponivel: p.stock > 0,
  }))

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '70vh' }}>
        <div className="page-container py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{cat.label}</span>
          </nav>

          <div className="mb-8">
            <h1
              className="font-black"
              style={{
                fontFamily: 'Inter',
                fontSize: 'clamp(28px, 5vw, 48px)',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
              }}
            >
              <span className="inline-flex items-center gap-3">{cat.icon} {cat.label}</span>
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
              {produtos.length} {produtos.length === 1 ? 'item' : 'itens'} disponíveis
            </p>
          </div>

          {produtos.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-2xl"
              style={{ border: '1px dashed var(--border)', color: 'var(--text-muted)' }}
            >
              <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Inter', color: 'var(--text-muted)' }}>
                Nenhum item disponível
              </p>
              <p className="text-sm" style={{ fontFamily: 'Inter' }}>
                Novos itens chegando em breve!
              </p>
            </div>
          ) : (
            <div className="products-grid">
              {produtos.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
