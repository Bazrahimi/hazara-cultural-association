import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/category";
import type { PostsListRow } from "../../post/lib/definitions";
import { BLOGGER_POST_LIST_CONFIG } from "../lib/helper";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";
const cfg = BLOGGER_POST_LIST_CONFIG.draft;

const DraftPosts = ({ drafts }: { drafts: PostsListRow[] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <PostHeader
        title={cfg.title}
        rtlTitle={cfg.rtlTitle}
        description={cfg.description}
        rtlDescription={cfg.rtlDescription}
      />

      {drafts.length === 0 ? (
        <div>
          <P className="text-slate-500" size="sm">
            {cfg.empty}
          </P>
          <P className="text-slate-500" size="sm">
            {cfg.rtlEmpty}
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
                  Last updated:{" "}
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
