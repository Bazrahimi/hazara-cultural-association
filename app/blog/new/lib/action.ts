"use server";

import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export type CreatePostState = {
  error?: string;
};

export async function createBlogPost(
  prevState: CreatePostState | undefined,
  formData: FormData
): Promise<CreatePostState> {
  const session = await requireUser();

  // Only admins & bloggers can create posts
  if (
    !session.roles.includes("admin") &&
    !session.roles.includes("blogger")
  ) {
    return { error: "You are not allowed to create blog posts." };
  }

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const slugRaw = (formData.get("slug") as string | null)?.trim() ?? "";
  const category = (formData.get("category") as string | null)?.trim() ?? "";
  const status = (formData.get("status") as string | null)?.trim() ?? "draft";
  const excerpt = (formData.get("excerpt") as string | null) ?? "";
  const contentHtml =
    (formData.get("content_html") as string | null)?.trim() ?? "";
  const heroImgPath =
    (formData.get("hero_img_path") as string | null)?.trim() || null;
  const isFeatured = formData.get("is_featured") === "on";
  const eventDateStr = (formData.get("event_date") as string | null) ?? "";
  const eventLocation =
    (formData.get("event_location") as string | null)?.trim() || null;

  if (!title || !contentHtml) {
    return { error: "Title and content are required." };
  }

  if (!["news", "advocacy_event", "announcement"].includes(category)) {
    return { error: "Invalid category." };
  }

  if (!["draft", "published"].includes(status)) {
    return { error: "Invalid status." };
  }

  // Generate slug if empty
  const slug =
    slugRaw ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  let eventDate: Date | null = null;
  if (category === "advocacy_event" && eventDateStr) {
    eventDate = new Date(eventDateStr);
  }

  const publishedAt = status === "published" ? new Date() : null;

  try {
    await sql`
      INSERT INTO blog_posts (
        user_id,
        title,
        slug,
        excerpt,
        content_html,
        category,
        status,
        hero_img_path,
        is_featured,
        event_date,
        event_location,
        published_at
      )
      VALUES (
        ${session.userId},
        ${title},
        ${slug},
        ${excerpt},
        ${contentHtml},
        ${category},
        ${status},
        ${heroImgPath},
        ${isFeatured},
        ${eventDate},
        ${eventLocation},
        ${publishedAt}
      );
    `;
  } catch (err: any) {
    // Unique slug violation
    if (err?.code === "23505") {
      return { error: "Slug already exists. Please choose another." };
    }
    console.error(err);
    return { error: "Something went wrong while saving the post." };
  }

  // After success, go to a listing page (adjust to whatever route you want)
  redirect("/news");
}
