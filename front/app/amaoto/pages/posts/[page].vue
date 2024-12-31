<template>
  <h1>Posts</h1>
  <PostIndex :posts="posts"/> 
  <v-pagination v-model="page" :length="maxPage" :total-visible="5" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup lang="ts">
import type {PageInfo} from "~/types/pageinfo";

const route = useRoute();
const page = ref(Number(route.params.page) ? Number(route.params.page) : 1);
const config = useRuntimeConfig();
const pageLimit = Number(config.public.pageLimit) > 0 ? Number(config.public.pageLimit) : 6;
const pageInfo = ref(useState('PageInfo') as PageInfo);
const totalCount = pageInfo.value.postCount ? pageInfo.value.postCount : 0;
const maxPage = ref(Math.ceil(totalCount / pageLimit));

const posts = ref(await useGetPosts(page.value));

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/posts/" + page.value,
  })
}

</script>