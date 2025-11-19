// app/blog/lib/data.ts
import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";

export type BlogPostDetail = {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  category: "news" | "advocacy_event" | "announcement";
  hero_img_path: string | null;
  event_date: string | null;
  event_location: string | null;
  publishedAt: string | null;
};

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail> {
  const rows = await sql<BlogPostDetail[]>`
    SELECT
      id,
      title,
      slug,
      content_html,
      category,
      hero_img_path,
      event_date,
      event_location,
      to_char(
        published_at AT TIME ZONE 'Australia/Melbourne',
        'Mon DD, YYYY'
      ) AS "publishedAt"
    FROM blog_posts
    WHERE slug = ${slug}
    LIMIT 1;
  `;

  const post = rows[0];

  if (!post) {
    notFound();
  }

  return post;
}
