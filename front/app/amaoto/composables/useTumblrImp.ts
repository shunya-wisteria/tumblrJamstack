import type { PageInfo } from "~/types/pageinfo";
import type { BlogPost, TumblrInfo, TumblrPosts } from "~/types/tumblrApiType";
import type { Post } from "~/types/post";
import { load } from 'cheerio';
import type { ApiEnv } from "~/types/apienv";

export function useGetApiEnv():ApiEnv{
  const config = useRuntimeConfig();
  const apiEnv:ApiEnv = {
    apiKey : config.tumblrApiKey ? config.tumblrApiKey : config.public.tumblrApiKey,
    blogId: config.public.tumblrBlogId,
    endpoint: config.public.tumblrApiEndpoint,
    pageLimit: Number(config.public.pageLimit)
  }
  return apiEnv;
}

export async function useGetPageInfo(apiEnv:ApiEnv) {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  const url:string = apiEnv.endpoint + blogId + "/info?api_key=" + apiKey;

  const { data } = await useAsyncData(
    "PageInfo",
    () => $fetch(url, {method:"GET", key:"PageInfo"})
  )
  const res:TumblrInfo = data.value as TumblrInfo;

  const pageInfo:PageInfo = {
    title: res.response.blog.title,
    author: res.response.blog.name,
    portalEyecatch: res.response.blog.theme.header_image,
    postCount: res.response.blog.posts
  }

  return pageInfo;
}

export async function useGetPosts(pageNo:number, apiEnv:ApiEnv) {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  const pageLimit:number = apiEnv.pageLimit;
  const offset:number = (pageNo - 1) * pageLimit;

  const url:string = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&limit=" + pageLimit + "&offset=" + offset;
  const keyStr = "Posts_" + pageNo.toString();


  const { data } = await useAsyncData(
    keyStr,
    () => $fetch(url, {method:"GET", key:keyStr})
  )
  const res:TumblrPosts = data.value as TumblrPosts;

  const posts:Post[] = []

  res.response.posts.forEach(tpost => {
    const post:Post = mapTpost2Post(tpost);
    posts.push(post);
  })
  return posts;
}

export async function useGetPostsByTag(tag:string, pageNo:number, apiEnv:ApiEnv) {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  const pageLimit:number = apiEnv.pageLimit;
  const offset:number = (pageNo - 1) * pageLimit;

  const url:string = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&limit=" + pageLimit + "&offset=" + offset + "&tag=" + tag;
  const keyStr = "Posts_" + tag + "_" + pageNo.toString();

  const { data } = await useAsyncData(
    keyStr,
    () => $fetch(url, {method:"GET", key:keyStr})
  )
  const res:TumblrPosts = data.value as TumblrPosts;

  const posts:Post[] = []

  res.response.posts.forEach(tpost => {
    const post:Post = mapTpost2Post(tpost);
    posts.push(post);
  })
  return posts;
}

export async function useGetPostsCountByTag(tag:string, apiEnv:ApiEnv):Promise<number> {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;
  const pageLimit:number = apiEnv.pageLimit;

  const url:string = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&limit=" + pageLimit + "&offset=0&tag=" + tag;
  const keyStr = "Posts_" + tag + "_0";


  const { data } = await useAsyncData(
    keyStr,
    () => $fetch(url, {method:"GET", key:keyStr})
  )
  const res:TumblrPosts = data.value as TumblrPosts;

  return res.response.total_posts;
}

export async function useGetPostById(id:string, apiEnv:ApiEnv) {
  const apiKey:string = apiEnv.apiKey;
  const blogId:string = apiEnv.blogId;

  const url:string = apiEnv.endpoint + blogId + "/posts?api_key=" + apiKey + "&id=" + id;
  const keyStr = "Post_" + id;

  const { data } = await useAsyncData(
    keyStr,
    () => $fetch(url, {method:"GET", key:keyStr})
  )
  const res:TumblrPosts = data.value as TumblrPosts;
  
  if(res.response.posts.length != 1)
  {
    return;
  }

  return mapTpost2Post(res.response.posts[0]);
}

function mapTpost2Post(tpost:BlogPost):Post
{
  const post:Post = {
    id: tpost.id_string,
    slug: tpost.slug,
    post_url: tpost.post_url,
    date: tpost.date,
    timestamp: tpost.timestamp,
    tags: tpost.tags,
    summary: tpost.summary,
    body: tpost.body,
    abstract: "",
    eyecatch: null,
    type: tpost.type,
    photos: [],
    pageTitle: null
  };
  
  // 旧tumblr photo形式対応
  if(tpost.type == "photo")
  {
    if(tpost.caption_abstract != null)
    {
      const $ = load(tpost.caption_abstract);
      // アイキャッチ画像
      post.eyecatch = tpost.photos[0].original_size.url;
      $('p').each((i, elem) => {
        post.abstract = $(elem).text();
      })
      $('h1').each((i, elem) => {
        post.summary = $(elem).text();
      })
    }
    else
    {
      const $ = load(tpost.caption);
      // アイキャッチ画像
      post.eyecatch = tpost.photos[0].original_size.url;
      $('p').each((i, elem) => {
        if(i == 0) post.abstract = $(elem).text();
      })
      $('h1').each((i, elem) => {
        if(i ==0) post.summary = $(elem).text();
      })
    }
    post.body = tpost.caption;

    tpost.photos.forEach(tphoto => {
      post.photos.push(tphoto.original_size.url)
    })
  }
  // 旧tumblr link形式対応
  else if(tpost.type == "link")
  {
    if(tpost.description_abstract != null)
    {
      const $ = load(tpost.description_abstract);
      $('p').each((i, elem) => {
        post.abstract = $(elem).text();
      })
    }
    else
    {
      const $ = load(tpost.description);
      $('p').each((i, elem) => {
        if(i ==0) post.abstract = $(elem).text();
      })
    }
    post.body = tpost.description;
    post.pageTitle = tpost.title;
    post.linkUrl = tpost.url;
  }
  else
  {
    if(tpost.body_abstract != null)
    {
      const $ = load(tpost.body_abstract);
      // アイキャッチ画像
      $('img').each((i, elem) => {
        const imgs = $(elem).attr('srcset')?.split(",");
        if(imgs != null && imgs != undefined && imgs.length > 0)
        {
          post.eyecatch = imgs[imgs.length - 1].split(" ")[1]
        }
        else
        {
          post.eyecatch = $(elem).attr('src');
        }
      })
      $('p').each((i, elem) => {
        post.abstract = $(elem).text();
      })
    }
    else
    {
      const $ = load(tpost.body);
      // アイキャッチ画像
      $('img').each((i, elem) => {
        if(i == 0)
        {
          const imgs = $(elem).attr('srcset')?.split(",");
          if(imgs != null && imgs != undefined && imgs.length > 0)
          {
            post.eyecatch = imgs[imgs.length - 1].split(" ")[1]
          }
          else
          {
            post.eyecatch = $(elem).attr('src');
          }
        }
      })
      $('p').each((i, elem) => {
        if(i == 0) post.abstract = $(elem).text();
      })
    }
    post.pageTitle = tpost.title;
  }

  // abstractの文字数調整
  if(post.abstract != null && post.abstract != undefined && post.abstract.length > 100)
  {
    post.abstract = post.abstract?.substring(0,100) + "...";
  }
  
  return post;
}