import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/category";

import { POST_STATUS, type PostsListRow } from "../../post/lib/definitions";

import { PostListConfigTrans } from "@/app/lib/translation/index";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";

const cfg = PostListConfigTrans.archived;

export default function ArchivedPosts({
  archived,
}: {
  archived: PostsListRow[];
}) {
  return (
    <section className="rounded-xl border border-red-200 bg-red-50/60 p-5">
      <PostHeader
        title={cfg.title.en}
        rtlTitle={cfg.title.rtl}
        description={cfg.description.en}
        rtlDescription={cfg.description.rtl}
      />

      {archived.length === 0 ? (
        <div>
          <P className="text-sm text-red-800">{cfg.empty.en}</P>
          <P className="text-sm text-red-800">{cfg.empty.rtl}</P>
        </div>
      ) : (
        <div className="space-y-3">
          {archived.map((post) => {
            const isRTL = post.isRtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-red-100 bg-white px-3 py-3 text-sm"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="flex items-start justify-between">
                  <Header
                    as="h4"
                    size="xs"
                    className={`font-semibold text-slate-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {post.title}
                  </Header>

                  <PostActionsMenu
                    isRTL={isRTL}
                    postId={post.id}
                    slug={post.slug}
                    statusValue={POST_STATUS.ARCHIVED}
                  />
                </div>

                <P className="mt-0.5 text-xs uppercase tracking-wide text-gray-600">
                  {getCategoryLabel(post.categoryId, isRTL)}
                </P>

                <P className="mt-1 text-gray-400" size="sm">
                  {isRTL ? cfg.updatedOn.rtl : cfg.updatedOn.en}
                  <span dir="ltr" className="inline-block">
                    {post.updatedAt}
                  </span>
                </P>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
