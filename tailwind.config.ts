import type { Config } from 'tailwindcss'
import tailwindBaseFontSize from 'tailwindcss-base-font-size'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}',
    './error.{js,ts,vue}'
  ],
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '990px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1600px'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    tailwindBaseFontSize({
      baseFontSize: 16
    })
  ]
} as Partial<Config>
