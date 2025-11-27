// app/blog/edit/[postId]/lib/action.ts
"use server";
import { BlogPostSchema } from "@/app/blog/new/lib/schema";

import {
  type BlogPostInput,
  type BlogPostState,
} from "@/app/blog/new/lib/definitions";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function updateBlogPost(
  prevState: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();

  // Only admins & bloggers can edit posts
  if (!session.roles.includes("admin") && !session.roles.includes("blogger")) {
    return {
      ok: false,
      message: "You are not allowed to edit blog posts.",
    };
  }

  // --- 1) Pull id from formData and validate ---
  const idRaw = formData.get("id");
  const id = Number(idRaw);

  if (!id || !Number.isFinite(id) || id <= 0) {
    return {
      ok: false,
      message: "Invalid post id.",
    };
  }

  // --- 2) Check ownership / admin ---
  const ownerRow = await sql<{ userId: number }[]>`
    SELECT user_id AS "userId"
    FROM blog_posts
    WHERE id = ${id}
    LIMIT 1;
  `;

  const existing = ownerRow[0];
  if (!existing) {
    return {
      ok: false,
      message: "Post not found.",
    };
  }

  const isAdmin = session.roles.includes("admin");
  const isOwner = existing.userId === session.userId;

  if (!isAdmin && !isOwner) {
    return {
      ok: false,
      message: "You are not allowed to edit this post.",
    };
  }

  // --- 3) Validate rest of fields with Zod (remove id before parsing) ---
  const raw = Object.fromEntries(formData.entries());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (raw as any).id; // BlogPostSchema doesn’t include id

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

  // --- 4) Normalise event_date + published_at like in create ---
  const eventDate =
    data.categoryId === 2 && data.eventDate ? new Date(data.eventDate) : null;

  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    await sql`
      UPDATE blog_posts
      SET
        title         = ${data.title},
        content_html  = ${data.contentHtml},
        category_id   = ${data.categoryId},
        status        = ${data.status},
        hero_img_path = ${data.heroImgPath ?? null},
        is_featured   = ${data.isFeatured},
        event_date    = ${eventDate},
        event_location = ${data.eventLocation ?? null},
        published_at  = ${publishedAt},
        is_rtl = ${data.isRtl}
      WHERE id = ${id};
    `;
  } catch (err: unknown) {
    console.error("DB error updating Blog-post:", err);
    return {
      ok: false,
      message: "Something went wrong while updating the blog post.",
      data,
    };
  }

  // Success: redirect somewhere (e.g. back to "My posts")
  redirect("/blog/myposts");
}
