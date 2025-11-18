"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import {
  BlogPostSchema,
  type BlogPostInput,
  type BlogPostState,
} from "./schema";

export async function createBlogPost(
  prevState: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();

  // Only admins & bloggers can create posts
  if (!session.roles.includes("admin") && !session.roles.includes("blogger")) {
    return {
      ok: false,
      message: "You are not allowed to create blog posts.",
    };
  }

  // 1) Convert FormData → plain object
  const raw = Object.fromEntries(formData.entries());

  // 2) Validate with Zod
  const parsed = BlogPostSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: BlogPostState["errors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        const key = field as keyof BlogPostInput;
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key]!.push(issue.message);
      }
    }

    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fieldErrors,
      data: raw as Partial<BlogPostInput>,
    };
  }

  const data = parsed.data;

  // Slug is auto-generated in DB (trigger) → send NULL
  const slug = null;

  // Only meaningful for advocacy events
  const eventDate =
    data.category === "advocacy_event" && data.event_date
      ? new Date(data.event_date)
      : null;

  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    await sql`
      INSERT INTO blog_posts (
        user_id,
        title,
        slug,
        content_html,
        category,
        status,
        hero_img_path,
        is_featured,
        event_date,
        event_location,
        published_at
      )
      VALUES (
        ${session.userId},
        ${data.title},
        ${slug},
        ${data.content_html},
        ${data.category},
        ${data.status},
        ${data.hero_img_path ?? null},
        ${data.is_featured},
        ${eventDate},
        ${data.event_location ?? null},
        ${publishedAt}
      );
    `;
  } catch (err: unknown) {
    console.error("DB error inserting Blog-post:", err);

    // If you want to handle unique violations etc, you can inspect (err as any).code
    return {
      ok: false,
      message: "Something went wrong while posting the blog.",
      data,
    };
  }

  // 3) Success → redirect (no success state is returned)
  redirect("/news");
}
