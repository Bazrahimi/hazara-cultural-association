import { join, q } from "./helper";
export const BlogRoutes = {
  root: () => "/blog",
  post: (slug: string) => `/blog/post/${slug}`,
  guideLines: () => "/blog/guidelines",

  // Author + category pages (your structure is /blog/p/u/[namePlusId] and /blog/p/[categoryId])
  categoryById: (categoryId: number | string) => join("blog", "p", categoryId),
  authorByNamePlusId: (namePlusId: string) =>
    join("blog", "p", "u", namePlusId),

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
