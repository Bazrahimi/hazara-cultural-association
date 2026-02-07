// app/blog/edit/[postId]/page.tsx

import { notFound } from "next/navigation";

import PostForm from "../../../create-new-post/ui/PostForm";

import { getSession } from "@/app/_lib";
import { updatePost } from "@/app/blog/post/_lib/action";
import { getEditPostById } from "@/app/blog/post/_lib/data";

type PageProps = {
  params: Promise<{ postId: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { postId } = await params;
  const id = Number(postId);

  if (!Number.isFinite(id) || id <= 0) {
    notFound();
  }

  const session = await getSession();
  const userId = session?.userId;
  const roles = session?.roles;
  const isAdmin = roles?.includes("admin");

  if (userId && isAdmin) {
    const post = await getEditPostById({
      postId: id,
      userId,
      isAdmin,
    });

    return <PostForm mode="edit" action={updatePost} initialData={post} />;
  }
}
