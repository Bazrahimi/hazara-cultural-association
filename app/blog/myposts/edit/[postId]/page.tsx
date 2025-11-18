// app/blog/edit/[postId]/page.tsx
import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { notFound, redirect } from "next/navigation";

import BlogPostForm from "@/app/blog/new/ui/BlogPostForm";
import { updateBlogPost } from "./lib/action";

function toDatetimeLocalString(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

type PageProps = {
  params: { postId: string };
};

export default async function EditPostPage({ params }: PageProps) {
  const { postId } = params;
  const id = Number(postId);

  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const session = await requireUser();
  const { userId, roles } = session;

  const rows = await sql<
    {
      id: number;
      user_id: number;
      title: string;
      content_html: string;
      category: "news" | "advocacy_event" | "announcement";
      status: "draft" | "published" | "archived";
      hero_img_path: string | null;
      is_featured: boolean;
      event_date: string | null;
      event_location: string | null;
    }[]
  >`
    SELECT
      id,
      user_id,
      title,
      content_html,
      category,
      status,
      hero_img_path,
      is_featured,
      event_date,
      event_location
    FROM blog_posts
    WHERE id = ${id}
    LIMIT 1;
  `;

  const post = rows[0];
  if (!post) notFound();

  const isAdmin = roles.includes("admin");
  const isOwner = post.user_id === userId;

  if (!isAdmin && !isOwner) {
    redirect("/blog/myposts");
  }

  // Normalise event_date for <input type="datetime-local">
  let eventDateForInput = "";

  if (post.event_date) {
    const d = new Date(post.event_date);
    eventDateForInput = toDatetimeLocalString(d);
  }

  const initialData = {
    id: post.id,
    title: post.title,
    content_html: post.content_html,
    category: post.category,
    status: post.status,
    hero_img_path: post.hero_img_path ?? "",
    is_featured: post.is_featured,
    event_date: eventDateForInput,
    event_location: post.event_location ?? "",
  };

  return (
    <BlogPostForm
      mode="edit"
      action={updateBlogPost}
      initialData={initialData}
    />
  );
}
