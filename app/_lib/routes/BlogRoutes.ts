import { slugify } from "@/app/(disabled)/_shop/lib/helper";
import { getCategoryLabel } from "@/app/blog/post/_lib/category";
import { join, q } from "./helper";
export const BlogRoutes = {
  root: () => "/blog",
  post: (slug: string) => `/blog/post/${slug}`,

  guideLines: () => "/blog/guidelines",

  // Author + category pages (your structure is /blog/p/u/[namePlusId] and /blog/p/[categoryId])
  categoryById: (categoryId: number) => {
    const label = getCategoryLabel(categoryId);
    const slug = slugify(label);
    return `/blog/post/category/${slug}-${categoryId}`;
  },
  // authorByNamePlusId: (namePlusId: string) => `/blog/u/${namePlusId}`,

  // Blog create/edit (you have /blog/new and /blog/myposts/edit/[postId])
  new: () => "/blog/auth/new",
  manageMyPosts: (params?: { tab?: string | number }) => {
    if (!params?.tab) return "/blog/auth";
    return `/blog/auth?tab=${params.tab}`;
  },
  edit: (postId: number | string) => `/blog/auth/edit/${postId}`,

  // If you want preview links to respect query toggles:
  postWithQuery: (
    slug: string,
    params?: Record<string, string | number | boolean | null | undefined>,
  ) => `${join("blog", slug)}${q(params)}`,
} as const;
