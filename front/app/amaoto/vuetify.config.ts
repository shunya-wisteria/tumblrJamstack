import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: { // 以下で色を指定する（下記はデフォルト色）{
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',

          page_title:'rgba(0, 0, 0, 0.87)',
          menu_text:'rgba(0, 0, 0, 0.87)',
          background:'#F9F9F9',
          main_text: '#737373',
          post_title: '#444',
          img_border: '#DDDDDD',
          code_bg: '#f1f1f1',
          code_text: '#000000',
          toc_bg:'#eceff1',
          th_bg:'#e9e9e9',
          filter:'#bbbbbb',
          footer_bg: '#F5F5F5',
          footer_text: '#555555',
          comment_bg: '#f5f5f5',
          comment_border: '#ececec'
        },
      },
      dark: {
        colors: { // 以下で色を指定する（下記はデフォルト色）{
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',

          page_title:'#FFFFFF',
          menu_text:'#FFFFFF',
          background:'#303030',
          main_text: '#FFFFFF',
          post_title: '#FFFFFF',
          img_border: '#151515',
          code_bg: '#202020',
          code_text: '#FFFFFF',
          toc_bg:'#252525',
          th_bg:'#252525',
          filter:'#151515',
          footer_bg: '#212121',
          footer_text: '#FFFFFF',
          comment_bg: '#252525',
          comment_border: '#303030'
        },
      }
    }
  }
})