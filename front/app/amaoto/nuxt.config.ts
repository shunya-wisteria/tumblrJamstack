import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  ssr: true,

  // @ts-ignore
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
  ],

  vuetify: {
    vuetifyOptions: 'vuetify.config.ts'
  },

  googleFonts: {
    families: {
      'Noto+Sans+JP': true,
      'Noto+Serif+JP': true,
      'Open Sans': true,
      'Rounded Mplus 1c': true,
      'Roboto': true
    }
  },

  plugins: [
    '~/plugins/vue3-smooth-scroll.ts',
  ],

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

})