/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          dark: '#0f172a',    // Deep Slate
          light: '#f8fafc',   // Off White
          accent: '#b45309',  // Amber/Copper
          gold: '#d4af37',    // Classic Gold
          silver: '#e2e8f0',  // Light Silver
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.25em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [],
}

