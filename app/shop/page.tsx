// app/shop/page.tsx
"use client";

import type { Breadcrumb } from "../lib/definitions";
import Breadcrumbs from "../ui/global/Breadcrumbs";
import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import { Product } from "./lib/definitions";
import ProductCard from "./ui/ProductCard";

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "HCA Shop",
    href: "/shop",
    active: true,
  },
];

const PRODUCTS: Product[] = [
  {
    id: "flag",
    name: "Hazaristan Flag",
    price: 25,
    img: "/images/sample/hazaristan-flag.png",
  },
  {
    id: "book",
    name: "Hazara Cultural Book",
    price: 35,
    img: "https://picsum.photos/400/300?random=2",
  },
  {
    id: "ornament",
    name: "Hazara Traditional Ornament",
    price: 45,
    img: "https://picsum.photos/400/300?random=3",
  },
];

export default function ShopPage() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="space-y-8">
        {/* Page header */}

        <Header as="h1" align="center" className="m-3">
          HCA Shop
        </Header>
        <P className="mt-2">
          Support the Hazara Cultural Association by purchasing cultural items,
          books, and memorabilia. All proceeds go toward advocacy and community
          programs.
        </P>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </section>
    </>
  );
}
