'use client'

import type { ReactNode, CSSProperties } from 'react'

export default function ChatButton({ children, className, style }: { children: ReactNode; className: string; style: CSSProperties }) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).Tawk_API?.toggle) {
      (window as any).Tawk_API.toggle()
    } else {
      window.location.href = 'mailto:z7bloxsuporte@gmail.com'
    }
  }

  return (
    <button onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  )
}
