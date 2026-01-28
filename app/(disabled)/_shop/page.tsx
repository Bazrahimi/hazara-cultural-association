// app/shop/page.tsx

// import { Breadcrumb } from "@/app/contact-us/_lib/definitions";
import { sql } from "@/app/_lib/db";
import Breadcrumbs, { type Breadcrumb } from "@/app/ui/global/Breadcrumbs";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import type { ProductHead } from "./lib/definitions";
import ProductCard from "./ui/ProductCard";

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "HCA Shop", href: "/shop", active: true },
];

export default async function ShopPage() {
  const products = await sql<ProductHead[]>`
    SELECT 
      id ::int , 
      slug,
      title, 
      price_cents                        AS "priceCents",
      postage_cents                      AS "postageCents",
      main_img_path                      AS "mainImgPath"
    FROM shop_listings
    ORDER BY created_at DESC
    LIMIT 30
  `;

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="space-y-8">
        {/* Maintenance Notice */}
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <strong>Important Notice:</strong> The HCA Shop is currently in
          maintenance/testing mode. Listed items are not yet available for sale,
          and checkout/payment is disabled. Please do{" "}
          <u>not attempt to make purchases</u>. We will notify the community
          once the shop is officially launched.
        </div>
        <Header as="h1" align="center" className="m-3">
          HCA Shop
        </Header>
        <P className="mt-2">
          Support the Hazara Cultural Association by purchasing cultural items,
          books, and memorabilia. All proceeds go toward advocacy and community
          programs.
        </P>

        {products.length === 0 ? (
          <P className="text-center text-gray-500">
            No products available yet.
          </P>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
