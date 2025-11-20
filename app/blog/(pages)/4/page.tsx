import { Suspense } from "react";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import PostCardSkeleton from "../ui/PostCardSkeleton";

export default function HazaraPersecutionCategoryPage() {
  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <CategoryBlogPosts
        categoryId={4}
        heading="Hazara Persecution"
        description="This section documents the long history of Hazara persecution under successive Afghan rulers since the creation of the modern Afghan state. From Abdur Rahman and Habibullah to Amanullah and later governments, many Hazaras were killed, displaced, or pushed into a scattered diaspora. Even during the eras of Karzai and Ghani—despite substantial international funding—Hazara communities continued to face marginalisation and attacks. Regimes and faces change, but the Afghan-centric exclusion of Hazaras, which began with the founding families of the state, has too often remained, and many Hazara activists describe the violence as an ongoing genocide."
      />
    </Suspense>
  );
}
