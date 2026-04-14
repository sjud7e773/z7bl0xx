import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import ProfileActions from '@/components/profile/ProfileActions'
import Link from 'next/link'
import { ShoppingBag, Package } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Meu Perfil | z7Blox',
  description: 'Acesse seu perfil na z7Blox e veja seu historico de compras de itens MM2.',
  robots: { index: false, follow: false },
}

interface Order {
  id: string
  stripe_session_id: string
  product_name: string
  quantity: number
  amount_total: number
  roblox_username: string
  status: string
  created_at: string
}

interface Profile {
  id: string
  email: string | null
  roblox_username: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

const statusLabel: Record<string, { label: string; color: string }> = {
  paid:       { label: 'Pago',        color: 'var(--accent-green)' },
  trade_sent: { label: 'Trade Enviado', color: 'var(--accent)' },
  completed:  { label: 'Concluido',   color: 'var(--accent-green)' },
  pending:    { label: 'Pendente',    color: 'var(--text-muted)' },
  cancelled:  { label: 'Cancelado',   color: 'var(--accent-red)' },
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/perfil')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  let orders: Order[] = []
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey && profile?.roblox_username) {
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey
    )
    const { data } = await adminClient
      .from('orders')
      .select('*')
      .eq('roblox_username', profile.roblox_username)
      .order('created_at', { ascending: false })
      .limit(10)
    orders = (data as Order[]) ?? []
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main style={{ background: 'var(--bg-base)', minHeight: '80vh' }}>
        <div className="page-container py-12">
          <h1
            className="font-black mb-8"
            style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(24px, 4vw, 36px)',
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
            }}
          >
            Meu Perfil
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Profile card */}
            <div
              className="lg:col-span-1 rounded-2xl p-6"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <ProfileActions user={user} profile={profile} />
            </div>

            {/* Right: Orders */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <h2
                className="font-bold text-lg"
                style={{ fontFamily: 'Inter', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
              >
                Meus Pedidos
              </h2>

              {!profile?.roblox_username ? (
                <div
                  className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
                  style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border)' }}
                >
                  <Package size={36} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
                    >
                      Defina seu username do Roblox para ver seus pedidos
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                      Clique no icone de edicao no painel ao lado.
                    </p>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
                  style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border)' }}
                >
                  <ShoppingBag size={36} style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
                    >
                      Nenhum pedido encontrado
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                      Seus pedidos aparecerao aqui apos a compra.
                    </p>
                  </div>
                  <Link href="/" className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
                    <ShoppingBag size={15} /> Ver Produtos
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {orders.map((order) => {
                    const s = statusLabel[order.status] ?? { label: order.status, color: 'var(--text-muted)' }
                    return (
                      <div
                        key={order.id}
                        className="rounded-xl p-4 flex items-center justify-between gap-4"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                      >
                        <div className="flex flex-col gap-1 min-w-0">
                          <p
                            className="font-semibold text-sm truncate"
                            style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}
                          >
                            {order.product_name}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}>
                            {new Date(order.created_at).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                            {order.quantity > 1 && ` Â· ${order.quantity}x`}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span
                            className="font-bold text-sm"
                            style={{ color: 'var(--accent)', fontFamily: 'Inter' }}
                          >
                            R${formatPrice(order.amount_total)}
                          </span>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                              color: s.color,
                              fontFamily: 'Inter',
                            }}
                          >
                            {s.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
