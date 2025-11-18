// app/blog/edit/[postId]/lib/action.ts
"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { BlogPostSchema, type BlogPostState } from "@/app/blog/new/lib/schema";

export async function updateBlogPost(
  prev: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();
  const { userId, roles } = session;

  const idRaw = formData.get("id");
  const id = typeof idRaw === "string" ? Number(idRaw) : NaN;
  if (!Number.isFinite(id) || id <= 0) {
    return { ok: false, message: "Invalid post id." };
  }

  // Extract raw fields from form
  const raw = {
    title: (formData.get("title") as string | null) ?? "",
    category: (formData.get("category") as string | null) ?? "",
    status: (formData.get("status") as string | null) ?? "",
    content_html: (formData.get("content_html") as string | null) ?? "",
    hero_img_path: (formData.get("hero_img_path") as string | null) ?? "",
    is_featured: formData.get("is_featured") === "on",
    event_date: (formData.get("event_date") as string | null) ?? "",
    event_location: (formData.get("event_location") as string | null) ?? "",
  };

  const parsed = BlogPostSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: BlogPostState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof raw;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key]!.push(issue.message);
    }
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors: fieldErrors,
      data: raw,
    };
  }

  const data = parsed.data;

  // Check ownership before updating
  const ownerRows = await sql<{ user_id: number }[]>`
    SELECT user_id FROM blog_posts WHERE id = ${id} LIMIT 1;
  `;
  const existing = ownerRows[0];
  if (!existing) {
    return { ok: false, message: "Post not found." };
  }

  const isAdmin = roles.includes("admin");
  const isOwner = existing.user_id === userId;
  if (!isAdmin && !isOwner) {
    return { ok: false, message: "You are not allowed to edit this post." };
  }

  const eventDate =
    data.category === "advocacy_event" && data.event_date
      ? new Date(data.event_date)
      : null;

  try {
    await sql`
      UPDATE blog_posts
      SET
        title = ${data.title},
        content_html = ${data.content_html},
        category = ${data.category},
        status = ${data.status},
        hero_img_path = ${data.hero_img_path ?? null},
        is_featured = ${data.is_featured},
        event_date = ${eventDate},
        event_location = ${data.event_location ?? null},
        updated_at = NOW()
      WHERE id = ${id};
    `;

    return {
      ok: true,
      message: "Blog-post updated successfully.",
      data,
    };
  } catch (err) {
    console.error("DB error updating blog post:", err);
    return {
      ok: false,
      message: "Something went wrong while updating the post.",
      data: raw,
    };
  }
}
