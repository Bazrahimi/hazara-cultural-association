// app/shop/page.tsx
import type { Breadcrumb } from "../lib/definitions";
import Breadcrumbs from "../ui/global/Breadcrumbs";
import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import ProductCard from "./ui/ProductCard";
import { sql } from "../lib/db";
import type { Product} from "./lib/definitions";
import { cldCardHeroAuto } from "../lib/cloudinary"; // ✅ import your helper

const breadcrumbs: Breadcrumb[] = [
  { label: "Home", href: "/" },
  { label: "HCA Shop", href: "/shop", active: true },
];

export default async function ShopPage() {
  const products = await sql<Product[]>`
    SELECT 
      id ::int , 
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
        <Header as="h1" align="center" className="m-3">
          HCA Shop
        </Header>
        <P className="mt-2">
          Support the Hazara Cultural Association by purchasing cultural items,
          books, and memorabilia. All proceeds go toward advocacy and community
          programs.
        </P>

        {products.length === 0 ? (
          <P className="text-center text-gray-500">No products available yet.</P>
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
