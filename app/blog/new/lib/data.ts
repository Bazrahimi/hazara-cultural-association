import { sql } from "@/app/lib/db";
import { BlogPostInput, PostSuccessDBReturn } from "./definitions";

export const insertBlogPost = async (opts: {
  userId: number;
  data: BlogPostInput;
  slug: string;
  eventDate: Date | null;
  publishedAt: Date | null;
}) => {
  const { userId, data, slug, eventDate, publishedAt } = opts;

  const rows = await sql<PostSuccessDBReturn[]>`
    INSERT INTO blog_posts (
      user_id,
      title,
      slug,
      content_html,
      category_id,
      status,
      hero_img_path,
      is_featured,
      is_rtl,
      event_date,
      event_location,
      published_at
    )
    VALUES (
      ${userId},
      ${data.title},
      ${slug},
      ${data.contentHtml},
      ${data.categoryId},
      ${data.status},
      ${data.heroImgPath ?? null},
      ${data.isFeatured},
      ${data.isRtl},
      ${eventDate},
      ${data.eventLocation ?? null},
      ${publishedAt}
    )
    RETURNING 
      id, 
      slug, 
      is_featured AS "isFeatured", 
      status;
  `;

  return rows[0];
};

export async function updateBlogPostRow(opts: {
  id: number;
  data: BlogPostInput;
  userId: number;
  isAdmin: boolean;
  eventDate: Date | null;
  publishedAt: Date | null;
}): Promise<PostSuccessDBReturn | null> {
  const { id, data, userId, isAdmin, eventDate, publishedAt } = opts;

  const rows = await sql<PostSuccessDBReturn[]>`
    UPDATE blog_posts
    SET
      title          = ${data.title},
      content_html   = ${data.contentHtml},
      category_id    = ${data.categoryId},
      status         = ${data.status},
      hero_img_path  = ${data.heroImgPath ?? null},
      is_featured    = ${data.isFeatured},
      event_date     = ${eventDate},
      event_location = ${data.eventLocation ?? null},
      published_at   = ${publishedAt},
      is_rtl         = ${data.isRtl}
    WHERE id = ${id}
      AND (${isAdmin} OR user_id = ${userId})
    RETURNING
      id,
      slug,
      is_featured AS "isFeatured",
      status;
  `;

  return rows[0] ?? null;
}
