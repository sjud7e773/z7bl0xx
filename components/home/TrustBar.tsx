'use client'

import { Shield, Zap, Headphones, Users } from 'lucide-react'

const items = [
  { icon: <Zap size={18} />, label: 'Entrega Instantânea', sub: 'Trade direto no Roblox' },
  { icon: <Shield size={18} />, label: 'Pagamento Seguro', sub: 'Stripe + Pix protegido' },
  { icon: <Users size={18} />, label: '10.000+ Clientes', sub: 'Comunidade verificada' },
  { icon: <Headphones size={18} />, label: 'Suporte 24/7', sub: 'Chat ao vivo e e-mail' },
]

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)', fontFamily: 'Inter' }}
                >
                  {item.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Inter' }}
                >
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
