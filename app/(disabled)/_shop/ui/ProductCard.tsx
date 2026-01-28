// app/ui/shop/ProductCard.tsx
"use client";
import { cldCardHeroAuto } from "@/app/_lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import Image from "next/image";
import Link from "next/link";
import type { ProductHead } from "../lib/definitions";
import ProductPriceTag from "./ProductPriceTag";

const ProductCard = ({ product }: { product: ProductHead }) => {
  return (
    <Link href={`/shop/${product.slug}-${product.id}`}>
      <article
        key={product.id}
        className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:cursor-pointer"
      >
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image
            src={cldCardHeroAuto(product.mainImgPath)}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <Header
          as="h4"
          size="xs"
          className="mt-4 text-xl font-semibold text-gray-800"
        >
          {product.title}
        </Header>

        <div className="mt-2">
          {/* Use total price (price + postage) from your query */}
          <ProductPriceTag
            priceCents={product.priceCents}
            postageCents={product.postageCents}
            size="lg"
          />
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
