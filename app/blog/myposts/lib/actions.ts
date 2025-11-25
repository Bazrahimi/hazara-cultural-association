"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { PostActionState } from "./definitions";
import { parsePostId, postFailure, postSuccess } from "./helper";

// FEATURE TOGGLE
export const featurePostAction = async (
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> => {
  const postId = parsePostId(formData);
  if (!postId) return postFailure("Invalid post ID.");

  try {
    // Read old state
    const result =
      await sql`SELECT is_featured FROM blog_posts WHERE id = ${postId}`;
    const wasFeatured = result[0]?.is_featured === true;

    // Toggle
    await sql`
      UPDATE blog_posts
      SET is_featured = NOT is_featured
      WHERE id = ${postId}
    `;

    // Revalidate screens
    // revalidatePath("/");
    // revalidatePath("/blog/myposts");

    // TODO: Explain the main cause that towast 

    return postSuccess(
      wasFeatured ? "Removed from homepage." : "Published to homepage."
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
  const postId = parsePostId(formData);
  if (!postId) return postFailure("Invalid post ID.");

  try {
    await sql`UPDATE blog_posts SET status = 'published' WHERE id = ${postId}`;
    revalidatePath("/");
    revalidatePath("/blog/myposts");

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
  const postId = parsePostId(formData);
  if (!postId) return postFailure("Invalid post ID.");

  try {
    await sql`UPDATE blog_posts SET status = 'archived' WHERE id = ${postId}`;
    revalidatePath("/blog/myposts");

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
  const postId = parsePostId(formData);
  if (!postId) return postFailure("Invalid post ID.");

  try {
    await sql`DELETE FROM blog_posts WHERE id = ${postId}`;
    revalidatePath("/blog/myposts");

    return postSuccess("Post deleted permanently.");
  } catch (err) {
    console.error("Failed to delete post", err);
    return postFailure("Database error.");
  }
}
