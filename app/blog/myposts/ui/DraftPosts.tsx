import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { BlogPost } from "../../lib/definitions";
import { getCategoryLabel } from "../../lib/helper";

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
          {drafts.map((post) => {
            const isRTL = post.is_rtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <h3
                  className={`font-semibold text-slate-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Category label using CATEGORY_MAP */}
                <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">
                  {getCategoryLabel(post.category_id, isRTL)} • Draft
                </p>

                {/* Keep date LTR regardless of direction */}
                <p className="mt-1 text-xs text-slate-500">
                  Last updated:{" "}
                  <span className="inline-block" dir="ltr">
                    {post.updatedAt}
                  </span>
                </p>

                <div
                  className={`mt-3 flex gap-2 ${
                    isRTL ? "justify-end" : "justify-start"
                  }`}
                >
                  <Button
                    as="link"
                    variant="outline"
                    size="xs"
                    href={`/blog/myposts/edit/${post.id}`}
                  >
                    {isRTL ? "ویرایش" : "Edit Draft"}
                  </Button>

                  <Button
                    as="link"
                    variant="outline"
                    size="xs"
                    href={`/blog/${post.slug}`}
                  >
                    {isRTL ? "پیش‌نمایش" : "Preview"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default DraftPosts;
