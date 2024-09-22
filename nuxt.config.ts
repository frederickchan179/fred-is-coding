// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    rootAttrs: {
      class: 'app-root'
    }
  },
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
    '@nuxtjs/google-fonts',
    '@hebilicious/vue-query-nuxt',
    'nuxt-lodash',
    '@morev/vue-transitions/nuxt',
    'floating-vue/nuxt',
    'nuxt-snackbar',
    'nuxt-viewport'
  ],
  imports: {
    dirs: ['./stores']
  },
  css: ['./assets/styles/app.css'],
  runtimeConfig: {
    public: {
      githubApiToken: ''
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  colorMode: {
    classSuffix: ''
  },
  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'America/New_York'
  },
  googleFonts: {
    display: 'swap',
    families: {
      Manrope: [800],
      'Space Mono': [400, 700],
      Ubuntu: [400, 500, 700]
    }
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },
  viewport: {
    breakpoints: {
      xxs: 320,
      xs: 375,
      sm: 640,
      md: 768,
      lg: 990,
      xl: 1280,
      '2xl': 1440,
      '3xl': 1600
    },
    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md'
    },
    fallbackBreakpoint: 'lg'
  }
})
