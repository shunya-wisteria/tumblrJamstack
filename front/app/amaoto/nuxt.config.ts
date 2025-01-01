import { defineNuxtConfig } from 'nuxt/config'
import { useGetPostCountSv, useGetPostsRoute, useGetPostsIndexRoute } from './composables/useTumblrImpSv'
import type { ApiEnv } from './types/apienv'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      titleTemplate: '%s - ' + process.env.SITE_TITLE,
      title: process.env.SITE_TITLE,
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.META_DESCRIPTION },
        { hid: 'theme-color', name: 'theme-color', content: '#E8E8EF'},
  
        { hid: 'og:site_name', property: 'og:site_name', content: process.env.SITE_TITLE },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: process.env.META_OG_URL },
        { hid: 'og:title', property: 'og:title', content: process.env.SITE_TITLE },
        { hid: 'og:description', property: 'og:description', content: process.env.META_DESCRIPTION },
        { hid: 'og:image', property: 'og:image', content: process.env.META_OG_IMG },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' }
      ]
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig){
      const apiEnv:ApiEnv = {
        apiKey: process.env.TUMBLR_API_KEY ? process.env.TUMBLR_API_KEY : "",
        blogId: process.env.TUMBLR_BLOG_ID ? process.env.TUMBLR_BLOG_ID : "",
        endpoint: process.env.TUMBLR_API_ENDPOINT ? process.env.TUMBLR_API_ENDPOINT : "",
        pageLimit: process.env.PAGE_LIMIT ? Number(process.env.PAGE_LIMIT) : 0
      }

      // Post総件数
      const totalCount = await useGetPostCountSv(apiEnv);
      // Postルート
      const ids = await useGetPostsRoute(apiEnv, totalCount);
      nitroConfig.prerender?.routes?.push(...ids);
      // Post一覧ルート
      const pages = await useGetPostsIndexRoute(totalCount, apiEnv.pageLimit);
      nitroConfig.prerender?.routes?.push(...pages);
    }
  },
  
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

  runtimeConfig:{
    tumblrApiKey : process.env.TUMBLR_API_KEY,
    public:{
      tumblrApiKey : process.env.TUMBLR_DEV_API_KEY,
      tumblrBlogId : process.env.TUMBLR_BLOG_ID,
      tumblrApiEndpoint : process.env.TUMBLR_API_ENDPOINT,
      tumblrSubtitle : process.env.PAGE_SUBTITLE,
      pageLimit : process.env.PAGE_LIMIT, 
      metaOgUrl: process.env.META_OG_URL,
      extAbout: process.env.EXT_ABOUT,
      extArchive: process.env.EXT_ARCHIVE
    }
  }

})