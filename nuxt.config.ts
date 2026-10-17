import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/online-toy-shop/',
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/toys'],
      concurrency: 1,
      failOnError: false,
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error vuetify vite plugin
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles'
  ],
})
