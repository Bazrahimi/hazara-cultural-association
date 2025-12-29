import { sql, type SqlFragment } from "@/app/lib/db";
import { PostAuthCtx, StatusCode } from "./definitions";
import type { PostInput } from "./schema";

import {
  POST_STATUS,
  type EditPostRow,
  type PostCardRow,
  type PostInsertUpdateSuccessDBReturn,
  type PostRow,
  type PostsListRow,
} from "./definitions";

import { notFound } from "next/navigation";

export const firstOrNotFound = <T>(rows: T[]): T => {
  const row = rows[0];
  if (!row) notFound();
  return row;
};

const firstOrNull = <T>(rows: T[]) => rows[0] ?? null;

export const getPostSlugById = async (
  postId: number
): Promise<string | null> => {
  const rows = await sql<{ slug: string }[]>`
    SELECT slug
    FROM blog_posts
    WHERE id = ${postId}
    LIMIT 1;
  `;

  return rows[0]?.slug ?? null;
};
export async function getPostById(postId: number): Promise<PostRow> {
  const rows = await sql<PostRow[]>`
    SELECT
      p.id                   AS "postId",
      p.user_id              AS "userId",
      p.title,
      p.slug,
      p.content_html          AS "contentHtml",
      p.status_code          AS "statusCode",
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
      ) AS "updatedAt"
    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE p.id = ${postId}
    LIMIT 1;
  `;

  const post = firstOrNotFound(rows);

  return post;
}

async function getPostsWithWhere(
  whereFragment: SqlFragment,
  limit: number
): Promise<PostCardRow[]> {
  return sql<PostCardRow[]>`
    SELECT
      p.id              AS "postId",
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

export async function getFeaturedPostsByCategory(
  categoryId: number,
  limit: number
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status_code = ${POST_STATUS.PUBLISHED}
      AND p.is_featured = true
      AND p.category_id = ${categoryId}
    `,
    limit
  );
}

export async function getPublishedPostsByCategory(
  categoryId: number,
  limit: number
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status_code = ${POST_STATUS.PUBLISHED}
      AND p.category_id = ${categoryId}
    `,
    limit
  );
}

export async function getPublishedPostsByAuthor(
  authorId: number,
  limit: number
): Promise<PostCardRow[]> {
  return getPostsWithWhere(
    sql`
      p.status_code = ${POST_STATUS.PUBLISHED}
      AND p.user_id = ${authorId}
    `,
    limit
  );
}

export const getEditPostById = async ({
  postId,
  userId,
  isAdmin,
}: {
  postId: number;
  userId: number;
  isAdmin: boolean;
}): Promise<EditPostRow> => {
  const rows = await sql<EditPostRow[]>`
    SELECT
      id               AS "postId",
      title,
      content_html     AS "contentHtml",
      category_id      AS "categoryId",
      status_code      AS "statusCode",
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

export const getPostCount = async (
  userId: number
): Promise<Record<StatusCode, number>> => {
  const base: Record<StatusCode, number> = {
    [POST_STATUS.DRAFTED]: 0,
    [POST_STATUS.PUBLISHED]: 0,
    [POST_STATUS.ARCHIVED]: 0,
  };

  const rows = await sql<{ statusCode: StatusCode; count: number }[]>`
    SELECT
      status_code AS "statusCode",
      COUNT(*)::int AS "count"
    FROM blog_posts
    WHERE user_id = ${userId}
      AND status_code IN (
        ${POST_STATUS.DRAFTED},
        ${POST_STATUS.PUBLISHED},
        ${POST_STATUS.ARCHIVED}
      )
    GROUP BY status_code;
  `;

  for (const r of rows) base[r.statusCode] = r.count;
  return base;
};

export const getPostsByStatusCode = async ({
  statusCode,
  userId,
}: {
  statusCode: StatusCode;
  userId: number;
}) => {
  const posts = await sql<PostsListRow[]>`
    SELECT
      id             AS "postId",
      title,
      slug,
      is_featured    AS "isFeatured",
      is_rtl         AS "isRtl",
      category_id    AS "categoryId",
      status_code    AS "statusCode",
       to_char(
    updated_at AT TIME ZONE 'Australia/Melbourne',
    'DD Mon YYYY FMHH12:MI am'
  ) AS "updatedAt"
    FROM blog_posts
    WHERE user_id = ${userId}
      AND status_code = ${statusCode}
    ORDER BY created_at DESC;
  `;

  return posts;
};

const RETURNING_INSERT_UPDATE_POST: SqlFragment = sql`
  RETURNING
    id         AS postId,
    slug,
    is_featured AS "isFeatured",
    category_id AS "categoryId",
    status_code AS "statusCode",
    is_rtl      AS "isRtl"
`;

export const insertPostRow = async (opts: {
  userId: number;
  data: PostInput;
  slug: string;
  eventDate: Date | null;
}) => {
  const { userId, data, slug, eventDate } = opts;

  const rows = await sql<PostInsertUpdateSuccessDBReturn[]>`
    INSERT INTO blog_posts (
      user_id,
      title,
      slug,
      content_html,
      excerpt,
      category_id,
      status_code,
      hero_img_path,
      is_featured,
      is_rtl,
      event_date,
      event_location
    )
    VALUES (
      ${userId},
      ${data.title},
      ${slug},
      ${data.contentHtml},
      ${data.excerpt},
      ${data.categoryId},
      ${data.statusCode},
      ${data.heroImgPath ?? null},
      ${data.isFeatured},
      ${data.isRtl},
      ${eventDate},
      ${data.eventLocation ?? null}
    )
   ${RETURNING_INSERT_UPDATE_POST}
  `;

  return rows[0];
};

export async function updatePostRow(opts: {
  postId: number;
  data: PostInput;
  userId: number;
  isAdmin: boolean;
  eventDate: Date | null;
}): Promise<PostInsertUpdateSuccessDBReturn | null> {
  const { postId, data, userId, isAdmin, eventDate } = opts;

  const rows = await sql<PostInsertUpdateSuccessDBReturn[]>`
    UPDATE blog_posts
    SET
      title          = ${data.title},
      content_html   = ${data.contentHtml},
      category_id    = ${data.categoryId},
      excerpt        = ${data.excerpt},
      status_code    = ${data.statusCode},
      hero_img_path  = ${data.heroImgPath ?? null},
      is_featured    = ${data.isFeatured},
      event_date     = ${eventDate},
      event_location = ${data.eventLocation ?? null},
      is_rtl         = ${data.isRtl},
      updated_at     = now(),
      created_at     = COALESCE(${isAdmin ? (data.createdAt ?? null) : null}, created_at)
    ${whereBloggerOrAdmin({ postId, isAdmin, userId })}
    ${RETURNING_INSERT_UPDATE_POST}
  `;

  return rows[0];
}

const whereBloggerOrAdmin = ({ postId, isAdmin, userId }: PostAuthCtx) =>
  sql`WHERE id = ${postId} AND (${isAdmin} OR user_id = ${userId})`;

export const toggleFeatured = async (ctx: PostAuthCtx) => {
  const rows = await sql<{ is_featured: boolean }[]>`
    UPDATE blog_posts
    SET is_featured = NOT is_featured
    ${whereBloggerOrAdmin(ctx)}
    RETURNING is_featured;
  `;
  return firstOrNull(rows);
};

export async function setStatusCode(ctx: PostAuthCtx, statusCode: StatusCode) {
  const rows = await sql<{ status_code: number }[]>`
    UPDATE blog_posts
    SET status_code = ${statusCode}
    ${whereBloggerOrAdmin(ctx)}
    RETURNING status_code;
  `;
  return firstOrNull(rows);
}

export const deletePost = async (ctx: PostAuthCtx) => {
  const rows = await sql<{ id: number }[]>`
    DELETE FROM blog_posts
    ${whereBloggerOrAdmin(ctx)}
    RETURNING id;
  `;
  return firstOrNull(rows);
};

export const setPostCategory = async (ctx: {
  postId: number;
  newCategoryId: number;
  userId: number;
  isAdmin: boolean;
}) => {
  const rows = await sql<{ newCategoryId: number }[]>`
    UPDATE blog_posts
    SET category_id = ${ctx.newCategoryId}
    ${whereBloggerOrAdmin(ctx)}
    RETURNING category_id as "newCategoryId"
  `;
  return rows[0].newCategoryId ?? null;
};
