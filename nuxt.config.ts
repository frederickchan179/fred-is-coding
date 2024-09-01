// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'dayjs-nuxt',
    'nuxt-typed-router',
    '@scalar/nuxt',
    '@nuxtjs/google-fonts'
  ],
  colorMode: {
    classSuffix: ''
  },
  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'America/New_York'
  },
  googleFonts: {}
})
