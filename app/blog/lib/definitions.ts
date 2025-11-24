export type PostCardRow = {
  id: number;
  title: string;
  slug: string;
  hero_img_path: string | null;
  category_id: number;
  is_rtl: boolean;
  authorName: string;
};

export type PostStatus = "draft" | "archived" | "published";

export type PostDetailRow = PostCardRow & {
  content_html: string;
  status: PostStatus;
  event_date: string | null;
  event_location: string | null;
  is_featured: boolean;
  publishedAt: string | null;
  authorId: number;
};
