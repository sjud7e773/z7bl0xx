import type { Metadata, Viewport } from 'next'
import './globals.css'
import ClientProviders from '@/components/providers/ClientProviders'
import { Inter, Cabin } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter' })
const cabin = Cabin({ subsets: ['latin'], weight: ['700'], variable: '--font-cabin' })

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export const metadata: Metadata = {
  title: 'Z7Blox - Premium MM2 Atelier',
  description: 'Loja premium de itens Murder Mystery 2. Compre Godlys, Ancients e Pets com entrega instantanea via trade no Roblox. Checkout seguro via Stripe.',
  keywords: ['MM2', 'Murder Mystery 2', 'itens MM2', 'Godly', 'Roblox', 'Z7Blox'],
  icons: {
    icon: [
      { url: 'https://i.ibb.co/nMsyctBr/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://i.ibb.co/Df6V1M2F/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: 'https://i.ibb.co/XZwMWM7m/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome', url: 'https://i.ibb.co/M5gHjBy2/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: 'https://i.ibb.co/kgG6FXYw/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Z7Blox - Premium MM2 Atelier',
    description: 'Loja premium de itens Murder Mystery 2.',
    siteName: 'Z7Blox',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${cabin.variable}`}>
      <head>
        <link rel="preconnect" href="https://embed.tawk.to" />
        <link rel="preconnect" href="https://va.tawk.to" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />
        <link rel="preconnect" href="https://api.exchangerate-api.com" />
        <link rel="dns-prefetch" href="https://api.mymemory.translated.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = JSON.parse(localStorage.getItem('z7blox-theme') || '{}')
                var theme = stored.state && stored.state.theme
                if (theme === 'dark' || theme === 'light') {
                  document.documentElement.setAttribute('data-theme', theme)
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary font-inter min-h-screen antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
