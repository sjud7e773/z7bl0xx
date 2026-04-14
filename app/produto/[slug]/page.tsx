import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import ProductDetailActions from '@/components/products/ProductDetailActions'
import { getProductBySlug } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import { AlertTriangle, Zap } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} | z7Blox`,
    description: `Compre ${product.name} por R$${formatPrice(product.price)} BRL. Entrega instantânea via trade no Roblox.`,
    openGraph: {
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const savings =
    product.original_price && product.original_price > product.price
      ? product.original_price - product.price
      : 0
  const discountPct =
    product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : 0

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link
              href={`/categoria/${product.category === 'knives' ? 'facas' : product.category}`}
              style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            >
              {product.category === 'knives' ? 'Facas' : product.category === 'guns' ? 'Guns' : product.category === 'pets' ? 'Pets' : 'Bundles'}
            </Link>
            <span>›</span>
            <span style={{ color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-square"
              style={{
                background: 'radial-gradient(ellipse at 30% 30%, rgba(167,139,250,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(109,40,217,0.3) 0%, transparent 60%), linear-gradient(145deg, #1a0535 0%, #0d0020 40%, #1a0040 100%)',
              }}
            >
              {product.stock === 0 && (
                <div className="card-sold-overlay">
                  <span>Vendido</span>
                </div>
              )}
              {discountPct > 0 && (
                <span className="badge-save" style={{ fontSize: '12px', padding: '4px 14px' }}>
                  Save R${formatPrice(savings)} BRL
                </span>
              )}
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain', padding: '40px' }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--accent)', fontFamily: 'Inter', letterSpacing: '0.12em' }}
                >
                  {product.category === 'knives' ? 'Faca MM2'
                    : product.category === 'guns' ? 'Gun MM2'
                    : product.category === 'pets' ? 'Pet MM2'
                    : 'Bundle MM2'}
                </p>
                <h1
                  className="font-black"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 'clamp(28px, 5vw, 44px)',
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {product.name}
                </h1>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-4">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'Inter', fontSize: '32px', color: 'var(--accent)' }}
                >
                  R${formatPrice(product.price)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      color: 'var(--text-muted)',
                      textDecoration: 'line-through',
                    }}
                  >
                    R${formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="leading-relaxed text-sm"
                style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
              >
                {product.description}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: product.stock > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}
                />
                <span
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
                >
                  {product.stock === 0
                    ? 'Fora de estoque'
                    : product.stock <= 3
                    ? `Apenas ${product.stock} restante${product.stock > 1 ? 's' : ''}!`
                    : `${product.stock} em estoque`}
                </span>
                {product.stock > 0 && product.stock <= 3 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'color-mix(in srgb, var(--accent-red) 10%, transparent)', color: 'var(--accent-red)', fontFamily: 'Inter' }}
                  >
                    Estoque Baixo
                  </span>
                )}
              </div>

              {/* Delivery info */}
              <div
                className="rounded-xl p-4 flex flex-col gap-2"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}>
                  <Zap size={14} /> Entrega via Trade no Roblox
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}>
                  Após o pagamento, informe seu usuário do Roblox e aceite o trade. Entrega média de 1 a 5 minutos.
                </p>
              </div>

              {/* Actions — client component */}
              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
