"use server"
import { requireUser } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";
import { sanitizeHtml } from "@/app/lib/sanitize";
import { ListingActionState, ListingInput, ListingSchema } from "./schema";

export async function createListing(
  _prev: ListingActionState | undefined,
  formData: FormData
): Promise<ListingActionState> {
  const { userId } = await requireUser();

  // collect raw values from the form
  const raw: ListingInput = {
    title: String(formData.get("title") ?? ""),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    price: formData.get("price") as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postage: formData.get("postage") as any,
    category: String(formData.get("category") ?? ""),
    origin: String(formData.get("origin") ?? ""),
    description: sanitizeHtml(String(formData.get("description") ?? "")),
    mainImg: String(formData.get("mainImg") ?? ""),
    otherImgs: String(formData.get("otherImgs") ?? ""),
  };

  console.log(raw)

  const parsed = ListingSchema.safeParse(raw);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: fe,
      data: raw,
    };
  }

  const d = parsed.data;
  console.log(d)

  // Insert into DB — adjust table/columns to yours
  await sql /* sql */ `
    INSERT INTO shop_listings
      (user_id, title, description_html, price_cents, postage_cents, category, origin, main_img_url, hero_img_url)
    VALUES
      (${userId}, ${d.title}, ${d.description},
       ${Math.round(d.price * 100)}, ${Math.round(d.postage * 100)},
       ${d.category}, ${d.origin || null}, ${d.mainImg}, ${d.otherImgs || null})
  `;

  return { ok: true, message: "Listing created successfully." };
}
