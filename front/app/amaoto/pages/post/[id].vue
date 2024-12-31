<template>
  <template v-if="post">
    <Post :post="(post as Post)"></Post>
    <!-- <Comment :entryId="data.id" v-if="config.public.comFormEnabled == '1'"/> -->
  </template>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post';
import type { PageInfo } from "~~/types/pageinfo";

const route = useRoute();
const id = ref(route.params.id.toString());
const post = ref(await useGetPostById(id.value) as Post);

const pageInfo = useState('PageInfo').value as PageInfo;
const pageTitle = pageInfo.title;
const config = useRuntimeConfig();
const ogUrl = config.public.metaOgUrl;

useHead({
  title:post.value.summary,
  meta:[
    { hid: 'description', name: 'description', content: post.value.abstract },
    { hid: 'og:type', property: 'og:type', content: 'article' },
    { hid: 'og:url', property: 'og:url', content: ogUrl + '/post/' + post.value.id },
    { hid: 'og:title', property: 'og:title', content: post.value.summary + " - " +  pageTitle},
    { hid: 'og:description', property: 'og:description', content: post.value.abstract },
    { hid: 'og:image', property: 'og:image', content: post.value.eyecatch == null ? '': post.value.eyecatch },
  ]
})

</script>