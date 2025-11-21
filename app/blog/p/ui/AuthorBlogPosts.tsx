// app/blog/ui/AuthorBlogPosts.tsx
import { getPublishedPostsByAuthor } from "@/app/blog/lib/data";
import { Header } from "@/app/ui/global/Header";
import BlogPostCard from "../../ui/BlogPostCard";

type AuthorBlogPostsProps = {
  authorId: number;
};

const AuthorBlogPosts = async ({ authorId }: AuthorBlogPostsProps) => {
  const posts = await getPublishedPostsByAuthor(authorId);

  // If no posts, we still want a heading – generic label
  if (posts.length === 0) {
    return (
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <Header as="h2" size="md" className="mb-2 text-center">
          Author&apos;s Public Posts
        </Header>
        <p className="mb-6 text-center text-sm text-gray-600">
          This author has not published any posts yet.
        </p>
      </section>
    );
  }

  const authorName = posts[0].authorName ?? "Author";

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      <Header as="h2" size="md" className="mb-2 text-center">
        {authorName}&apos;s Public Posts
      </Header>

      <p className="mb-6 text-center text-sm text-gray-600">
        All publicly visible posts written by {authorName}. Only posts with
        published status are shown here.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default AuthorBlogPosts;
