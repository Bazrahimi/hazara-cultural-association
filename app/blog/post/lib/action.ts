// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { requireUser } from "@/app/lib/session";
import { slugify } from "@/app/shop/lib/helper";
import { canCreateOrEditPosts } from "../../lib/permissions";
import { parseBlogPostForm } from "./actionHelper";
import { insertPostRow, updatePostRow } from "./data";
import { POST_STATUS } from "./definitions";
import type { PostState } from "./schema";
import { sql } from "@/app/lib/db";
import { BlogRoutes } from "@/app/lib/routes";
import { getSession } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostActionState, postFailure, postSuccess } from "./actionHelper";

const parsePostId = (formData: FormData): number | null => {
  const rawPostId = formData.get("postId");
  if (rawPostId == null) return null;

  const postId = Number(rawPostId);
  if (!Number.isInteger(postId) || postId <= 0) return null;

  return postId;
};

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

// FEATURE TOGGLE
export const featurePostAction = async (
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> => {
  const session = await getSession();
  if (!session) {
    return postFailure("You must be logged in.");
  }

  const postId = parsePostId(formData);
  if (!postId) {
    return postFailure("Invalid post ID.");
  }

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  try {
    const rows = await sql<{ is_featured: boolean }[]>`
      UPDATE blog_posts
      SET is_featured = NOT is_featured
      WHERE id = ${postId}
        AND (${isAdmin} OR user_id = ${userId})
      RETURNING is_featured;
    `;

    // If no row was updated: not authorised or post not found
    if (rows.length === 0) {
      return postFailure(
        "Not authorized to manage this post or post not found."
      );
    }

    // This is the *new* value after toggle
    const nowFeatured = rows[0].is_featured === true;

    revalidatePath(BlogRoutes.myPosts());

    return postSuccess(
      nowFeatured ? "Published to homepage." : "Removed from homepage."
    );
  } catch (err) {
    console.error("Failed to toggle featured", err);
    return postFailure("Database error");
  }
};

// PUBLISH
export async function publishPostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const session = await getSession();
  if (!session) {
    return postFailure("You must be logged in.");
  }

  const postId = parsePostId(formData);
  if (!postId) {
    return postFailure("Invalid post ID.");
  }

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  try {
    const rows = await sql<{ status: string }[]>`
      UPDATE blog_posts 
      SET status = 'published' 
      WHERE id = ${postId}
        AND (${isAdmin} OR user_id = ${userId})
      RETURNING status;
    `;

    if (rows.length === 0) {
      return postFailure(
        "Not authorized to publish this post or post not found."
      );
    }

    return postSuccess("Post published.");
  } catch (err) {
    console.error("Failed to publish post", err);
    return postFailure("Database error.");
  }
}

// ARCHIVE
export async function archivePostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const session = await getSession();
  if (!session) {
    return postFailure("You must be logged in.");
  }

  const postId = parsePostId(formData);
  if (!postId) {
    return postFailure("Invalid post ID.");
  }

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  try {
    const rows = await sql<{ status: string }[]>`
      UPDATE blog_posts 
      SET status = 'archived' 
      WHERE id = ${postId}
        AND (${isAdmin} OR user_id = ${userId})
      RETURNING status;
    `;

    if (rows.length === 0) {
      return postFailure(
        "Not authorized to archive this post or post not found."
      );
    }

    return postSuccess("Post archived.");
  } catch (err) {
    console.error("Failed to archive post", err);
    return postFailure("Database error.");
  }
}

// DELETE
export async function deletePostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const session = await getSession();
  if (!session) {
    return postFailure("You must be logged in.");
  }

  const postId = parsePostId(formData);
  if (!postId) {
    return postFailure("Invalid post ID.");
  }

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  try {
    const rows = await sql<{ id: number }[]>`
      DELETE FROM blog_posts 
      WHERE id = ${postId}
        AND (${isAdmin} OR user_id = ${userId})
      RETURNING id;
    `;

    if (rows.length === 0) {
      return postFailure(
        "Not authorized to delete this post or post not found."
      );
    }
  } catch (err) {
    console.error("Failed to delete post", err);
    return postFailure("Database error.");
  }

  redirect(BlogRoutes.myPosts());
}
