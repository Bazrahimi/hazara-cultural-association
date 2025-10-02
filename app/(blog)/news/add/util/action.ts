// app/(blog)/news/add/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { db } from "@/app/lib/db"; // <-- your Prisma/DB client

const NewsSchema = z.object({
  title: z.string().min(8, "Title must be at least 8 characters."),
  date: z.string().min(1, "Date is required."),
  location: z.string().optional().default(""),
  meetingWith: z.string().min(3, "Please specify who you met."),
  summary: z.string().min(10, "Summary is too short."),
  agenda: z.string().optional().default("[]"), // JSON string array
  outcomes: z.string().optional().default(""),
  body: z.string().optional().default(""),
  imageUrl: z.string().url().optional().or(z.literal("")).default(""),
  status: z.enum(["draft", "published"]).default("published"),
  tags: z.string().optional().default(""),
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function createNews(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = NewsSchema.safeParse(raw);

  if (!parsed.success) {
    // In production, you might throw a form error and render nicely
    console.error(parsed.error.flatten());
    throw new Error("Invalid form data.");
  }

  const data = parsed.data;

  // Parse agenda JSON
  let agenda: string[] = [];
  try {
    agenda = JSON.parse(data.agenda || "[]");
  } catch {
    agenda = [];
  }

  const slug = slugify(`${data.date}-${data.title}`);

  // TODO: save to DB (example Prisma shape)
  // await db.news.create({
  //   data: {
  //     title: data.title,
  //     slug,
  //     date: new Date(data.date),
  //     location: data.location,
  //     meetingWith: data.meetingWith,
  //     summary: data.summary,
  //     agenda,
  //     outcomes: data.outcomes,
  //     body: data.body,
  //     imageUrl: data.imageUrl || null,
  //     status: data.status,
  //     tags: data.tags
  //       ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
  //       : [],
  //   },
  // });

  // Revalidate list pages; redirect to News index (or detail if you have it)
  revalidatePath("/news");
  // If you have a detail route at /news/[slug], you can redirect there instead:
  // redirect(`/news/${slug}`);
  redirect("/news");
}
