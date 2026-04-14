import { ProductSectionSkeleton } from '@/components/ui/ProductSkeleton'

export default function Loading() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <div
        className="h-[68px] w-full"
        style={{ background: 'var(--bg-header)', borderBottom: '1px solid var(--border)' }}
      />
      <div
        className="w-full"
        style={{ background: 'var(--accent)', height: '40px', opacity: 0.9 }}
      />
      <div
        className="w-full"
        style={{
          background: 'linear-gradient(to bottom, var(--bg-base), var(--bg-surface))',
          minHeight: '480px',
        }}
      />
      <ProductSectionSkeleton />
      <ProductSectionSkeleton />
    </div>
  )
}
