import PostsSection from "@/app/blog/ui/posts/PostsSection";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
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
    <section>
      <Header as="h2" size="sm" align={isRTL ? "right" : "left"}>
        {isRTL ? "مطالب مرتبط" : "Further reading"}
      </Header>
      <P className="mt-2 text-gray-600" dir={isRTL ? "rtl" : "ltr"}>
        {isRTL
          ? "چند مطلب دیگر که ممکن است برای شما جالب باشد."
          : "More articles you might find interesting."}
      </P>

      <div>
        <PostsSection
          mode="relatedPosts"
          postId={postId}
          categoryId={categoryId}
          title={title}
          limit={6}
          isRTL={isRTL}
        />
      </div>
    </section>
  );
};

export default RelatedPostsSection;
