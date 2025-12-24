import { PostListConfigTrans } from "@/app/lib/translation";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/category";
import { POST_STATUS, type PostsListRow } from "../../post/lib/definitions";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";

const cfg = PostListConfigTrans.published;

const PublishedPosts = ({ published }: { published: PostsListRow[] }) => {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
      <PostHeader
        title={cfg.title.en}
        rtlTitle={cfg.title.rtl}
        description={cfg.description.en}
        rtlDescription={cfg.description.rtl}
      />

      {published.length === 0 ? (
        <div>
          <P className="text-sm text-emerald-800">{cfg.empty.en}</P>
          <P className="text-sm text-emerald-800">{cfg.empty.rtl}</P>
        </div>
      ) : (
        <div className="space-y-3">
          {published.map((post) => {
            const isRTL = post.isRtl === true;

            return (
              <article
                key={post.postId}
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
                    postId={post.postId}
                    slug={post.slug}
                    isFeatured={post.isFeatured}
                    statusValue={POST_STATUS.PUBLISHED}
                  />
                </div>

                <P
                  className="mt-0.5 uppercase tracking-wide text-gray-600"
                  size="sm"
                >
                  {getCategoryLabel(post.categoryId, isRTL)}
                </P>

                <P className="mt-1 text-xs text-gray-400">
                  {isRTL ? cfg.publishedOn.rtl : cfg.publishedOn.en}
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
