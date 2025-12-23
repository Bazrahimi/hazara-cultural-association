// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { requireUser } from "@/app/lib/session";
import { slugify } from "@/app/shop/lib/helper";
import { canCreateOrEditPosts } from "../../lib/permissions";

import { insertPostRow, updatePostRow } from "./data";


import { parseBlogPostForm } from "../../auth/new/lib/helper";
import { POST_STATUS } from "./definitions";
import type { PostState } from "../../auth/new/lib/schema";

export async function createPost(
  _prevState: PostState | undefined,
  formData: FormData
): Promise<PostState> {
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

  try {
    const created = await insertPostRow({
      userId: session.userId,
      data,
      slug,
      eventDate,
    });

    const message =
      data.statusCode === POST_STATUS.PUBLISHED
        ? "Your post has been published"
        : "Your post has been saved as a draft.";

    return {
      ok: true,
      postTitle: data.title,
      message,
      success: {
        id: created.id,
        statusCode: created.statusCode,
        isFeatured: created.isFeatured,
        slug: created.slug,
        isRtl: created.isRtl,
        categoryId: created.categoryId,
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

export async function updatePost(
  _prevState: PostState | undefined,
  formData: FormData
): Promise<PostState> {
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

  try {
    const updated = await updatePostRow({
      id,
      data,
      userId,
      isAdmin,
      eventDate,
    });

    if (!updated) {
      return {
        ok: false,
        message: "Post not found or could not be updated.",
        data,
      };
    }

    const message =
      data.statusCode === POST_STATUS.PUBLISHED
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
        statusCode: updated.statusCode,
        isRtl: updated.isRtl,
        categoryId: updated.categoryId,
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
