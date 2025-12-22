import type { BlogPostBase } from "@/app/blog/lib/definitions";
import { sql } from "@/app/lib/db";

export type BloggerPostListRow = Pick<
  BlogPostBase,
  | "id"
  | "title"
  | "slug"
  | "heroImgPath"
  | "isFeatured"
  | "isRtl"
  | "categoryId"
  | "status"
  | "createdAt"
  | "updatedAt"
>;

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
      hero_img_path  AS "heroImgPath",
      is_featured    AS "isFeatured",
      is_rtl         AS "isRtl",
      category_id    AS "categoryId",
      status,
      to_char(created_at, 'DD MON YYYY') AS "createdAt",
      to_char(updated_at, 'DD MON YYYY') AS "updatedAt"
    FROM blog_posts
    ${isAdmin ? sql`` : sql`WHERE user_id = ${userId}`}
    ORDER BY created_at DESC;
  `;

  return posts;
};

