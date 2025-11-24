
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import {  } from "../../lib/definitions";
import type { BloggerPostListRow } from "../lib/data";

import { getCategoryLabel } from "../../lib/helper";

export default function ArchivedPosts({ archived }: { archived: BloggerPostListRow[] }) {
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
          {archived.map((post) => {
            const isRTL = post.is_rtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-red-100 bg-white px-3 py-3 text-sm"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {/* Title */}
                <h3
                  className={`font-semibold text-red-900 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.title}
                </h3>

                {/* Category Label */}
                <p className="mt-0.5 text-xs uppercase tracking-wide text-red-600">
                  {getCategoryLabel(post.category_id, isRTL)} • Archived
                </p>

                {/* Updated Date (LTR always) */}
                <p className="mt-1 text-xs text-red-700">
                  {isRTL ? "به‌روزرسانی: " : "Updated on: "}
                  <span dir="ltr" className="inline-block">
                    {post.updatedAt}
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
                    href={`/blog/myposts/edit/${post.id}`}
                    variant="outline"
                  >
                    {isRTL ? "بازگردانی / ویرایش" : "Restore / Edit"}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
