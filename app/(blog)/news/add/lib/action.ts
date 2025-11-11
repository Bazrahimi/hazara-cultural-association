// app/(blog)/news/add/actions.ts
"use server";
import { z } from "zod";

import { CreateNewsSchema, CreateNewsState } from "./schema";

export async function createNews(
  prevState: CreateNewsState | undefined,
  formData: FormData
) {
  const rawData = {
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    location: formData.get("location") as string,
    meetingWith: formData.get("meetingWith") as string,
    agenda: formData.get("agenda") as string,
    summary: formData.get("location") as string,
    body: formData.get("body") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  const validated = CreateNewsSchema.safeParse({
    title: rawData.title,
    date: rawData.date,
    location: rawData.location,
    meetingWith: rawData.meetingWith,
    agenda: rawData.agenda,
    summary: rawData.location,
    body: rawData.body,
    imageUrl: rawData.imageUrl,
  });

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    return {
      ...rawData,
      ok: false,
      message: "Complete the above field!",
      errors: {
        title: tree.properties?.title?.errors,
        date: tree.properties?.date?.errors,
        location: tree.properties?.location?.errors,
        meetingWith: tree.properties?.meetingWith?.errors,
        agenda: tree.properties?.agenda?.errors,
        summary: tree.properties?.summary?.errors,
        body: tree.properties?.body?.errors,
        imageUrl: tree.properties?.imageUrl?.errors,
      },
    };
  }

  const data = validated.data;

  try {
  } catch (error) {
    console.error("Failed to create the news", error);
    return {
      ...rawData,
      ok: false,
      message: "Failed to submit the news. Please try again later.",
      errors: undefined,
    };
  }
}
