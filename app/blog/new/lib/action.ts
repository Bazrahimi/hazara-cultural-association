// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { slugify } from "@/app/shop/lib/helper";
import { PostSuccessDBReturn } from "./definitions";
import { BlogPostSchema } from "./schema";
import { BlogPostState, BlogPostInput } from "./definitions";

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
  _prevState: BlogPostState | undefined,
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
      contentHtml: (raw.contentHtml as string) ?? "",
      heroImgPath: (raw.heroImgPath as string) ?? "",
      eventDate: (raw.eventDate as string) ?? undefined,
      eventLocation: (raw.eventLocation as string) ?? undefined,

      categoryId: raw.categoryId
        ? Number(raw.categoryId as string)
        : undefined,

      status: (raw.status as BlogPostInput["status"]) ?? "draft",

      isFeatured: toBoolean(raw.isFeatured),
      isRtl: toBoolean(raw.isRtl),
    };

    return {
      ok: false,
      message: "Please fix the errors Above.",
      errors: fieldErrors,
      data: normalizedData,
    };
  }

  const data = parsed.data;

  const baseSlug = slugify(data.title);

  const eventDate =
    data.categoryId === 2 && data.eventDate
      ? new Date(data.eventDate)
      : null;

  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const rows = await sql<PostSuccessDBReturn[]>`
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
        ${baseSlug},
        ${data.contentHtml},
        ${data.categoryId},
        ${data.status},
        ${data.heroImgPath ?? null},
        ${data.isFeatured},
        ${data.isRtl},
        ${eventDate},
        ${data.eventLocation ?? null},
        ${publishedAt}
      )
      RETURNING 
      id, 
      slug, 
      is_featured AS "isFeatured", 
      status;
    `;

    const created = rows[0];

    // Build a nice message depending on status
    const message =
      data.status === "published"
        ? "Your post has been published"
        : "Your post has been saved as a draft.";

    return {
      ok: true,
      postTitle: data.title,
      message,
      success: {
        id: created.id,
        status: created.status,
        isFeatured: created.isFeatured,
        slug: created.slug,
      },

      data,
    };
  } catch (err: unknown) {
    console.error("DB error inserting Blog-post:", err);

    return {
      ok: false,
      message: "Something went wrong while posting the blog.",
      data,
    };
  }
}
