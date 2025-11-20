import { sql } from "@/app/lib/db";
import type { BlogPost } from "../../lib/definitions";

export const getBlogPosts = async ({
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
}) => {
  const posts = await sql<BlogPost[]>`
    SELECT
      id,
      user_id,
      title,
      slug,
      status,
      category_id,
      is_rtl,
      to_char(created_at, 'DD MON YYY') AS "createdAt",
      to_char(updated_at, 'DD MON YYYY') AS "updatedAt"
    FROM blog_posts
    ${isAdmin ? sql`` : sql`WHERE user_id = ${userId}`}
    ORDER BY created_at DESC;
  `;

  return posts;
};

