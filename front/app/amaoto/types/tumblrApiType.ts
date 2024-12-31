export type Meta = { status: number; msg: string; }

export type Avatar = { width: number; height: number; url: string; accessories: []; }

export type Theme = { header_full_width: number; header_full_height: number; header_focus_width: number; header_focus_height: number; avatar_shape: string; background_color: string; body_font: string; header_bounds: string; header_image: string; header_image_focused: string; header_image_poster: string; header_image_scaled: string; header_stretch: boolean; link_color: string; show_avatar: boolean; show_description: boolean; show_header_image: boolean; show_title: boolean; title_color: string; title_font: string; title_font_weight: string; }

export type Blog = { ask: boolean; ask_anon: boolean; ask_page_title: string; asks_allow_media: boolean; avatar: Avatar[]; can_chat: boolean; can_subscribe: boolean; description: string; is_nsfw: boolean; likes: number; name: string; posts: number; share_likes: boolean; subscribed: boolean; theme_id: number; theme: Theme; title: string; total_posts: number; updated: number; url: string; uuid: string; }

export type TumblrPhoto = {
 original_size: {
  url: string
 } 
}

export type Response = { blog: Blog; }

export type TumblrInfo = { meta: Meta; response: Response; }

export type PostInteraction = { can_like: boolean; interactability_reblog: string; interactability_blaze: string; can_reblog: boolean; can_send_in_message: boolean; can_reply: boolean; display_avatar: boolean;};

export type BlogPost = { type: string; is_blocks_post_format: boolean; blog_name: string; blog: Blog; id: number; id_string: string; is_blazed: boolean; is_blaze_pending: boolean; can_blaze: boolean; post_url: string; slug: string; date: string; timestamp: number; state: string; format: string; reblog_key: string; tags: string[]; short_url: string; summary: string; should_open_in_legacy: boolean; recommended_source: string | null; recommended_color: string | null; note_count: number; title: string; body: string; body_abstract: string; caption:string; caption_abstract:string; photos: TumblrPhoto[]; description:string; description_abstract:string; url:string}

export type ResponsePosts = {
  blog: Blog;
  posts: BlogPost[];
}

export type TumblrPosts = {
  meta: Meta;
  response: ResponsePosts;
}
