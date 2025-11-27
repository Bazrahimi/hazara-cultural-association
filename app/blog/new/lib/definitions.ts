import { BlogPostBase } from "../../lib/definitions";

export type ActionMode = "create" | "edit";

export type PostSuccessDBReturn = Pick<BlogPostBase, "id" | "slug" | "isFeatured" | "status">