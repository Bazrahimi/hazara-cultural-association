import { ActionState } from "@/app/_lib/actionHelper";
import z from "zod";

export const ListingSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  price: z.preprocess((v) => Number(v), z.number().min(0, "Price must be ≥ 0")),
  postage: z.preprocess(
    (v) => Number(v),
    z.number().min(0, "Postage must be ≥ 0")
  ),
  category: z.string().trim().min(1, "Category is required"),
  origin: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required"),
  mainImg: z.string().min(1, "Main image is required"),
  otherImgs: z.string().trim().optional(),
});

export type ListingInput = z.infer<typeof ListingSchema>;
export type ListingState = ActionState<ListingInput>

export type ListingActionState = {
  ok?: boolean;
  message?: string;
  // field -> array of errors
  errors?: Partial<Record<keyof ListingInput, string[]>>;
  data?: Partial<ListingInput>;
};
