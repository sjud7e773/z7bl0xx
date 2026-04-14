'use client'

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="aspect-square relative" style={{ background: 'var(--bg-card)' }}>
            <div className="skeleton-shimmer" style={{ position: 'absolute', inset: 0 }} />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="skeleton-bar" style={{ height: '14px', width: '75%', borderRadius: '6px' }} />
            <div className="skeleton-bar" style={{ height: '14px', width: '50%', borderRadius: '6px' }} />
            <div className="skeleton-bar" style={{ height: '40px', borderRadius: '9999px' }} />
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
      ))}
    </div>
  )
}
