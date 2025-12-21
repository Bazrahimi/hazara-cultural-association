"use server";

import { sql } from "@/app/lib/db";
import { getSession } from "@/app/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostActionState } from "./definitions";
import { postFailure, postSuccess } from "./helper";
import { BlogRoutes } from "@/app/lib/routes";

const parsePostId = (formData: FormData): number | null => {
  const rawPostId = formData.get("postId");
  if (rawPostId == null) return null;

  const postId = Number(rawPostId);
  if (!Number.isInteger(postId) || postId <= 0) return null;

  return postId;
};

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
