'use client';

import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  () => import('@/components/providers/ThemeProvider'),
  { ssr: false }
);

const CartDrawer = dynamic(
  () => import('@/components/cart/CartDrawer'),
  { ssr: false }
);

const TawkToChat = dynamic(
  () => import('@/components/TawkToChat'),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <CartDrawer />
      <TawkToChat />
    </ThemeProvider>
  );
}
