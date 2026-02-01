import { slugify } from "@/app/(disabled)/_shop/lib/helper";
import { getCategoryLabel } from "@/app/blog/post/_lib/category";
import { join, q } from "./helper";
const blog = "/blog";
const blogPost = "/blog/post";
const blogPostCategory = `${blogPost}/category`;
const blogPostAuth = `${blogPost}/auth`;
const managePosts = `${blogPostAuth}/manage-posts`;

export const BlogRoutes = {
  root: () => blog,
  seePostDetails: (slug: string) => `${blogPost}/${slug}`,
  blogPostGuideLines: () => `${blog}/guidelines`,
  categoryById: (categoryId: number) => {
    const label = getCategoryLabel(categoryId);
    const slug = slugify(label);
    return `${blogPostCategory}/${slug}-${categoryId}`;
  },
  createNewPost: () => `${blogPostAuth}/create-new-post`,
  managePosts: (params?: { tab?: string | number }) => {
    if (!params?.tab) return managePosts;
    return `${managePosts}?tab=${params.tab}`;
  },
  editPostById: (postId: number | string) => `${managePosts}/edit-post/${postId}`,


} as const;
