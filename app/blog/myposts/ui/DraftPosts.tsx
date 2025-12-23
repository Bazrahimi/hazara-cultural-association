import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/category";
import type { PostsListRow } from "../../post/lib/definitions";

import { PostListConfigTrans } from "@/app/lib/translation";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";
const cfg = PostListConfigTrans.draft;

const DraftPosts = ({ drafts }: { drafts: PostsListRow[] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <PostHeader
        title={cfg.title.en}
        rtlTitle={cfg.title.rtl}
        description={cfg.description.en}
        rtlDescription={cfg.description.rtl}
      />

      {drafts.length === 0 ? (
        <div>
          <P className="text-slate-500" size="sm">
            {cfg.empty.en}
          </P>
          <P className="text-slate-500" size="sm">
            {cfg.empty.rtl}
          </P>
        </div>
      ) : (
        <div className="space-y-3">
          {drafts.map((post) => {
            const isRTL = post.isRtl === true;

            return (
              <article
                key={post.id}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm"
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
                    status="draft"
                  />
                </div>

                <P
                  className="mt-0.5 text-xs uppercase tracking-wide text-slate-600"
                  size="sm"
                >
                  {getCategoryLabel(post.categoryId, isRTL)}
                </P>

                <P className="mt-1 text-slate-500" size="sm">
                  {isRTL ? cfg.draftedOn.rtl : cfg.draftedOn.en}
                  <span className="inline-block" dir="ltr">
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
};

export default DraftPosts;
