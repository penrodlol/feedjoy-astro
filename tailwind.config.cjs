/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Nunito'] },
      textColor: { 1: '#E2E4ED', 2: '#B6BAC8' },
      backgroundColor: { 1: '#0F1014', 2: '#1F1F24' },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      boxShadow: {
        DEFAULT:
          '0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)',
      },
      animation: { 'fade-in': 'fade-in 0.25s ease-in-out' },
      keyframes: { 'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } } },
    },
  },
  plugins: [require('tailwindcss-fluid-type')],
};
