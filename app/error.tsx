'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[z7Blox error]', error)
    }
  }, [error])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <p
          className="font-black"
          style={{
            fontSize: 'clamp(56px, 12vw, 96px)',
            fontFamily: 'Inter',
            color: 'var(--accent)',
            letterSpacing: '-0.06em',
            lineHeight: 1,
          }}
        >
          âš ï¸
        </p>

        <div>
          <h1
            className="font-bold text-xl"
            style={{ fontFamily: 'Inter', color: 'var(--text-primary)' }}
          >
            Erro temporí¡rio
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--text-secondary)', fontFamily: 'Inter' }}
          >
            Houve um problema ao carregar esta pí¡gina. Isso í© temporí¡rio â€” tente novamente.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={reset}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            <RefreshCw size={16} /> Tentar Novamente
          </button>
          <Link href="/" className="btn-secondary" style={{ padding: '11px 24px', fontSize: '14px' }}>
            <Home size={16} /> Voltar í  Loja
          </Link>
        </div>
      </div>
    </div>
  )
}
