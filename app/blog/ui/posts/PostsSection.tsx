import { P } from "@/app/ui/global/paragraph";
import {
  getFeaturedPostsByCategory,
  getPublishedPostsByAuthor,
  getPublishedPostsByCategory,
  getRelatedPostsByTitle,
} from "../../post/lib/data";
import { POSTS_SECTION_GRID_CLASS } from "../../post/lib/helper";
import PostCard from "./PostCard";

type Base = { limit: number };

type Props =
  | (Base & { mode: "allPosts"; categoryId: number })
  | (Base & { mode: "featured"; categoryId: number })
  | (Base & { mode: "author"; authorId: number })
  | (Base & {
      mode: "relatedPosts";
      postId: number;
      categoryId: number;
      title: string;
      isRTL: boolean;
      limit: number;
    });

const PostsSection = async (props: Props) => {
  let posts;

  switch (props.mode) {
    case "allPosts":
      posts = await getPublishedPostsByCategory(props.categoryId, props.limit);
      break;

    case "featured":
      posts = await getFeaturedPostsByCategory(props.categoryId, props.limit);
      break;
    case "author":
      posts = await getPublishedPostsByAuthor(props.authorId, props.limit);
      break;
    case "relatedPosts":
      posts = await getRelatedPostsByTitle({
        postId: props.postId,
        categoryId: props.categoryId,
        title: props.title,
        isRTL:props.isRTL,
        limit: props.limit,
      });
      break;
    default: {
      // extra safety for future modes
      const _exhaustive: never = props;
      throw new Error(`Unhandled mode`);
    }
  }

  if (!posts.length)
    return (
      <P className="text-gray-500">
        {" "}
        No posts have been published in this category yet.{" "}
      </P>
    );

  return (
    <section className={POSTS_SECTION_GRID_CLASS}>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </section>
  );
};

export default PostsSection;
