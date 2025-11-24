import type { PostCardRow, PostStatus } from "@/app/blog/lib/definitions";
import { sql } from "@/app/lib/db";

export type BloggerPostListRow = Omit <PostCardRow, "authorName" | "hero_img_path"> & {
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
};

export const getBlogPosts = async ({
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
}) => {
  const posts = await sql<BloggerPostListRow[]>`
    SELECT
      id,
      title,
      slug,
      status,
      category_id,
      is_rtl,
      to_char(created_at, 'DD MON YYYY') AS "createdAt",
      to_char(updated_at, 'DD MON YYYY') AS "updatedAt"
    FROM blog_posts
    ${isAdmin ? sql`` : sql`WHERE user_id = ${userId}`}
    ORDER BY created_at DESC;
  `;

  return posts;
};
