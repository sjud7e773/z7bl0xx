import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

interface CheckoutItem {
  productId: string
  quantity: number
}

interface CheckoutBody {
  items: CheckoutItem[]
  email?: string
  robloxUsername?: string
  paymentMethod?: 'card' | 'pix'
}

interface ProdutoMapped {
  id: string
  nome: string
  imagem?: string
  disponivel: boolean
  precoOriginal: number
  price: number
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutBody
    const normalizedEmail = body.email?.trim()
    const normalizedRobloxUsername = body.robloxUsername?.trim()
    const paymentMethod = body.paymentMethod === 'pix' ? 'pix' : 'card'

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 })
    }

    if (!normalizedRobloxUsername) {
      return NextResponse.json({ error: 'Informe o usuário do Roblox.' }, { status: 400 })
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(normalizedRobloxUsername)) {
      return NextResponse.json({ error: 'Usuário do Roblox inválido.' }, { status: 400 })
    }

    if (normalizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Busca os produtos ao vivo para validar preço real
    const [resProdutos, resCambio] = await Promise.all([
      fetch(`${origin}/api/produtos`),
      fetch(`${origin}/api/cambio`),
    ])

    const dadosProdutos = await resProdutos.json()
    const { usd_to_brl } = await resCambio.json()
    const LUCRO = 1.5

    // Cria o map com preçoFinalBRL calc
    const productMap = new Map<string, ProdutoMapped>(
      dadosProdutos.map((item: any) => [
        String(item.id),
        {
          id: String(item.id),
          nome: String(item.nome ?? item.name ?? 'Produto Z7Blox'),
          imagem: typeof item.imagem === 'string' ? item.imagem : undefined,
          disponivel: Boolean(item.disponivel ?? true),
          precoOriginal: Number(item.precoOriginal ?? item.price ?? 0),
          price: Number(item.precoOriginal ?? item.price ?? 0) * usd_to_brl * LUCRO,
        },
      ])
    )

    const productLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    let subtotal = 0

    for (const item of body.items) {
      const dbProduct = productMap.get(item.productId)

      if (!dbProduct) {
        return NextResponse.json(
          { error: `Produto não encontrado: ${item.productId}` },
          { status: 400 }
        )
      }

      if (!dbProduct.disponivel) {
        return NextResponse.json(
          { error: `O produto "${dbProduct.nome}" não está disponível no momento.` },
          { status: 400 }
        )
      }

      const unitAmount = Math.round(dbProduct.price * 100)
      subtotal += dbProduct.price * item.quantity

      productLineItems.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: String(dbProduct.nome || 'Produto Z7Blox'),
            images: dbProduct.imagem?.startsWith('https://') ? [dbProduct.imagem] : [],
            metadata: { productId: dbProduct.id },
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      })
    }

    const processingFee = Math.round(subtotal * 0.15 * 100)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      ...productLineItems,
      ...(processingFee > 0
        ? [
            {
              price_data: {
                currency: 'brl',
                product_data: { name: 'Taxa de Processamento' },
                unit_amount: processingFee,
              },
              quantity: 1,
            },
          ]
        : []),
    ]

    // Finaliza Stripe setup
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethod === 'pix' ? ['pix'] : ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/pedido/{CHECKOUT_SESSION_ID}/confirmar`,
      cancel_url: `${origin}/checkout?canceled=true`,
      customer_email: normalizedEmail,
      metadata: {
        itemCount: body.items.length.toString(),
        robloxUsername: normalizedRobloxUsername,
      },
      custom_fields: [],
      locale: 'pt-BR',
      custom_text: {
        submit: {
          message: 'Processamento Seguro via Z7Blox',
        },
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro interno'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
