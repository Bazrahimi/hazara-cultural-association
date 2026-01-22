import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";
import type { ProductDetailsData } from "../lib/definitions";
import ProductDetails from "./ui/ProdcutDetails";

const page = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;

  const idFromSlug = Number(productSlug.match(/-(\d+)$/)?.[1]);

  let rows: ProductDetailsData[] = [];

  if (Number.isFinite(idFromSlug)) {
    rows = await sql<ProductDetailsData[]>`
    SELECT
      l.id::int                               AS "id",
      l.user_id                               AS "userId",
      l.slug                                  AS "slug",
      l.title                                 AS "title",
      l.description_html                      AS "descriptionHtml",
      l.price_cents                           AS "priceCents",
      l.postage_cents                         AS "postageCents",
      l.category                              AS "category",
      l.origin                                AS "origin",
      l.main_img_path                         AS "mainImgPath",
      l.other_img_paths                       AS "otherImgPaths",
      l.created_at                            AS "createdAt",
      (up.first_name || ' ' || up.last_name)  AS "sellerFullName"
    FROM shop_listings l
    LEFT JOIN user_profiles up ON up.user_id = l.user_id  -- ✅ alias defined
    WHERE l.id = ${idFromSlug}
    LIMIT 1

  `;
  }

  const product = rows[0];

  if (!product) notFound();

  return (
    <div className="mx-auto p-4 md:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default page;
