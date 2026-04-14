import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',     
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',       
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        cabin: ['Cabin', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        border: 'var(--border)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'accent-pink': 'var(--accent-pink)',
        'accent-pink-muted': 'var(--accent-pink-muted)',
        'accent-cyan': 'var(--accent-cyan)',
        rarity: {
          comum: '#ffffff',
          incomum: '#4a90d9',
          raro: '#3cb371',
          lendario: '#cc2222',
          vintage: '#d4a017',
          godly: '#ff1493',
          ancient: '#00ced1',
          unique: '#ff6600',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',     
        'slide-up': 'slideUp 0.4s ease-out',   
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
