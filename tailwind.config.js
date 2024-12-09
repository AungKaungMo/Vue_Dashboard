/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgColor: 'var(--bgColor)',
        primaryBgColor: 'var(--primaryBgColor)',
        secondaryColor: 'var(--secondaryColor)',
        commonColor: 'var(--commonColor)',
        hoverBgColor: 'var(--hoverBackground)'
      }
    }
  },
  plugins: []
}
