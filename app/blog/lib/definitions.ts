type PostDbRow = {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content_html: string;
  status: "draft" | "published" | "archived";
  hero_img_path: string | null;
  is_featured: boolean;
  event_date: string | null; // timestamptz
  event_location: string | null;
  created_at: string; // timestamptz
  updated_at: string; // timestamptz
  is_rtl: boolean;
  category_id: number; // smallint but number in TS
};

// 1) Convert "event_date" -> "eventDate"
type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

// 2) Map object keys using CamelCase
type CamelizeKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

// 3) Base camelCase blog-post type, directly derived from DB
export type BlogPostBase = CamelizeKeys<PostDbRow>;

export type PostStatus = BlogPostBase["status"];

export type PostCardRow = Pick<
  BlogPostBase,
  | "id"
  | "userId"
  | "title"
  | "slug"
  | "heroImgPath"
  | "isFeatured"
  | "categoryId"
  | "isRtl"
> & {
  authorName: string;
};

export type PostRow = BlogPostBase & {
  authorName: string;
};

// export type EditPostRow = Pick<
//   BlogPostBase,
//   | "id"
//   | "userId"
//   | "title"
//   | "contentHtml"
//   | "categoryId"
//   | "status"
//   | "heroImgPath"
//   | "isFeatured"
//   | "eventDate"
//   | "eventLocation"
//   | "isRtl"
// >;
