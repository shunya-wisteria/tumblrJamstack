<template>
  <section>
    <v-img position="center center" :src="pageInfo.portalEyecatch" rel="preload" height="350px" cover>
      <v-row class="fill-height" justify="center" align="center">
        <div class="introMsg">{{ subTitle }}</div>
      </v-row>
    </v-img>

    <v-layout column justify="center" align="center">
      <v-container>
        <v-row align="center" justigy="center">
          <v-col cols=12>
            <p class="text-uppercase secCaption">Recent Posts</p>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>

    <PostIndex :posts="posts" />

    <v-layout column justify="center" align="center">
      <v-container>
        <v-row align="center" justigy="center">
          <v-col cols=12 align="center" style="margin-top:20px;">
            <p>
              <nuxt-link to="/posts/2" class="more" style="font-size:120%;">Read More Posts</nuxt-link>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </section>
</template>

<script setup lang="ts">
import type {PageInfo} from "~/types/pageinfo";
import type { ApiEnv } from "~/types/apienv";
import { useGetApiEnv } from "~/composables/useTumblrImp";

const config = useRuntimeConfig();
const pageInfo = ref(useState('PageInfo') as PageInfo);
const siteTitle = ref(config.public.siteTitle);
const subTitle = ref(config.public.tumblrSubtitle);

const apiEnv:ApiEnv = useGetApiEnv()
const posts = ref(await useGetPosts(1, apiEnv));

useHead({
  title:pageInfo.value.siteTitle
});

</script>

<style scoped>
.introMsg {
  font-size: 150%;
  font-weight: 300;
  font-family: 'Open Sans', Segoe UI, "メイリオ", Meiryo, sans-serif;
  ;
  color: #ECEFF1;
  background-color: #8888;
  padding: 2px 15px;
  border-radius: 3px;
}

.secCaption {
  color: rgb(var(--v-theme-post_title));
  font-size: 24px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 15px
}

.secCaption:after,
.secCaption:before {
  content: "";
  flex-grow: 1;
  height: 1px;
  background: #444;
  display: block
}

.secCaption:before {
  margin-right: .8em;
  background: linear-gradient(-90deg, #888, transparent)
}

.secCaption:after {
  margin-left: .8em;
  background: linear-gradient(90deg, #888, transparent)
}

.topLink {
  margin-top: 20px;
  margin-bottom: 20px;
}

.topLinkText {
  font-size: 100%;
  -webkit-text-stroke: 0.1px #888888;
}

.topLinkTitleText {
  margin-top: 0px;
}

.topLinkTitle {
  padding-top: 0px;
  padding-bottom: 0px;
}

.topLinkColRight {
  padding-left: 2.5px;
}

.topLinkColCenter {
  padding-left: 2.5px;
  padding-right: 2.5px;
}

.topLinkColLeft {
  padding-right: 2.5px;
}
</style>