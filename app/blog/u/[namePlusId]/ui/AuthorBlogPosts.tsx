// app/blog/ui/AuthorBlogPosts.tsx
import { getPublishedPostsByAuthor } from "@/app/blog/lib/data";
import BlogPostCard from "../../../ui/PostCard";

type AuthorBlogPostsProps = {
  authorId: number;
};

const AuthorBlogPosts = async ({ authorId }: AuthorBlogPostsProps) => {
  const posts = await getPublishedPostsByAuthor(authorId);

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default AuthorBlogPosts;
