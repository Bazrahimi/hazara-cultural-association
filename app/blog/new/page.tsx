//app/blog/new/page.tsx
import { requireUser } from "@/app/lib/session";
import { notFound } from "next/navigation";
import { createPost } from "../post/lib/action";
import PostForm from "./ui/PostForm";

const NewBlog = async () => {
  const session = await requireUser();

  const canPost =
    session.roles.includes("admin") || session.roles.includes("blogger");

  if (!canPost) {
    notFound();
  }

  return <PostForm mode="create" action={createPost} />;
};

export default NewBlog;
