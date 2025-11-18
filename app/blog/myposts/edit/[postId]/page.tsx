// app/blog/edit/[postId]/page.tsx
import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import { notFound, redirect } from "next/navigation";

import { updateBlogPost } from "./lib/action";
import BlogPostForm from "@/app/blog/new/ui/BlogPostForm";


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

  const rows = await sql<{
    id: number;
    user_id: number;
    title: string;
    content_html: string;
    category: "news" | "advocacy_event" | "announcement";
    status: "draft" | "scheduled" | "published" | "archived";
    hero_img_path: string | null;
    is_featured: boolean;
    event_date: string | null;
    event_location: string | null;
  }[]>`
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

  const initialData = {
    id: post.id,
    title: post.title,
    content_html: post.content_html,
    category: post.category,
    status: post.status,
    hero_img_path: post.hero_img_path ?? "",
    is_featured: post.is_featured,
    event_date: post.event_date ?? "",
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
