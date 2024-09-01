// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  }
})
