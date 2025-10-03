import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(8, "Title must be at least 8 characters."),
  date: z.string().min(1, "Date is required."),
  location: z.string().optional().default(""),
  meetingWith: z.string().min(3, "Please specify who you met."),
  agenda: z.string().optional().default("[]"), // JSON string array
  summary: z.string().min(10, "Summary is too short."),
  body: z.string().optional().default(""),
  imageUrl: z.url().optional().or(z.literal("")).default(""),
});

export type CreateNews = z.infer<typeof CreateNewsSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string[]>>;
export type ActionState<T> = {
  data?: Partial<T>;
  errors?: FieldErrors<T>;
  message?: string;
  ok?: boolean;
};

export type CreateNewsState = ActionState<CreateNews>;
