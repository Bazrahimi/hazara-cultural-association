import { sql } from "@/app/lib/db";
import type { BlogPost } from "../../lib/definitions";

export const getBlogPosts = async (userId: number) => {
  const post = await sql<BlogPost[]>`
    SELECT
      id,
      title,
      slug,
      status,
      category,
      to_char(created_at, 'Mon DD, YYYY') AS "createdAt",
      to_char(updated_at, 'Mon DD, YYYY') AS "updatedAt"
    FROM blog_posts
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;

  return post;
};
