import { Suspense } from "react";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import PostCardSkeleton from "../ui/PostCardSkeleton";

export default function HazaristanCategoryPage() {
  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <CategoryBlogPosts
        categoryId={3}
        heading="Hazaristan"
        description="Hazaristan is the ancestral homeland of the Hazara people. Before the late 19th century, it functioned with its own autonomy and local leadership. British travellers and ethnographers described a Hazara country stretching from the vicinity of Kandahar towards Herat, Balkh, and Ghazni, with Hazaras controlling the valleys, waters, and rivers of these highlands—until conquest, displacement, and the settlement of Afghan nomadic groups forced many Hazaras from their lands."
      />
    </Suspense>
  );
}
