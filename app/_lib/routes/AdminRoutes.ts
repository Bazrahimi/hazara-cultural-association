import { join } from "./helper";
export const AdminRoutes = {
  root: () => "/admin",
  // dashboard: () => "/admin",

  allPosts: () => "/admin/all-blog-posts",

  usersRoles: () => "/admin/users/roles",

  websiteQueries: () => "/admin/website-queries",
  websiteQuery: (id: string | number) => join("admin", "website-queries", id),
} as const;
