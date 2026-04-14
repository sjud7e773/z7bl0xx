import { NextResponse } from 'next/server'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface BloxxerItem {
  id: string | number
  name: string
  description?: string
  price?: number
  cost?: number
  value?: number
  image_url?: string
  imageUrl?: string
  image?: string
  thumbnail?: string
  images?: string[]
  category?: string
  type?: string
  available?: boolean
  inStock?: boolean
  [key: string]: unknown
}

const LUCRO_PERCENTUAL = 0.5

async function getTaxaCambio(): Promise<number> {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    const data = await res.json()
    return data?.rates?.BRL ?? 5.75
  } catch {
    return 5.75
  }
}

async function getProdutosExternos(): Promise<BloxxerItem[]> {
  const endpoints = [
    'https://bloxxer.gg/api/items',
    'https://bloxxer.gg/api/products',
    'https://bloxxer.gg/api/inventory',
    'https://api.bloxxer.gg/items',
    'https://api.bloxxer.gg/products',
  ]

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://bloxxer.gg/',
          'Origin': 'https://bloxxer.gg',
        },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 300 },
      })

      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) return data
        if (Array.isArray(data?.items)) return data.items
        if (Array.isArray(data?.data)) return data.data
        if (Array.isArray(data?.products)) return data.products
      }
    } catch {
      continue
    }
  }

  return []
}

async function traduzirTexto(texto: string): Promise<string> {
  if (!texto || texto.trim().length === 0) return texto

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto.slice(0, 500))}&langpair=en|pt-br`,
      { signal: AbortSignal.timeout(4000) }
    )
    const data = await res.json()

    if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
      return data.responseData.translatedText
    }
  } catch {
    // mantém original
  }

  return texto
}

function extrairImagemItem(item: BloxxerItem): string {
  return (
    item.image_url ||
    item.imageUrl ||
    item.image ||
    item.thumbnail ||
    (Array.isArray(item.images) ? item.images[0] : undefined) ||
    ''
  ) as string
}

function extrairPrecoItem(item: BloxxerItem): number {
  const preco = item.price ?? item.cost ?? item.value ?? 0
  if (typeof preco === 'string') return parseFloat(preco) || 0
  return Number(preco) || 0
}

function extrairCategoriaItem(item: BloxxerItem): string {
  const cat = (item.category || item.type || 'outros') as string
  return cat.toLowerCase()
}

export async function GET() {
  try {
    const [itensRaw, taxaCambio] = await Promise.all([
      getProdutosExternos(),
      getTaxaCambio(),
    ])

    if (itensRaw.length === 0) {
      return NextResponse.json([], {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
        },
      })
    }

    const BATCH_SIZE = 10
    const produtosProcessados = []

    for (let i = 0; i < itensRaw.length; i += BATCH_SIZE) {
      const batch = itensRaw.slice(i, i + BATCH_SIZE)

      const batchProcessado = await Promise.all(
        batch.map(async (item) => {
          const precoUSD = extrairPrecoItem(item)
          const precoBRL = precoUSD * taxaCambio
          const precoFinalBRL = precoBRL * (1 + LUCRO_PERCENTUAL)
          const imagem = extrairImagemItem(item)

          const [nomeTraducido, descricaoTraduzida] = await Promise.all([
            traduzirTexto(item.name || ''),
            traduzirTexto(item.description || ''),
          ])

          return {
            id: String(item.id || Math.random().toString(36).substring(7)),
            nome: item.name || '',
            nomeTraducido: nomeTraducido || item.name || '',
            descricao: item.description || '',
            descricaoTraduzida: descricaoTraduzida || item.description || '',
            imagem,
            precoOriginal: precoUSD,
            precoOriginalUSD: precoUSD,
            precoBRL: Number(precoBRL.toFixed(2)),
            precoFinalBRL: Number(precoFinalBRL.toFixed(2)),
            categoria: extrairCategoriaItem(item),
            disponivel: item.available ?? item.inStock ?? true,
            taxaCambioUsada: taxaCambio,
          }
        })
      )

      produtosProcessados.push(...batchProcessado)
    }

    return NextResponse.json(produtosProcessados, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
