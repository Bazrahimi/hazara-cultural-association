// app/blog/lib/actions.ts
"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { revalidatePath } from "next/cache";

export async function toggleFeatured(formData: FormData) {
  const session = await requireUser();
  const postId = Number(formData.get("postId"));
  const feature = formData.get("feature") === "true";

  if (!Number.isFinite(postId)) return;

  // Check ownership / admin
  const rows = await sql<{ user_id: number; slug: string }[]>`
    SELECT user_id, slug FROM blog_posts WHERE id = ${postId} LIMIT 1;
  `;
  const post = rows[0];
  if (!post) return;

  const isOwner = post.user_id === session.userId;
  const isAdmin = session.roles.includes("admin");
  if (!isOwner && !isAdmin) return;

  await sql`
    UPDATE blog_posts
    SET is_featured = ${feature}
    WHERE id = ${postId}
  `;

  // Revalidate homepage & news listing & this post
  revalidatePath("/");
  revalidatePath(`/blog/${post.slug}`);
}

export async function updateStatus(formData: FormData) {
  const session = await requireUser();
  const postId = Number(formData.get("postId"));
  const nextStatus = String(formData.get("status"));

  if (!Number.isFinite(postId)) return;
  if (!["draft", "archived", "published"].includes(nextStatus)) return;

  const rows = await sql<{ user_id: number; slug: string }[]>`
    SELECT user_id, slug FROM blog_posts WHERE id = ${postId} LIMIT 1;
  `;
  const post = rows[0];
  if (!post) return;

  const isOwner = post.user_id === session.userId;
  const isAdmin = session.roles.includes("admin");
  if (!isOwner && !isAdmin) return;

  await sql`
    UPDATE blog_posts
    SET status = ${nextStatus}
    WHERE id = ${postId}
  `;

  revalidatePath("/");
  revalidatePath(`/blog/${post.slug}`);
}
