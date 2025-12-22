// app/blog/lib/data.ts
import { sql, SqlFragment } from "@/app/lib/db";
import { notFound } from "next/navigation";
import type { PostCardRow, PostDetailRow } from "./definitions";

async function getPostsWithWhere(
  whereFragment: SqlFragment,
  limit: number
): Promise<PostCardRow[]> {
  return sql<PostCardRow[]>`
    SELECT
      p.id,
      p.user_id         AS "userId",
      p.title,
      p.slug,
      p.hero_img_path    AS "heroImgPath",
      p.is_featured      AS "isFeatured",
      p.category_id      AS "categoryId",
      p.is_rtl           AS "isRtl",
      CONCAT_WS(' ', up.first_name, up.last_name) AS "authorName"
    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE ${whereFragment}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;
}

export async function getPostById(postId: number): Promise<PostDetailRow> {
  const rows = await sql<PostDetailRow[]>`
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
        'DD MON YYYY'
      ) AS "updatedAt",
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'DD MON YYYY'
      ) AS "publishedAt"

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

export async function getFeaturedPostsByCategory(
  categoryId: number,
  limit: number = 4
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status = 'published'
      AND p.is_featured = true
      AND p.category_id = ${categoryId}
    `,
    limit
  );
}

export async function getPublishedPostsByCategory(
  categoryId: number,
  limit: number = 20
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status = 'published'
      AND p.category_id = ${categoryId}
    `,
    limit
  );
}

export async function getPublishedPostsByAuthor(
  authorId: number,
  limit: number = 20
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status = 'published'
      AND p.user_id = ${authorId}
    `,
    limit
  );
}
