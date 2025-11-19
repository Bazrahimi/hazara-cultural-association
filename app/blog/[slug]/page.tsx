import { sql } from "@/app/lib/db";
import { BlogPost } from "../lib/definitions";
import { getBlogPostBySlug } from "../lib/data";
import BlogPostDetail from "./ui/BlogPostDetail";
import { notFound } from "next/navigation";
import { getSession } from "@/app/lib/session";

// app/blog/[slug]/page.tsx
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const session = await getSession();

    const canManage =
    !!session &&
    (session.roles.includes("admin") || session.userId === post.authorId);


  return  <BlogPostDetail post={post} canManage = {canManage} />
};

export default page;
