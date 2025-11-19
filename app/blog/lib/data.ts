// app/blog/lib/data.ts
import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";

export type BlogPostDetail = {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  status: "draft" | "archived" | "published";
  category: "news" | "advocacy_event" | "announcement";
  hero_img_path: string | null;
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
      p.category,
      p.hero_img_path,
      p.is_featured,
      p.event_date,
      p.event_location,
      p.user_id AS "authorId",
      concat_ws(' ', up.first_name, up.last_name) AS "authorName",  -- 👈 NEW
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'Mon DD, YYYY'
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

export type FeaturedBlogPost = {
  id: number;
  title: string;
  slug: string;
  category: "news" | "advocacy_event" | "announcement";
  hero_img_path: string | null;
  publishedAt: string | null;
};

export async function getFeaturedBlogPosts(
  limit: number = 4
): Promise<FeaturedBlogPost[]> {
  const rows = await sql<FeaturedBlogPost[]>`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.category,
      p.hero_img_path,
      to_char(
        p.published_at AT TIME ZONE 'Australia/Melbourne',
        'Mon DD, YYYY'
      ) AS "publishedAt"
    FROM blog_posts p
    WHERE p.status = 'published'
      AND p.is_featured = true
    ORDER BY
      p.published_at DESC NULLS LAST,
      p.created_at DESC
    LIMIT ${limit};
  `;

  return rows;
}
