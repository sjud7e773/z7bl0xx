import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'tr.rbxcdn.com' },
      { protocol: 'https', hostname: 'thumbnails.roblox.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/produtos',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=300, stale-while-revalidate=600' },
        ],
      },
      {
        source: '/api/cambio',
        headers: [
          { key: 'Cache-Control', value: 's-maxage=3600, stale-while-revalidate=7200' },
        ],
      },
    ]
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
