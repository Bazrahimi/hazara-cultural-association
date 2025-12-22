import z from "zod";
import { PostBase } from "../../post/lib/definitions";
import { BlogPostSchema } from "./schema";

export type ActionMode = "create" | "edit";

export type PostSuccessDBReturn = Pick<
  PostBase,
  "id" | "slug" | "isFeatured" | "status"
>;
export type BlogPostInput = z.infer<typeof BlogPostSchema>;
export type BlogPostState = {
  ok?: boolean;
  postTitle?: string;
  message?: string;
  errors?: Partial<Record<keyof BlogPostInput, string[]>>;
  data?: Partial<BlogPostInput>;
  success?: PostSuccessDBReturn;
};

export type ParseResult =
  | {
      ok: true;
      data: BlogPostInput;
    }
  | {
      ok: false;
      errors: BlogPostState["errors"];
      normalizedData: Partial<BlogPostInput>;
    };
