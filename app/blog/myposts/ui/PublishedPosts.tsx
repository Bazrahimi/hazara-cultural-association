import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/helper";
import type { BloggerPostListRow } from "../lib/data";

const PublishedPosts = ({ published }: { published: BloggerPostListRow[] }) => {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
      <div className="mb-3">
        <Header as="h2" size="sm">
          Published
        </Header>
        <P className="text-xs text-emerald-700">
          Posts currently live and visible on the website.
        </P>
      </div>

      {published.length === 0 ? (
        <P className="text-sm text-emerald-800">
          You haven&apos;t published any posts yet.
        </P>
      ) : (
        <div className="space-y-3">
          {published.map((post) => {
            const isRTL = post.is_rtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-emerald-100 bg-white px-3 py-3 text-sm"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <Header
                  as="h4"
                  size="xs"
                  className={`font-semibold text-gray-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </Header>

                <P className="mt-0.5 uppercase tracking-wide text-gray-600" size="sm">
                  {getCategoryLabel(post.category_id, isRTL)} 
                </P>

                <P className="mt-1 text-xs text-gray-400">
                  {isRTL ? "منتشر شده در: " : "Published on:"}{" "}
                  <span dir="ltr" className="inline-block">
                    {post.createdAt}
                  </span>
                </P>

                <div
                  className={`mt-3 flex gap-2 ${
                    isRTL ? "justify-end" : "justify-start"
                  }`}
                >
                  <Button
                    as="link"
                    size="xs"
                    href={`/blog/${post.slug}`}
                    variant="outline"
                  >
                    {isRTL ? "مشاهده" : "View Live"}
                  </Button>

                  <Button
                    as="link"
                    href={`/blog/myposts/edit/${post.id}`}
                    variant="outline"
                    size="xs"
                  >
                    {isRTL ? "ویرایش" : "Edit"}
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

export default PublishedPosts;
