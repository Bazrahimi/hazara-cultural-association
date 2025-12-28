// app/blog/edit/[postId]/page.tsx
import { requireUser } from "@/app/lib/session/session";
import { notFound } from "next/navigation";

import PostForm from "../../new/ui/PostForm";

import { updatePost } from "@/app/blog/post/lib/action";
import { getEditPostById } from "@/app/blog/post/lib/data";

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

  return <PostForm mode="edit" action={updatePost} initialData={post}  />;
}
