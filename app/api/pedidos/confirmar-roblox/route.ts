import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { orderId, robloxUsername } = await req.json();

    if (!orderId || !robloxUsername) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Busca o order pra ter certeza que existe
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, user_id, status')
      .eq('stripe_session_id', orderId) // orderId na verdade é o session_id
      .single();

    // Se nao usar orderError pq webhook pode nao ter chegado ainda:
    // A gente atualiza pelo stripe_session_id de qualquer modo se usarmos UPSERT ou Update.
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ roblox_username: robloxUsername })
      .eq('stripe_session_id', orderId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na confirmação:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
