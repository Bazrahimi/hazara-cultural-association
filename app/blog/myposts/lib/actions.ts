"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

// Publish → set status = "published"
export async function publishPost(postId: number) {
  await sql`UPDATE blog_posts SET status = 'published' WHERE id = ${postId}`;
  revalidatePath("/blog/myposts");
}

// Archive → set status = "archived"
export async function archivePost(postId: number) {
  await sql`UPDATE blog_posts SET status = 'archived' WHERE id = ${postId}`;
  revalidatePath("/blog/myposts");
}

// Delete → destroy row
export async function deletePost(postId: number) {
  await sql`DELETE FROM blog_posts WHERE id = ${postId}`;
  revalidatePath("/blog/myposts");
}
