import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { BlogPost } from "../../lib/definitions";

export default function ArchivedPosts({ archived }: { archived: BlogPost[] }) {
  return (
    <section className="rounded-xl border border-red-200 bg-red-50/60 p-5">
      <div className="mb-3">
        <Header as="h2" size="sm">
          Archived
        </Header>
        <p className="text-xs text-red-700">
          Posts that are hidden from the public but kept for your records.
        </p>
      </div>

      {archived.length === 0 ? (
        <p className="text-sm text-red-800">
          You don&apos;t have any archived posts.
        </p>
      ) : (
        <div className="space-y-3">
          {archived.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-red-100 bg-white px-3 py-3 text-sm"
            >
              <h3 className="font-semibold text-red-900">{post.title}</h3>

              <p className="mt-0.5 text-xs uppercase tracking-wide text-red-600">
                {post.category.replace("_", " ")} • Archived
              </p>

              <p className="mt-1 text-xs text-red-700">
                Updated on: {post.updatedAt}
              </p>

              <div className="mt-3 flex gap-2">
                <Button
                  as="link"
                  size="xs"
                  href={`/blog/myposts/edit/${post.id}`}
                  variant="outline"
                >
                  Restore / Edit
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
