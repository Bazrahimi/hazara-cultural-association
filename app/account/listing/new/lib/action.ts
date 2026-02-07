"use server";
import { getSession } from "@/app/_lib";
import { sql } from "@/app/_lib/db";
import { ListingActionState, ListingSchema } from "./schema";

export async function createListing(
  _prev: ListingActionState | undefined,
  formData: FormData,
): Promise<ListingActionState> {
  const session = await getSession();

  if (!session?.userId) {
    return {
      ok: false,
      message: "You are not allowed to create listing.",
    };
  }

  const rawData: Record<string, unknown> = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [
      key,
      typeof value === "string" ? value : undefined,
    ]),
  );

  const parsed = ListingSchema.safeParse(rawData);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe,
      data: rawData,
    };
  }

  const d = parsed.data;

  try {
    await sql /* sql */ `
      INSERT INTO shop_listings
        (user_id, title, description_html, price_cents, postage_cents, category, origin, main_img_path, hero_img_path)
      VALUES
        (${session.userId}, ${d.title}, ${d.description},
         ${Math.round(d.price * 100)}, ${Math.round(d.postage * 100)},
         ${d.category}, ${d.origin || null}, ${d.mainImg}, ${d.otherImgs || null})
    `;

    return { ok: true, message: "Listing created successfully." };
  } catch (err: unknown) {
    console.error("DB error inserting listing:", err);

    return {
      ok: false,
      message: "Something went wrong while creating the listing.",
      data: rawData,
    };
  }
}
