import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/helper";
import type { BloggerPostListRow } from "../lib/data";
import { BLOGGER_POST_LIST_CONFIG } from "../lib/helper";
import PostActionsMenu from "./PostActionsMenu";
import PostHeader from "./PostHeader";

const cfg = BLOGGER_POST_LIST_CONFIG.published;

const PublishedPosts = ({ published }: { published: BloggerPostListRow[] }) => {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
      <PostHeader
        title={cfg.title}
        rtlTitle={cfg.rtlTitle}
        description={cfg.description}
        rtlDescription={cfg.rtlDescription}
      />

      {published.length === 0 ? (
        <div>
          <P className="text-sm text-emerald-800">{cfg.empty}</P>
          <P className="text-sm text-emerald-800">{cfg.rtlEmpty}</P>
        </div>
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
                <div className="flex items-start justify-between"></div>
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
              
                  />
                </div>

                <P
                  className="mt-0.5 uppercase tracking-wide text-gray-600"
                  size="sm"
                >
                  {getCategoryLabel(post.category_id, isRTL)}
                </P>

                <P className="mt-1 text-xs text-gray-400">
                  {isRTL ? "منتشر شده در: " : "Published on:"}{" "}
                  <span dir="ltr" className="inline-block">
                    {post.createdAt}
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

export default PublishedPosts;
