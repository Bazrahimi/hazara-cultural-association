import { CategoryId } from "./category";
import { CamelizeKeys } from "@/app/_lib/helper";

export const POST_STATUS = {
  DRAFTED: 1,
  PUBLISHED: 2,
  ARCHIVED: 3,
} as const;

export type StatusCode = (typeof POST_STATUS)[keyof typeof POST_STATUS];

type PostDbRow = {
  post_id: number; 
  user_id: number;
  title: string;
  slug: string;
  content_html: string;
  excerpt: string;
  status_code: StatusCode;
  // status: "draft" | "published" | "archived"; TODO: remove the column from the database after pushing the the code
  hero_img_path: string | null;
  is_featured: boolean;
  event_date: string | null; // timestamptz
  event_location: string | null;
  created_at: Date; // timestamptz
  updated_at: Date; // timestamptz
  is_rtl: boolean;
  category_id: CategoryId;
};



// 3) Base camelCase blog-post type, directly derived from DB
export type PostBase = CamelizeKeys<PostDbRow>;

// export type PostStatus = PostBase["status"];

export type PostCardRow = Pick<
  PostBase,
  | "postId"
  | "title"
  | "slug"
  | "heroImgPath"
  | "isFeatured"
  | "categoryId"
  | "isRtl"
> & {
   excerpt?: PostBase["excerpt"];
  
};

export type PostRow = Omit<PostBase, "createdAt"> & {
  authorName: string;
};

export type EditPostRow = Pick<
  PostBase,
  | "postId"
  | "title"
  | "contentHtml"
  | "excerpt"
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
  | "isFeatured"
  | "isRtl"
  | "categoryId"
  | "statusCode"
  | "updatedAt"
>;

export type PostInsertUpdateSuccessDBReturn = Pick<
  PostBase,
  "postId" | "slug" | "isFeatured" | "statusCode" | "categoryId" | "isRtl"
>;

export type PostAuthCtx = {
  postId: number;
  isAdmin: boolean;
  userId: number;
};

// export type FetchPostsMode = "allPosts" | "featured" | "author";
