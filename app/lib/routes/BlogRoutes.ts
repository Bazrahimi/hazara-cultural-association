import { getCategoryLabel } from "@/app/blog/lib/category";
import { join, q } from "./helper";
import { slugify } from "@/app/shop/lib/helper";
export const BlogRoutes = {
  root: () => "/blog",
  post: (slug: string) => `/blog/post/${slug}`,

  guideLines: () => "/blog/guidelines",

  // Author + category pages (your structure is /blog/p/u/[namePlusId] and /blog/p/[categoryId])
  categoryById: (categoryId:number) => {
    const label = getCategoryLabel(categoryId)
    const slug = slugify(label)
    return `/blog/post/category/${slug}?categoryId=${categoryId}`
  } ,
  // authorByNamePlusId: (namePlusId: string) => `/blog/u/${namePlusId}`,
    

  // Blog create/edit (you have /blog/new and /blog/myposts/edit/[postId])
  new: () => "/blog/new",
  myPosts: () => "/blog/myposts",
  edit: (postId: number | string) => `/blog/myposts/edit/${postId}`,

  // If you want preview links to respect query toggles:
  postWithQuery: (
    slug: string,
    params?: Record<string, string | number | boolean | null | undefined>
  ) => `${join("blog", slug)}${q(params)}`,
} as const;
