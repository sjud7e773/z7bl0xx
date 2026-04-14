import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = supabaseServiceKey
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseServiceKey)
  : null

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET not configured.' },
      { status: 500 }
    )
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured.' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Webhook verification failed: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      })

      const robloxUsername: string = (session.metadata?.robloxUsername as string) ?? ''

      for (const item of lineItems.data) {
        const product = item.price?.product as Stripe.Product | undefined
        const productId: string = (product?.metadata?.productId as string) ?? ''
        const productName = item.description ?? product?.name ?? ''

        if (productName === 'Taxa de Processamento') continue

        const qty = item.quantity ?? 1
        const itemTotal = item.amount_total ? item.amount_total / 100 : 0

        if (productId) {
          const { data: prod } = await supabaseAdmin
            .from('products')
            .select('stock')
            .eq('id', productId)
            .single()

          if (prod && prod.stock > 0) {
            await supabaseAdmin
              .from('products')
              .update({ stock: Math.max(0, prod.stock - qty) })
              .eq('id', productId)
          }
        }

        await supabaseAdmin.from('orders').insert({
          stripe_session_id: session.id,
          product_id: productId || null,
          product_name: productName,
          quantity: qty,
          amount_total: itemTotal,
          roblox_username: robloxUsername,
          status: 'paid',
        })
      }

      break
    }

    case 'checkout.session.expired': {
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true })
}
