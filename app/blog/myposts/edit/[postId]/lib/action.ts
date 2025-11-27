// app/blog/edit/[postId]/lib/action.ts
"use server";
import { BlogPostSchema } from "@/app/blog/new/lib/schema";

import {
  PostSuccessDBReturn,
  type BlogPostInput,
  type BlogPostState,
} from "@/app/blog/new/lib/definitions";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";

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

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

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
    const rows = await sql<PostSuccessDBReturn[]>`
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
      WHERE id = ${id}
        AND (${isAdmin} OR user_id = ${userId})
      RETURNING
        id,
        slug,
        is_featured AS "isFeatured",
        status;
    `;

    const updated = rows[0];
    if (!updated) {
      return {
        ok: false,
        message: "Post not found or could not be updated.",
        data,
      };
    }

    const message =
      data.status === "published"
        ? "Your post has been updated and published."
        : "Your post changes have been saved.";

    return {
      ok: true,
      postTitle: data.title,
      message,
      success: {
        id: updated.id,
        slug: updated.slug,
        isFeatured: updated.isFeatured,
        status: updated.status,
      },
      data,
    };
  } catch (err: unknown) {
    console.error("DB error updating Blog-post:", err);
    return {
      ok: false,
      message: "Something went wrong while updating the blog post.",
      data,
    };
  }
}
