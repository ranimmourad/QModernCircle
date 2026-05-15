import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F3EFE8',
        cocoa: '#4A3728',
        bark: '#6B5744',
        terracotta: '#C27C5B',
        olive: '#8FA78F',
      },
      fontFamily: {
        display: ['var(--font-italiana)', 'serif'],
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'reveal': 'reveal 1.4s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)', letterSpacing: '0.5em' },
          '100%': { opacity: '1', transform: 'translateY(0)', letterSpacing: '0.25em' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
