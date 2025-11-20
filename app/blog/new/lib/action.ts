// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import {
  BlogPostSchema,
  type BlogPostInput,
  type BlogPostState,
} from "./schema";

function toBoolean(raw: unknown): boolean {
  if (typeof raw === "boolean") return raw;
  if (typeof raw === "number") return raw === 1;
  if (typeof raw === "string") {
    const lower = raw.toLowerCase();
    return lower === "true" || lower === "1" || lower === "on";
  }
  return false;
}

export async function createBlogPost(
  prevState: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();

  if (!session.roles.includes("admin") && !session.roles.includes("blogger")) {
    return {
      ok: false,
      message: "You are not allowed to create blog posts.",
    };
  }

  const raw = Object.fromEntries(formData.entries());

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

    // 🔧 Normalise what we send back to the client
    const normalizedData: Partial<BlogPostInput> = {
      title: (raw.title as string) ?? "",
      content_html: (raw.content_html as string) ?? "",
      hero_img_path: (raw.hero_img_path as string) ?? "",
      event_date: (raw.event_date as string) ?? undefined,
      event_location: (raw.event_location as string) ?? undefined,

      category_id: raw.category_id
        ? Number(raw.category_id as string)
        : undefined,

      status: (raw.status as BlogPostInput["status"]) ?? "draft",

      is_featured: toBoolean(raw.is_featured),
      is_rtl: toBoolean(raw.is_rtl),
    };

    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fieldErrors,
      data: normalizedData,
    };
  }

  const data = parsed.data;

  const slug = null;

  const eventDate =
    data.category_id === 2 && data.event_date
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
        ${session.userId},
        ${data.title},
        ${slug},
        ${data.content_html},
        ${data.category_id},
        ${data.status},
        ${data.hero_img_path ?? null},
        ${data.is_featured},
        ${data.is_rtl},
        ${eventDate},
        ${data.event_location ?? null},
        ${publishedAt}
      );
    `;
  } catch (err: unknown) {
    console.error("DB error inserting Blog-post:", err);

    return {
      ok: false,
      message: "Something went wrong while posting the blog.",
      data,
    };
  }

  redirect("/blog/myposts");
}
