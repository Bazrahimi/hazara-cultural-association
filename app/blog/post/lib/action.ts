// app/blog/new/lib/actions.ts (where createBlogPost lives)

"use server";

import { BlogRoutes } from "@/app/lib/routes";
import { getSession, requireUser } from "@/app/lib/session";
import { slugify } from "@/app/shop/lib/helper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  applyPostIntent,
  parseBlogPostForm,
  parsePostActionIntent,
  PostActionState,
  postFailure,
  postSuccess,
} from "./actionHelper";
import { insertPostRow, setPostCategory, updatePostRow } from "./data";
import { POST_STATUS } from "./definitions";
import {
  UpdateCategorySchema,
  type PostState,
  type UpdateCategoryState,
} from "./schema";

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
  if (!session) return postFailure("You are not allowed");

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
        postId: created.postId,
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

export const updatePostCategory = async (
  _prev: UpdateCategoryState | undefined,
  formData: FormData
): Promise<UpdateCategoryState> => {
  const session = await getSession();

  if (!session) return postFailure("you must be logged in.");

  const raw = Object.fromEntries(formData.entries());
  const parsed = UpdateCategorySchema.safeParse(raw);

  if (!parsed.success) return postFailure("Invalid input");

  const { postId, categoryId } = parsed.data;
  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  const updated = await setPostCategory({
    postId,
    categoryId,
    userId,
    isAdmin,
  });
  if (!updated) return postFailure("Not Authorised or post not found");

  revalidatePath(BlogRoutes.manageMyPosts());
  return postSuccess("Category updated.");
};

export async function updatePost(
  _prevState: PostState | undefined,
  formData: FormData
): Promise<PostState> {
  const session = await getSession();

  if (!session) {
    return {
      ok: false,
      message: "You are not allowed to edit blog posts.",
    };
  }

  // 1) Validate id
  const postIdRaw = formData.get("postId");
  const postId = Number(postIdRaw);

  if (!postId || !Number.isFinite(postId) || postId <= 0) {
    return {
      ok: false,
      message: "Invalid post id.",
    };
  }

  const isAdmin = session.roles.includes("admin");
  const userId = session.userId;

  // 2) Use same parser as create, but without id
  formData.delete("posId");
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
      postId,
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
        postId: updated.postId,
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

export const PostAction = async (
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

  const intent = parsePostActionIntent(formData);
  if (!intent) return postFailure("invalid action");

  const ctx = {
    postId,
    isAdmin: session.roles.includes("admin"),
    userId: session.userId,
  };

  try {
    const result = await applyPostIntent(ctx, intent);

    // not updated = unauthorized or missing post
    if (
      (result.kind === "feature" && result.isFeatured === null) ||
      ((result.kind === "publish" || result.kind === "archive") &&
        result.status === null) ||
      (result.kind === "delete" && result.id === null)
    ) {
      return postFailure(
        "Not authorized to manage this post or post not found."
      );
    }
    // Revalidate list page for non-delete actions
    revalidatePath(BlogRoutes.manageMyPosts());

    // Messages
    if (result.kind === "feature") {
      return postSuccess(
        result.isFeatured ? "Published to homepage." : "Removed from homepage."
      );
    }
    if (result.kind === "publish") return postSuccess("Post published.");
    if (result.kind === "archive") return postSuccess("Post archived.");

    // delete
    redirect(BlogRoutes.manageMyPosts());
  } catch (err) {
    console.error("PostAction failed", err);
    return postFailure("Database error.");
  }
};
