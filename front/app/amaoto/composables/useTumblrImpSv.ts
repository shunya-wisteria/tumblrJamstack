import type { ApiEnv } from "~/types/apienv";
import type { BlogPost, TumblrInfo, TumblrPosts } from "~/types/tumblrApiType";

// POST全件数取得
export async function useGetPostCountSv(apiEnv:ApiEnv):Promise<number>
{
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  // Post総件数取得
  const postCntUrl = apiEnv.endpoint + blogId + "/info?api_key=" + apiKey;
  const res = await fetch(
    postCntUrl,
    {
      method: "GET"
    }
  );
  const totalCount = (await res.json() as TumblrInfo).response.blog.total_posts;
  
  return totalCount;
}

// POSTルート作成
export async function useGetPostsRoute(apiEnv:ApiEnv, inTotalCount:number|null):Promise<string[]>{
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  // Post総件数取得
  const totalCount = inTotalCount ? inTotalCount : await useGetPostCountSv(apiEnv);

  // Postルート作成
  // 取得件数
  const pageLimit = 20;
  // 総ページ数
  const maxPage = Math.ceil(totalCount / pageLimit);
  
  const ids:string[] = [];
  const tags:string[] = [];
  // ページ数分繰り返し
  for(let i = 0; i < maxPage; i++)
  {
    const offset = pageLimit * i;
    const url = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&limit=" + pageLimit + "&offset=" + offset;

    // API call
    const res = await fetch(
      url,
      {
        method: "GET"
      }
    );
    const posts:BlogPost[] = (await res.json() as TumblrPosts).response.posts;
    // id一覧作成
    posts.forEach(post => {
      ids.push(post.id_string);
      post.tags.forEach(tag => {
        tags.push(tag);
      })
    });
  }
  // postルート
  const postRoutes = ids.map((id:string) => `/post/${id}/`);
  return postRoutes;

  //-- タグページのルーティング、ページ数が多すぎてAPI制限に引っかかるため使用しない
  // // タグ重複カット
  // const outTags = Array.from(new Set(tags));
  // const tagRoutesBase = await useGetTagsIndexRoute(apiEnv, outTags);
  // // タグルート
  // const tagRoutes = tagRoutesBase.map((obj:{tag:string, page:number}) => `/tags/${obj.tag}/${obj.page}`)

  // return postRoutes.concat(tagRoutes);
}

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