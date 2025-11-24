import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/helper";
import type { BloggerPostListRow } from "../lib/data";

const DraftPosts = ({ drafts }: { drafts: BloggerPostListRow[] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3">
        <Header as="h2" size="sm">
          Drafts
        </Header>
        <P className="text-slate-500">
          Posts that are not yet visible to the public.
        </P>
      </div>

      {drafts.length === 0 ? (
        <P className="text-slate-500" size="sm">
          You don&apos;t have any drafts yet.
        </P>
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
                <Header
                  as="h4"
                  size="xs"
                  className={`font-semibold text-slate-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </Header>

                <P
                  className="mt-0.5 text-xs uppercase tracking-wide text-slate-600"
                  size="sm"
                >
                  {getCategoryLabel(post.category_id, isRTL)}
                </P>

                <P className="mt-1 text-slate-500" size="sm">
                  Last updated:{" "}
                  <span className="inline-block" dir="ltr">
                    {post.updatedAt}
                  </span>
                </P>

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
