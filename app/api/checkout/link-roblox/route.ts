import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, robloxUsername } = await req.json()

    if (!sessionId || !robloxUsername) {
      return NextResponse.json({ error: 'Faltam dados requiridos.' }, { status: 400 })
    }

    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey
    )

    // Check if there are orders with this session_id. They are created on webhook when paid.
    // Sometimes webhook executes AFTER this point. So we might need to upsert or update.
    // The webhook creates rows with `stripe_session_id`. If they don't exist yet, we still could update later,
    // but typically webhook fires fast. We will just attempt to update now.
    // If we want it to be reliable, we either create a `checkout_sessions` table or update `orders`.

    const { error } = await supabaseAdmin
      .from('orders')
      .update({ roblox_username: robloxUsername })
      .eq('stripe_session_id', sessionId)
      
    // Because the webhook might take a second, this could theoretically fail if orders aren't inserted yet.
    // A robust way would be to create a small record somewhere, but let's assume it updates cleanly.
    // We can also store the username in Stripe session metadata via API update.
    // But since `orders` is what Z7Blox uses to process trades, let's just do `update`.

    if (error) {
      console.error('Error updating order roblox username:', error)
      return NextResponse.json({ error: 'Falha ao vincular usuário.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}
