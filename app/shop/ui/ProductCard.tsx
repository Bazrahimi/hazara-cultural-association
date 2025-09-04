// app/ui/shop/ProductCard.tsx
"use client";
import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import Image from "next/image";
import type { Product } from "../lib/definitions";
import ProductPriceTag from "./ProductPriceTag";
import { useCart } from "./cart/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const {add} = useCart()
  return (
    <article
      key={product.id}
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
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
  );
};

export default ProductCard;
