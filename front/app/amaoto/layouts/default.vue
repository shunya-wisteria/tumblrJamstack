<template>
  <v-app id="inspire" class="bg-background text-main_text">
    <v-navigation-drawer
      expand-on-hover
      :rail="!mdAndDown"
      v-model="drawer"
    >
    <v-list>
        <v-list-item
          v-for="(item, i) in menuItem"
          :key="i"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" style="color:rgb(var(--v-theme-menu_text));" />
          </template>
          <v-list-item-title v-text="item.title" style="color:rgb(var(--v-theme-menu_text));"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="mdAndDown"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="headline">
          <nuxt-link to="/" style="color:inherit;border-bottom:none;">
            {{ pageInfo.title }}
          </nuxt-link>
        </span>
        <span class="subTitle"></span>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
    <v-footer
      :absolute="true"
      height="120px"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        &copy; {{ new Date().getFullYear() }} {{ pageInfo.author }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import type { ApiEnv } from '~/types/apienv';
import type { PageInfo } from '~/types/pageinfo';

const { mdAndDown } = useDisplay();
const drawer = ref(false)

const apienv:ApiEnv = useGetApiEnv();
const pageInfoData = await useGetPageInfo(apienv);
const pageInfo = useState<PageInfo>('PageInfo',()=>{
  return pageInfoData as PageInfo
})

const menuItem = ref(
  [
    {
      icon: 'mdi-home-outline',
      title: 'Home',
      to: '/'
    },
    {
      icon: 'mdi-account-details-outline',
      title: 'About',
      to: '/about/'
    },
    {
      icon: 'mdi-folder-outline',
      title: 'Categories',
      to: '/categories/'
    },
    {
      icon: 'mdi-calendar',
      title: 'Archive',
      to: '/archive/'
    }
  ]
)
</script>

<style scoped>
.headline{
  color: rgb(var(--v-theme-page_title));
  font-family: 'Noto Serif JP',sans-serif!important;
  font-size: 1.5rem!important;
  font-weight: 400;
  letter-spacing: normal!important;
}
.subTitle
{
  font-weight: 100;
  font-size:80%; 
  margin-left:15px;
  font-family: "Roboto", sans-serif;
}

.navicon{
  display: block;
}

@media (max-width:530px)
{
  .subTitle{
    display: none;
  }
}

@media (min-width: 1280px)
{
  .navicon{
    display: none;
  }
}


.v-main
{
  margin-bottom: 20px;
}

.v-footer
{
  font-family: "Roboto", 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
  font-weight: 600;
  color: rgb(var(--v-theme-footer_text));
  background-color: rgb(var(--v-theme-footer_bg));
}
</style>