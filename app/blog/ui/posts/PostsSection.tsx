import { P } from "@/app/ui/global/paragraph";
import {
  getFeaturedPostsByCategory,
  getPublishedPostsByAuthor,
  getPublishedPostsByCategory,
} from "../../post/lib/data";
import { FetchPostsMode } from "../../post/lib/definitions";
import { POSTS_SECTION_GRID_CLASS } from "../../post/lib/helper";
import PostCard from "./PostCard";

type Props = {
  categoryId: number;
  mode: FetchPostsMode;
  limit: number;
};

const PostsSection = async ({ categoryId, mode, limit }: Props) => {
  let posts;

  switch (mode) {
    case "allPosts":
      posts = await getPublishedPostsByCategory(categoryId, limit);
      break;

    case "featured":
      posts = await getFeaturedPostsByCategory(categoryId, limit);
      break;
    case "author":
      posts = await getPublishedPostsByAuthor(categoryId, limit);
      break;
    default:
      throw new Error(`Unhandled mode: ${mode}`);
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
