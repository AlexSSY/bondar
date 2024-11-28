/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.6875rem', { lineHeight: '1rem' }], // 11px
      sm: ['0.8125rem', { lineHeight: '1.25rem' }], // 13px
      base: ['0.9375rem', { lineHeight: '1.5rem' }], // 15px
      lg: ['1.0625rem', { lineHeight: '1.75rem' }], // 17px
      xl: ['1.1875rem', { lineHeight: '1.75rem' }], // 19px
      '2xl': ['1.375rem', { lineHeight: '2rem' }], // 22px
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // 27px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['2.875rem', { lineHeight: '1' }], // 46px
      '6xl': ['3.875rem', { lineHeight: '1' }], // 61px
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
