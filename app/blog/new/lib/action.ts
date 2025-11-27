// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { requireUser } from "@/app/lib/session";
import { slugify } from "@/app/shop/lib/helper";
import { canCreateOrEditPosts } from "../../lib/permissions";
import { insertBlogPost, updateBlogPostRow } from "./data";
import { BlogPostState } from "./definitions";
import { parseBlogPostForm } from "./helper";

export async function createBlogPost(
  _prevState: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();

  if (!canCreateOrEditPosts(session)) {
    return {
      ok: false,
      message: "You are not allowed to create blog posts.",
    };
  }

  const result = parseBlogPostForm(formData);

  if (!result.ok) {
    return {
      ok: false,
      message: "Please fix the errors above.",
      errors: result.errors,
      data: result.normalizedData,
    };
  }

  const data = result.data;

  const slug = slugify(data.title);
  const eventDate =
    data.categoryId === 2 && data.eventDate ? new Date(data.eventDate) : null;
  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const created = await insertBlogPost({
      userId: session.userId,
      data,
      slug,
      eventDate,
      publishedAt,
    });

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

export async function updateBlogPost(
  _prevState: BlogPostState | undefined,
  formData: FormData
): Promise<BlogPostState> {
  const session = await requireUser();

  if (!canCreateOrEditPosts(session)) {
    return {
      ok: false,
      message: "You are not allowed to edit blog posts.",
    };
  }

  // 1) Validate id
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

  // 2) Use same parser as create, but without id
  formData.delete("id");
  const result = parseBlogPostForm(formData);

  if (!result.ok) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: result.errors,
      data: result.normalizedData,
    };
  }

  const data = result.data;

  const eventDate =
    data.categoryId === 2 && data.eventDate ? new Date(data.eventDate) : null;
  const publishedAt = data.status === "published" ? new Date() : null;

  try {
    const updated = await updateBlogPostRow({
      id,
      data,
      userId,
      isAdmin,
      eventDate,
      publishedAt,
    });

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
