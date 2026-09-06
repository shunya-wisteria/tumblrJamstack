import type { ApiEnv } from "~/types/apienv";
import type { BlogPost, TumblrInfo, TumblrPosts } from "~/types/tumblrApiType";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// POSTSルート作成
export async function useGetPostsIndexRoute(totalCount:number, pageLimit:number):Promise<string[]>
{
  // 総ページ数
  const maxPage = Math.ceil(totalCount / pageLimit);
  const pagess:string[] = [];
  // ページ数分繰り返し
  for(let i = 0; i < maxPage; i++)
  {
    pagess.push((i+1).toString());
  }

  return pagess.map((page:string) => `/posts/${page}/`);
}

export async function useCrawlAllPages(apiEnv: ApiEnv) {
  const cache: Record<string, any> = {}
  const routes: string[] = []
  const postRoutes: string[] = []

  let page = 1
  let nextUrl: string | null =
    `${apiEnv.endpoint}${apiEnv.blogId}/posts?api_key=${apiEnv.apiKey}&limit=${apiEnv.pageLimit}`

  while (nextUrl) {
    await sleep(500) // API連続call抑止

    const res:any = await fetch(nextUrl)

    if (res.status === 429) {
      // API rate limit hit, wait and retry
      console.warn(`Rate limited at page ${page}, waiting 10s...`)
      await sleep(10000)
      continue
    }

    if (!res.ok) {
      throw new Error(`Tumblr API error: ${res.status} at page ${page}`)
    }
    const json = await res.json()

    routes.push(`/posts/${page}/`)
    // キャッシュにページ全体を保存
    cache[`/posts/${page}/`] = json.response.posts

    // キャッシュに個別のPOSTも保存
    json.response.posts.forEach((post: any) => {
      cache[`/post/${post.id_string}/`] = post
      postRoutes.push(`/post/${post.id_string}/`)
    })

    const nextHref = json.response._links?.next?.href
    if (nextHref) {
      const nextUrlObj = new URL(`https://api.tumblr.com${nextHref}`)
      nextUrlObj.searchParams.set('api_key', apiEnv.apiKey)
      nextUrl = nextUrlObj.toString()
    } else {
      nextUrl = null
    }

    page++
  }
  return { routes, cache, postRoutes }
}


// Tagsルート作成
export async function useGetTagsIndexRoute(apiEnv:ApiEnv, tags:string[]):Promise<{tag:string, page:number}[]> {
  const tagRoute:{tag:string, page:number}[] = []
  
  for(let i = 0; i < tags.length; i++)
  {
    console.log("tags:" + i + "/" + tags.length);
    const totalCount = await useGetPostsCountByTagSv(tags[i], apiEnv);
    for(let j = 0; j < totalCount; j++)
    {
      tagRoute.push({tag:tags[i], page:j+1})
    }
  }
  return tagRoute;
}

export async function useGetPostsCountByTagSv(tag:string, apiEnv:ApiEnv):Promise<number> {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  const pageLimit:number = apiEnv.pageLimit;

  const url:string = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&limit=" + pageLimit + "&offset=0&tag=" + tag;

  // API call
  const res = await fetch(
    url,
    {
      method: "GET"
    }
  );
  const totalCount = (await res.json() as TumblrPosts).response.total_posts;

  return totalCount;
}