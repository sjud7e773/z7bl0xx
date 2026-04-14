'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[z7Blox global error]', error)
    }
  }, [error])

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Inter', sans-serif",
          background: '#080010',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>âš ï¸</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
            Erro temporí¡rio
          </h2>
          <p style={{ fontSize: '15px', color: '#b8a9d9', marginBottom: '32px', lineHeight: 1.6 }}>
            Houve um problema ao carregar esta pí¡gina. Isso í© temporí¡rio â€” tente novamente.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                padding: '14px 28px',
                background: '#E91E8C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '40px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Tentar Novamente
            </button>
            <Link
              href="/"
              style={{
                padding: '13px 28px',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '40px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Voltar í  Loja
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
