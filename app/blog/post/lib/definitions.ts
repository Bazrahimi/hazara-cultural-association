import { CategoryId } from "../../lib/category";

export const POST_STATUS = {
  DRAFTED: 1,
  PUBLISHED: 2,
  ARCHIVED: 3,
} as const;

export type StatusCode = (typeof POST_STATUS)[keyof typeof POST_STATUS];

type PostDbRow = {
  post_id: number; // id on the database. However, in front end we are handling it as postId
  user_id: number;
  title: string;
  slug: string;
  content_html: string;
  status_code: StatusCode;
  // status: "draft" | "published" | "archived"; TODO: remove the column from the database after pushing the the code
  hero_img_path: string | null;
  is_featured: boolean;
  event_date: string | null; // timestamptz
  event_location: string | null;
  created_at: string; // timestamptz
  updated_at: string; // timestamptz
  is_rtl: boolean;
  category_id: CategoryId
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

// export type PostStatus = PostBase["status"];

export type PostCardRow = Pick<
  PostBase,
  | "postId"
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
  | "postId"
  | "title"
  | "contentHtml"
  | "categoryId"
  | "statusCode"
  | "heroImgPath"
  | "isFeatured"
  | "eventDate"
  | "eventLocation"
  | "isRtl"
>;

export type PostsListRow = Pick<
  PostBase,
  | "postId"
  | "title"
  | "slug"
  | "heroImgPath"
  | "isFeatured"
  | "isRtl"
  | "categoryId"
  | "statusCode"
  | "createdAt"
  | "updatedAt"
>;

export type PostInsertUpdateSuccessDBReturn = Pick<
  PostBase,
  "postId" | "slug" | "isFeatured" | "statusCode" | "categoryId" | "isRtl"
>;

// export type ActionMode = "create" | "edit";

