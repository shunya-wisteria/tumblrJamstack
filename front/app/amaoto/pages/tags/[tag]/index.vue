<template>
  <h1>{{ tag }}</h1>
  <PostIndex :posts="posts"/> 
  <v-pagination v-model="page" :length="maxPage" :total-visible="5" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup lang="ts">
import { useGetApiEnv } from "~/composables/useTumblrImp";
import type { ApiEnv } from "~/types/apienv";

const route = useRoute();
const page = ref(1);
const tag = ref(route.params.tag);
const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 6;

const apiEnv:ApiEnv = useGetApiEnv();
const totalCount = await useGetPostsCountByTag(tag.value.toString(), apiEnv);
const maxPage = ref(Math.ceil(totalCount / pageLimit));

const posts = ref(await useGetPostsByTag(tag.value.toString(), page.value, apiEnv));

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/tags/" + tag.value.toString() + "/" + page.value,
  })
}

useHead({
  title:"Tag : " + tag.value
})

</script>