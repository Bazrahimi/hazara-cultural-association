import { sql } from "@/app/lib/db";
import type { BlogPost } from "../../lib/definitions";
import { delay } from "@/app/lib/helper";

export const getBlogPosts = async (userId: number) => {
  await delay(5000)
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
