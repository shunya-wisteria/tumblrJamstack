<template>
  <h1>Posts</h1>
  <PostIndex :posts="posts"/> 
  <v-pagination v-model="page" :length="maxPage" :total-visible="4" v-on:click="OnPaging" rounded="rounded-lg" color="#7D8692"></v-pagination>
</template>

<script setup lang="ts">
import { useGetApiEnv } from "~/composables/useTumblrImp";
import type { ApiEnv } from "~/types/apienv";
import type {PageInfo} from "~/types/pageinfo";

const apiEnv:ApiEnv = useGetApiEnv();
const route = useRoute();
const page = ref(Number(route.params.page) ? Number(route.params.page) : 1);
const pageLimit = apiEnv.pageLimit > 0 ? apiEnv.pageLimit : 6;
const pageInfo = ref(useState('PageInfo') as PageInfo);
const totalCount = pageInfo.value.postCount ? pageInfo.value.postCount : 0;
const maxPage = ref(Math.ceil(totalCount / pageLimit));

const posts = ref(await useGetPosts(page.value, apiEnv));

// Pagination EventHandler 
const OnPaging = () => {
  const router = useRouter();
  router.push({
    path : "/posts/" + page.value + "/",
  })
}

</script>