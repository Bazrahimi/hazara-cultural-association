import CategoryBlogPosts from "./ui/CategoryBlogPosts";

export default function NewsCategoryPage() {
  return (
    <CategoryBlogPosts
      categoryId={1}
      heading="News"
      description="Latest news, statements, and updates from the Hazara community and Hazaristan—covering current affairs, advocacy, culture, and the ongoing struggle for safety and equal rights after generations of persecution under successive Afghan states."
    />
  );
}