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

function makeExcerpt(html: string, maxLength: number): string {
  if (!html) return "";

  const text = html
    .replace(/<[^>]+>/g, " ") // strip HTML tags
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";

  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
}

export type FeaturedBlogPost = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  hero_img_path: string | null;
  is_rtl: boolean;
  publishedAt: string | null;
  excerpt: string;
};

export async function getFeaturedPostsByCategory(
  categoryId: number,
  limit: number = 4
): Promise<FeaturedBlogPost[]> {
  const rows = await sql<
    {
      id: number;
      title: string;
      slug: string;
      category_id: number;
      hero_img_path: string | null;
      content_html: string;
      is_rtl: boolean | null;
      publishedAt: string | null;
    }[]
  >`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.category_id,
      p.hero_img_path,
      p.content_html,
      COALESCE(p.is_rtl, false) AS "is_rtl",
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'DD Mon YYYY'
      ) AS "publishedAt"
    FROM blog_posts p
    WHERE p.status = 'published'
      AND p.is_featured = true
      AND p.category_id = ${categoryId}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    category_id: row.category_id,
    hero_img_path: row.hero_img_path,
    is_rtl: !!row.is_rtl,
    publishedAt: row.publishedAt,
    excerpt: makeExcerpt(row.content_html, 220),
  }));
}

export type CategoryPost = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  hero_img_path: string | null;
  is_rtl: boolean;
  publishedAt: string | null;
  excerpt: string;
};

export async function getPublishedPostsByCategory(
  categoryId: number,
  limit: number = 20
): Promise<CategoryPost[]> {
  const rows = await sql<
    {
      id: number;
      title: string;
      slug: string;
      category_id: number;
      hero_img_path: string | null;
      content_html: string;
      is_rtl: boolean | null;
      publishedAt: string | null;
    }[]
  >`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.category_id,
      p.hero_img_path,
      p.content_html,
      COALESCE(p.is_rtl, false) AS "is_rtl",
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'DD Mon YYYY'
      ) AS "publishedAt"
    FROM blog_posts p
    WHERE p.status = 'published'
      AND p.category_id = ${categoryId}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    category_id: row.category_id,
    hero_img_path: row.hero_img_path,
    is_rtl: !!row.is_rtl,
    publishedAt: row.publishedAt,
    excerpt: makeExcerpt(row.content_html, 220),
  }));
}

export type AuthorPost = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  hero_img_path: string | null;
  is_rtl: boolean;
  publishedAt: string | null;
  excerpt: string;
  authorName: string | null;
};

export async function getPublishedPostsByAuthor(
  authorId: number,
  limit: number = 20
): Promise<AuthorPost[]> {
  const rows = await sql<
    {
      id: number;
      title: string;
      slug: string;
      category_id: number;
      hero_img_path: string | null;
      content_html: string;
      is_rtl: boolean | null;
      publishedAt: string | null;
      authorName: string | null;
    }[]
  >`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.category_id,
      p.hero_img_path,
      p.content_html,
      COALESCE(p.is_rtl, false) AS "is_rtl",
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'DD Mon YYYY'
      ) AS "publishedAt",
      -- Try full name from user_profiles, fallback to email
      COALESCE(
        CONCAT(up.first_name, ' ', up.last_name),
        u.email
      ) AS "authorName"
    FROM blog_posts p
    LEFT JOIN users u
      ON u.id = p.user_id
    LEFT JOIN user_profiles up
      ON up.user_id = p.user_id
    WHERE p.status = 'published'
      AND p.user_id = ${authorId}
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    category_id: row.category_id,
    hero_img_path: row.hero_img_path,
    is_rtl: !!row.is_rtl,
    publishedAt: row.publishedAt,
    authorName: row.authorName,
    excerpt: makeExcerpt(row.content_html, 220),
  }));
}
