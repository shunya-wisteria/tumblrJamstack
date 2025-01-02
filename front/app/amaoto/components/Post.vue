<template>
  <section class="postframe post">
    <h1 class="textarea" v-if="post.pageTitle != null">{{ post?.pageTitle }}</h1>

    <blockquote v-if="post.type == 'link'">
      <a :href="post.linkUrl ? post.linkUrl : '/'" target="_blank">
        {{ post?.pageTitle }}
      </a>
    </blockquote>

    <v-carousel height="100%" show-arrows="hover">
      <template v-for="photo in post.photos" v-if="post.type == 'photo'">
        <v-carousel-item
          :src="photo"
          cover
        ></v-carousel-item>
      </template>
    </v-carousel>

    <div v-html="post.body" style="margin-top:30px; " class="textarea"></div>

    <div style="margin-top: 50px;">
      <v-btn depressed large color="blue-grey-lighten-2" width="100%" :href="post.post_url" target="_blank">Postをtumblrで開く</v-btn>
    </div>
    
    <v-container style="margin-top: 50px;">
      <v-row align="center" justify="center">
        <v-col xxl="4" xl="4" lg="4" md="4" sm="4" xs="12" cols="12" align="left" justigy="center" style="padding: 0px;">
          <span style="font-size:80%;" class="textarea"><v-icon style="font-size: 100%; padding-bottom: 1.5px; margin-right: 1px;">mdi-clock-time-four-outline</v-icon>{{ dateFormat(post.date as string) }}</span>
        </v-col>
        <v-col xxl="8" xl="8" lg="8" md="8" sm="8" xs="12" cols="12" align="right" justify="center">
          <v-chip v-for="(t, index) in (post.tags as any)" :key="index" :href="tumblrURL + '/tagged/' + t + '/'" target="_blank">
          <!-- <v-chip v-for="(t, index) in (post.tags as any)" :key="index" :to="'/tags/' + t"> -->
            <v-avatar left>
              <v-icon light style="padding-top:3px;">mdi-tag-outline</v-icon>
            </v-avatar>
              {{ t }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

  </section>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';

interface Props {
  post: Post,
}

const { post } = defineProps<Props>();
const config = useRuntimeConfig();
const tumblrURL = ref("https://" + config.public.tumblrBlogId)

</script>

<style scoped>
.tocs {
  border-radius: 2px;
  filter: drop-shadow(2px 2px 4px rgb(var(--v-theme-filter)));
  padding: 15px 20px;
  margin: 20px 8px;
  width: 95%;
  max-width: 450px;
}

.toc {
  list-style-type: none;
  line-height: 200%;
}

.toc_h2 {
  margin-left: 5px;
}

.toc_h3 {
  margin-left: 15px;
}
</style>