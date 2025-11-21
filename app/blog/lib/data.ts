// app/blog/lib/data.ts
import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";

export type BlogPostDetail = {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  status: "draft" | "archived" | "published";
  category_id: number;
  hero_img_path: string | null;
  is_rtl: boolean;
  event_date: string | null;
  event_location: string | null;
  is_featured: boolean;
  publishedAt: string | null;
  authorName: string | null; // ← NEW
  authorId: number;
};

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail> {
  const rows = await sql<BlogPostDetail[]>`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.content_html,
      status,
      p.category_id,
      p.hero_img_path,
      p.is_featured,
      p.is_rtl,
      p.event_date,
      p.event_location,
      p.user_id AS "authorId",
      concat_ws(' ', up.first_name, up.last_name) AS "authorName",  -- 👈 NEW
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'DD MON YYYY'
      ) AS "publishedAt"
    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE p.slug = ${slug}
    LIMIT 1;
  `;

  const post = rows[0];

  if (!post) {
    notFound();
  }

  return post;
}

type BlogPostCard = {
  id: number;
  title: string;
  slug: string;
  hero_img_path: string | null;
  is_rtl: boolean;
  authorName: string;
};

export async function getFeaturedPostsByCategory(
  categoryId: number,
  limit: number = 4
): Promise<BlogPostCard[]> {
  const rows = await sql<BlogPostCard[]>`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.hero_img_path,
      p.is_rtl,
      CONCAT_WS(' ', up.first_name, up.last_name) AS "authorName"

    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id

    WHERE p.status = 'published'
      AND p.is_featured = true
      AND p.category_id = ${categoryId}

    ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
    LIMIT ${limit};
  `;

  return rows;
}

export async function getPublishedPostsByCategory(
  categoryId: number,
  limit: number = 20
): Promise<BlogPostCard[]> {
  const rows = await sql<BlogPostCard[]>`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.hero_img_path,
      p.is_rtl,
      CONCAT_WS(' ', up.first_name, up.last_name) AS "authorName"

    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE p.status = 'published'
      AND p.category_id = ${categoryId}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows;
}

export async function getPublishedPostsByAuthor(
  authorId: number,
  limit: number = 20
): Promise<BlogPostCard[]> {
  const rows = await sql<BlogPostCard[]>`
     SELECT
      p.id,
      p.title,
      p.slug,
      p.hero_img_path,
      p.is_rtl,
      CONCAT_WS(' ', up.first_name, up.last_name) AS "authorName"

    FROM blog_posts p
    LEFT JOIN user_profiles up ON up.user_id = p.user_id
    WHERE p.status = 'published'
      AND p.user_id = ${authorId}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows;
}
