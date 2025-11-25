"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { PostActionState } from "./definitions";

function parsePostId(formData: FormData): number | null {
  const rawId = formData.get("postId");
  if (!rawId) return null;

  const postId = Number(rawId);
  if (!Number.isInteger(postId) || postId <= 0) return null;

  return postId;
}

export const featurePostAction = async(_prev:PostActionState | undefined, formData: FormData):Promise<PostActionState> => {
  const postId = parsePostId(formData);
    if (!postId) {
    return { ok: false, message: "Invalid post ID." };
  }

  try {
    // Toggle blog_posts
    await sql`
      UPDATE blog_posts
      SET is_featured = NOT is_featured
      WHERE id = ${postId}
    `;
    revalidatePath("/");                // homepage
    revalidatePath("/blog/myposts");    // dashboard list

    return {
      ok: true,
      message: "Featured status updated."
    }
    
  } catch (err) {
    console.error("Failed to toggle featured", err);
    return { ok: false, message: "Database error." };
    
  }

}

export async function publishPostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const postId = parsePostId(formData);
  if (!postId) {
    return { ok: false, message: "Invalid post ID." };
  }

  try {
    await sql`UPDATE blog_posts SET status = 'published' WHERE id = ${postId}`;
    revalidatePath("/blog/myposts");
    return { ok: true, message: "Post published." };
  } catch (err) {
    console.error("Failed to publish post", err);
    return { ok: false, message: "Database error." };
  }
}

export async function archivePostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const postId = parsePostId(formData);
  if (!postId) {
    return { ok: false, message: "Invalid post ID." };
  }

  try {
    await sql`UPDATE blog_posts SET status = 'archived' WHERE id = ${postId}`;
    revalidatePath("/blog/myposts");
    return { ok: true, message: "Post archived." };
  } catch (err) {
    console.error("Failed to archive post", err);
    return { ok: false, message: "Database error." };
  }
}

export async function deletePostAction(
  _prev: PostActionState | undefined,
  formData: FormData
): Promise<PostActionState> {
  const postId = parsePostId(formData);
  if (!postId) {
    return { ok: false, message: "Invalid post ID." };
  }

  try {
    await sql`DELETE FROM blog_posts WHERE id = ${postId}`;
    revalidatePath("/blog/myposts");
    return { ok: true, message: "Post deleted permanently." };
  } catch (err) {
    console.error("Failed to delete post", err);
    return { ok: false, message: "Database error." };
  }
}
