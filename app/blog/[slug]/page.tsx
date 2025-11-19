import { sql } from "@/app/lib/db";
import { BlogPost } from "../lib/definitions";
import { getBlogPostBySlug } from "../lib/data";
import BlogPostDetail from "./ui/BlogPostDetail";

// app/blog/[slug]/page.tsx
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  return  <BlogPostDetail post={post} />
};

export default page;
