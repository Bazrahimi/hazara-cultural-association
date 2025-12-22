// app/blog/ui/CategoryBlogPosts.tsx
import { getPublishedPostsByCategory } from "@/app/blog/lib/data";
import { getCategoryLabel } from "@/app/blog/lib/category";
import { Header } from "@/app/ui/global/Header";
import BlogPostCard from "../../ui/PostCard";

type CategoryBlogPostsProps = {
  categoryId: number;
  heading?: string;
  description?: string;
  limit?: number;
};

const CategoryBlogPosts = async ({
  categoryId,
  heading,
  description,
  limit = 20,
}: CategoryBlogPostsProps) => {
  const posts = await getPublishedPostsByCategory(categoryId, limit);

  const defaultHeading = heading ?? getCategoryLabel(categoryId, false);

  if (posts.length === 0) {
    return (
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <Header as="h2" size="md" className="mb-2 text-center">
          {defaultHeading}
        </Header>
        {description && (
          <p className="mb-6 text-center text-sm text-gray-600">
            {description}
          </p>
        )}
        <p className="text-center text-sm text-gray-500">
          No posts have been published in this category yet.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      <Header as="h2" size="md" className="mb-2 text-center">
        {defaultHeading}
      </Header>

      {description && (
        <p className="mb-6 text-center text-sm text-gray-600">{description}</p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default CategoryBlogPosts;
