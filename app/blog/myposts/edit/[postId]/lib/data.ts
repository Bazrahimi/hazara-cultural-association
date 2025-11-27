// app/blog/edit/lib/data.ts
import type { BlogPostBase } from "@/app/blog/lib/definitions";
import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";

export type EditSinglePost = Pick<
  BlogPostBase,
  | "id"
  | "title"
  | "contentHtml"
  | "categoryId"
  | "status"
  | "heroImgPath"
  | "isFeatured"
  | "eventDate"
  | "eventLocation"
  | "isRtl"
>;

export const getEditPostById = async ({
  postId,
  userId,
  isAdmin,
}: {
  postId: number;
  userId: number;
  isAdmin: boolean;
}): Promise<EditSinglePost> => {
  const rows = await sql<EditSinglePost[]>`
    SELECT
      id,
      title,
      content_html     AS "contentHtml",
      category_id      AS "categoryId",
      status,
      hero_img_path    AS "heroImgPath",
      is_featured      AS "isFeatured",
      event_date       AS "eventDate",
      event_location   AS "eventLocation",
      is_rtl           AS "isRtl"
    FROM blog_posts
    WHERE id = ${postId}
      AND (${isAdmin} OR user_id = ${userId})
    LIMIT 1;
  `;

  const post = rows[0];

  if (!post) {
    // either not found OR not authorised
    notFound();
  }

  return post;
};
