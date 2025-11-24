export type BlogPostCard = {
  id: number;
  title: string;
  slug: string;
  hero_img_path: string | null;
  category_id: number;
  is_rtl: boolean;
  authorName: string;
};

export type BlogPostDetail = BlogPostCard & {
  content_html: string;
  status: "draft" | "archived" | "published";
  event_date: string | null;
  event_location: string | null;
  is_featured: boolean;
  publishedAt: string | null;
  authorId: number;
};