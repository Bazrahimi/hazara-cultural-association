//app/blog/new/page.tsx
import { requireUser } from "@/app/lib/session";
import { notFound } from "next/navigation";
import BlogPostForm from "./ui/BlogPostForm";
import { createBlogPost } from "./lib/action";

const NewBlog = async () => {
  const session = await requireUser();

  const canPost =
    session.roles.includes("admin") || session.roles.includes("blogger");

  if (!canPost) {
    notFound();
  }

  return <BlogPostForm mode="create" action={createBlogPost} />;
};

export default NewBlog;
