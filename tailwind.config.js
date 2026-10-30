/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F3E6CC',
        paper: '#EADBBE',
        kred: '#B23A2E',
        forest: '#2E5339',
        mustard: '#D9A53A',
        ink: '#3A2A1E',
        brand: { DEFAULT: '#0C8A3E', dark: '#086B30', light: '#E9F7EE' },
      },
      fontFamily: {
        rozha: ['"Rozha One"', 'serif'],
        hand: ['Kalam', 'cursive'],
        type: ['"Special Elite"', 'monospace'],
        lora: ['Lora', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
