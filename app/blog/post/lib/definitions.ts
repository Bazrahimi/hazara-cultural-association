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
export type PostBase = CamelizeKeys<PostDbRow>;

export type PostStatus = PostBase["status"];

export type PostCardRow = Pick<
  PostBase,
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

export type PostRow = PostBase & {
  authorName: string;
};

export type EditPostRow = Pick<
  PostBase,
  | "id"
  | "title"
  | "contentHtml"
  | "categoryId"
  | "status"
  | "heroImgPath"
  | "isFeatured"
  | "eventDate"
  | "eventLocation"
  | "isRtl"
>;

export type PostsListRow = Pick<
  PostBase,
  | "id"
  | "title"
  | "slug"
  | "heroImgPath"
  | "isFeatured"
  | "isRtl"
  | "categoryId"
  | "status"
  | "createdAt"
  | "updatedAt"
>;
