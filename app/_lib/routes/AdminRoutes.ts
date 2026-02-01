const admin = "/admin";
const adminWebsiteQueries = `${admin}/website-queries`;
export const AdminRoutes = {
  root: () => admin,
  // dashboard: () => "/admin",

  allPosts: () => `${admin}/all-blog-posts`,

  usersRoles: () => `${admin}/users/roles`,

  websiteQueries: () => adminWebsiteQueries,
  websiteQueryById: (id: string | number) => `${adminWebsiteQueries}/${id}`,
} as const;
