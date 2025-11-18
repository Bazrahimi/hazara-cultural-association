import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { BlogPost } from "../../lib/definitions";

const DraftPosts = ({ drafts }: { drafts: BlogPost[] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3">
        <Header as="h2" size="sm">
          Drafts
        </Header>
        <p className="text-xs text-slate-500">
          Posts that are not yet visible to the public.
        </p>
      </div>

      {drafts.length === 0 ? (
        <p className="text-sm text-slate-500">
          You don&apos;t have any drafts yet.
        </p>
      ) : (
        <div className="space-y-3">
          {drafts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm"
            >
              <h3 className="font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">
                {post.category.replace("_", " ")} • Draft
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Last updated: {post.updatedAt}
              </p>
              <div className="mt-3 flex gap-2">
                {/* Adjust this route to your actual edit page */}
                <Button
                  as="link"
                  variant="outline"
                  size="xs"
                  href={`/blog/edit/${post.id}`}
                >
                  Edit Draft
                </Button>

                {/* Optional: preview route – adjust if different */}
                <Button
                  as="link"
                  variant="outline"
                  size="xs"
                  href={`/blog/${post.slug}`}
                >
                  Preview
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DraftPosts;
