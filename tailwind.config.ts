import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fbf8f3',      // The exact premium background
        cocoa: '#1a1410',      // Deep rich text
        wood: '#5b3a29',       // Selection/accents
        bark: '#a87856',       // Scrollbar hover
        linen: '#f5efe6',      // Scrollbar track
        sage: '#cdbfa9',       // Scrollbar thumb
      },
      fontFamily: {
        heading: ['var(--font-italiana)', 'serif'],
        subheading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;