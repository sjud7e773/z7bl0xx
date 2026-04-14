import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Sword } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pí¡gina Não Encontrada | z7Blox',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <Image
          src="https://i.ibb.co/f36xqgk/z7blox-logo.png"
          alt="z7Blox"
          width={140}
          height={48}
          unoptimized
          style={{ objectFit: 'contain', height: '44px', width: 'auto' }}
        />

        <div>
          <p
            className="font-black"
            style={{
              fontSize: 'clamp(72px, 15vw, 120px)',
              fontFamily: 'Inter',
              color: 'var(--accent)',
              letterSpacing: '-0.06em',
              lineHeight: 1,
            }}
          >
            404
          </p>
          <h1
            className="font-bold text-2xl mt-2"
            style={{ fontFamily: 'Inter', color: 'var(--text-primary)' }}
          >
            Pí¡gina não encontrada
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
          >
            A pí¡gina que vocíª procura não existe ou foi movida.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href="/" className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
            <Home size={16} /> Ir para Home
          </Link>
          <Link
            href="/categoria/facas"
            className="btn-secondary"
            style={{ padding: '11px 24px', fontSize: '14px' }}
          >
            <Sword size={16} /> Ver Facas
          </Link>
        </div>
      </div>
    </div>
  )
}
