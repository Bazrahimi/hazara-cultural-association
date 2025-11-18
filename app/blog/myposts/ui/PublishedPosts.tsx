import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { BlogPost } from "../../lib/definitions";

const PublishedPosts = ({ published }: { published: BlogPost[] }) => {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
      <div className="mb-3">
        <Header as="h2" size="sm">
          Published
        </Header>
        <p className="text-xs text-emerald-700">
          Posts currently live and visible on the website.
        </p>
      </div>

      {published.length === 0 ? (
        <p className="text-sm text-emerald-800">
          You haven&apos;t published any posts yet.
        </p>
      ) : (
        <div className="space-y-3">
          {published.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-emerald-100 bg-white px-3 py-3 text-sm"
            >
              <h3 className="font-semibold text-emerald-900">{post.title}</h3>
              <p className="mt-0.5 text-xs uppercase tracking-wide text-emerald-600">
                {post.category.replace("_", " ")} • Published
              </p>
              <p className="mt-1 text-xs text-emerald-700">
                Published on:{post.createdAt}
              </p>
              <div className="mt-3 flex gap-2">
                {/* Adjust routes as needed */}
                <Button
                  as="link"
                  size="xs"
                  href={`/blog/${post.slug}`}
                  variant="outline"
                >
                  View Live
                </Button>
                <Button
                  as="link"
                  href={`/blog/myposts/edit/${post.id}`}
                  variant="outline"
                  size="xs"
                >
                  Edit
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PublishedPosts;
