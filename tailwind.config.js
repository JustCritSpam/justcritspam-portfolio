/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          grass: '#5AA351',
          dirt: '#866043',
          stone: '#7A7A7A',
          sky: '#78A7FF',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        minecraft: ['Minecraft', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
