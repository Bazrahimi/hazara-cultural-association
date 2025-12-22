import { sql } from "@/app/lib/db";
import { PostRow } from "../../lib/definitions";

import { notFound } from "next/navigation";

export async function getPostById(postId: number): Promise<PostRow> {
  const rows = await sql<PostRow[]>`
    SELECT
      p.id,
      p.user_id              AS "userId",
      p.title,
      p.slug,
      p.content_html          AS "contentHtml",
      p.status,
      p.category_id            AS "categoryId",
      p.hero_img_path          AS "heroImgPath",
      p.is_featured            AS "isFeatured",
      p.is_rtl                 AS "isRtl",
      p.event_date             AS "eventDate",
      p.event_location         AS "eventLocation",
      concat_ws(' ', up.first_name, up.last_name) AS "authorName",  -- 👈 NEW
      to_char(
      p.updated_at AT TIME ZONE 'Australia/Melbourne',
      'DD Mon YYYY FMHH12:MI am'
      ) AS "updatedAt",

      to_char(
      p.created_at AT TIME ZONE 'Australia/Melbourne',
      'DD Mon YYYY FMHH12:MI am'
       ) AS "createdAt"


    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE p.id = ${postId}
    LIMIT 1;
  `;

  const post = rows[0];

  if (!post) {
    notFound();
  }

  return post;
}
