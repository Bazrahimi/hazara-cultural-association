import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { BlogPost } from "../../lib/definitions";
import { getCategoryLabel } from "../../lib/helper";

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
          {published.map((post) => {
            const isRTL = post.is_rtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-emerald-100 bg-white px-3 py-3 text-sm"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {/* Title */}
                <h3
                  className={`font-semibold text-emerald-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Category label */}
                <p className="mt-0.5 text-xs uppercase tracking-wide text-emerald-600">
                  {getCategoryLabel(post.category_id, isRTL)} • Published
                </p>

                {/* Published Date (always LTR) */}
                <p className="mt-1 text-xs text-emerald-700">
                  {isRTL ? "منتشر شده در: " : "Published on:"}{" "}
                  <span dir="ltr" className="inline-block">
                    {post.createdAt}
                  </span>
                </p>

                {/* Buttons */}
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
