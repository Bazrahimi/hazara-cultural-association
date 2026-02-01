import { slugify } from "@/app/(disabled)/_shop/lib/helper";
import { getCategoryLabel } from "@/app/blog/post/_lib/category";
import { join, q } from "./helper";
const blog = "/blog";
const blogPost = "/blog/post";
const blogPostCategory = `${blogPost}/category`;


export const BlogRoutes = {
  root: () => blog,
  seePostDetails: (slug: string) => `${blogPost}/${slug}`,

  blogPostGuideLines: () => `${blog}/guidelines`,

  // Author + category pages (your structure is /blog/p/u/[namePlusId] and /blog/p/[categoryId])
  categoryById: (categoryId: number) => {
    const label = getCategoryLabel(categoryId);
    const slug = slugify(label);
    return `${blogPostCategory}/${slug}-${categoryId}`;
  },
  // authorByNamePlusId: (namePlusId: string) => `/blog/u/${namePlusId}`,

  // Blog create/edit (you have /blog/new and /blog/myposts/edit/[postId])
  createNewPost: () => "/blog/auth/create-new-post",
  manageMyPosts: (params?: { tab?: string | number }) => {
    if (!params?.tab) return "/blog/auth/manage-posts";
    return `/blog/auth/manage-posts?tab=${params.tab}`;
  },
  editPost: (postId: number | string) => `/blog/auth/edit-post/${postId}`,

  // If you want preview links to respect query toggles:
  postWithQuery: (
    slug: string,
    params?: Record<string, string | number | boolean | null | undefined>,
  ) => `${join("blog", slug)}${q(params)}`,
} as const;
