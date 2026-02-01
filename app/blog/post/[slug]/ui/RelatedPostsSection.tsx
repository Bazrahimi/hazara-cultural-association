import { Header, P } from "@/app/_ui";
import PostsSection from "@/app/blog/ui/posts/PostsSection";
export type RelatedPostsSection = {
  postId: number;
  categoryId: number;
  title: string;
  isRTL: boolean;
};

const RelatedPostsSection = ({
  postId,
  categoryId,
  title,
  isRTL,
}: RelatedPostsSection) => {
  return (
    <section className="pb-14">
      <div className="rounded-2xl border border-gray-100 bg-white/80 p-1 md:p-5 shadow-sm backdrop-blur-lg">
        <Header as="h2" size="sm" align="center">
          {isRTL ? "مطالب مرتبط" : "Further reading"}
        </Header>
        <P className="mt-2 text-gray-600 text-center">
          {isRTL
            ? "چند مطلب دیگر که ممکن است برای شما جالب باشد."
            : "More articles you might find interesting."}
        </P>

        <div className="mt-10">
          <PostsSection
            mode="relatedPosts"
            postId={postId}
            categoryId={categoryId}
            title={title}
            limit={6}
            isRTL={isRTL}
          />
        </div>
      </div>
    </section>
  );
};

export default RelatedPostsSection;
