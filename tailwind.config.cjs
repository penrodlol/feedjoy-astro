const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Taviraj', ...fontFamily.sans],
        fancy: ['Kaisei Tokumin', ...fontFamily.sans],
      },
      textColor: { 1: '#d0d0d0', 2: '#7b7b7b' },
      backgroundColor: { 1: '#0e0f11', 2: '#151515', 3: '#242424' },
      colors: { brand: '#fff' },
      spacing: {
        'fluid-1': 'clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)',
        'fluid-2': 'clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)',
        'fluid-3': 'clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)',
        'fluid-4': 'clamp(1rem, calc(0.22rem + 3.9vw), 3rem)',
        'fluid-5': 'clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)',
        'fluid-6': 'clamp(2rem, calc(0.44rem + 7.8vw), 6rem)',
        'fluid-7': 'clamp(3rem, calc(0.66rem + 11.71vw), 9rem)',
      },
      // prettier-ignore
      boxShadow: { DEFAULT: '0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)' },
      animation: { 'fade-in': 'fade-in 0.2s ease-in-out' },
      keyframes: { 'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } } },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [
    require('tailwindcss-fluid-type'),
    ({ theme, addBase }) =>
      addBase({
        '*': {
          scrollbarColor: `${theme('backgroundColor.2')} transparent`,
          scrollbarWidth: 'thin',
          '::-webkit-scrollbar': {
            width: `${theme('spacing.2')}`,
            height: `${theme('spacing.2')}`,
            '&-thumb': { backgroundColor: theme('backgroundColor.2') },
          },
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.brand')}`,
            outlineWidth: theme('outlineWidth.1'),
            outlineOffset: theme('outlineOffset.4'),
            borderRadius: theme('borderRadius.sm'),
          },
        },
      }),
  ],
};
