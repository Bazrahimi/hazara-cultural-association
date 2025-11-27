// app/blog/edit/[postId]/page.tsx
import { requireUser } from "@/app/lib/session";
import { notFound } from "next/navigation";

import BlogPostForm from "@/app/blog/new/ui/BlogPostForm";
import { updateBlogPost } from "./lib/action";
import { getEditPostById } from "./lib/data";

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
  params: Promise<{ postId: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const session = await requireUser();
  const { userId, roles } = session;
  const isAdmin = roles.includes("admin");

  const post = await getEditPostById({
    postId: id,
    userId,
    isAdmin,
  });

  // Normalise event_date for <input type="datetime-local">
  let eventDateForInput = "";

  if (post.eventDate) {
    const d = new Date(post.eventDate);
    eventDateForInput = toDatetimeLocalString(d);
  }

 

  const initialData = {
    ...post,
    eventDate: eventDateForInput
  };

  return (
    <BlogPostForm
      mode="edit"
      action={updateBlogPost}
      initialData={initialData}
    />
  );
}
