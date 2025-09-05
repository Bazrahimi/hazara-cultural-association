import { sql } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { ProductRecord } from "../lib/definitions";
import ProductDetails from "./ui/ProdcutDetails";

const page = async ({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) => {
  const { productSlug } = await params;
  const idFromSlug = Number(productSlug.match(/-(\d+)$/)?.[1]);

  let rows: ProductRecord[] = [];

  if (Number.isFinite(idFromSlug)) {
    rows = await sql<ProductRecord[]>`
    SELECT
      id ::int,
      slug,
      title,
      description_html        AS "descriptionHtml",
      price_cents              AS "priceCents",
      postage_cents           AS "postageCents",
      category,
      origin,
      main_img_path           AS "mainImgPath",
      other_img_paths         AS "otherImgPaths",
      created_At              AS "createdAt"
    FROM shop_listings
    WHERE id = ${idFromSlug}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  }

  const product = rows[0];
  if (!product) notFound();

  console.log("Page rendered_______");

  return (
    <div className="mx-auto p-4 md:p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default page;
