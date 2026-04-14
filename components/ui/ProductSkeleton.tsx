'use client'

export default function ProductSkeleton() {
  return (
    <div
      className="product-card"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div
        className="card-img-wrap"
        style={{ background: 'var(--bg-card)' }}
      >
        <div className="skeleton-shimmer" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div className="card-body" style={{ gap: '8px' }}>
        <div className="skeleton-bar" style={{ height: '13px', width: '75%', borderRadius: '6px' }} />
        <div className="skeleton-bar" style={{ height: '15px', width: '45%', borderRadius: '6px' }} />
        <div className="card-actions" style={{ marginTop: '6px' }}>
          <div className="skeleton-bar" style={{ height: '32px', borderRadius: '8px' }} />
          <div className="skeleton-bar" style={{ height: '32px', borderRadius: '8px' }} />
        </div>
      </div>

      <style>{`
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            var(--bg-card) 0%,
            var(--border-hover) 50%,
            var(--bg-card) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-bar {
          background: var(--bg-card);
          position: relative;
          overflow: hidden;
        }
        .skeleton-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--border-hover) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export function ProductSectionSkeleton() {
  return (
    <div style={{ padding: '48px 0', borderTop: '1px solid var(--border)' }}>
      <div className="page-container">
        <div className="section-header" style={{ marginBottom: '24px' }}>
          <div className="skeleton-bar" style={{ height: '28px', width: '200px', borderRadius: '8px' }} />
        </div>
        <div style={{ display: 'flex', gap: '16px', overflow: 'hidden' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ flex: '0 0 240px' }}>
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
