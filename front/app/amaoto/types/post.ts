export type Post = {
  id?: string;
  slug?: string;
  post_url? :string;
  date?: string;
  timestamp?: number;
  tags?: string[];
  summary?: string;
  body?: string;
  abstract?: string;
  eyecatch?: string | null;
  type?: string;
  photos: string[];
  pageTitle?: string | null;
  linkUrl?: string | null;
}