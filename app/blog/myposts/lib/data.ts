import type { BlogPostBase } from "@/app/blog/lib/definitions";
import { sql } from "@/app/lib/db";

export type BloggerPostListRow = Pick<
  BlogPostBase,
  | "id"
  | "userId"
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
      p.id,
      p.user_id        AS "userId",
      p.title,
      p.slug,
      p.hero_img_path  AS "heroImgPath",
      p.is_featured    AS "isFeatured",
      p.is_rtl         AS "isRtl",
      p.category_id    AS "categoryId",
      p.status,
      to_char(p.created_at, 'DD MON YYYY') AS "createdAt",
      to_char(p.updated_at, 'DD MON YYYY') AS "updatedAt"
    FROM blog_posts
    ${isAdmin ? sql`` : sql`WHERE user_id = ${userId}`}
    ORDER BY created_at DESC;
  `;

  return posts;
};
