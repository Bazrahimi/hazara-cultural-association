"use client"
import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import Image from "next/image";
import type { Product } from "../lib/definitions";
import { useCart } from "./cart/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <>
      <article
        key={product.id}
        className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4"
      >
        <div className="relative h-40 w-full overflow-hidden rounded-md">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <Header
          as="h4"
          size="xs"
          className="mt-3 text-lg font-semibold text-gray-800"
        >
          {product.name}
        </Header>
        <p className="mt-1 text-gray-600">{ `AUD ${product.price}`}</p>
        <Button fullWidth onClick={() => add(product)}>
          Add to Cart
        </Button>
      </article>
    </>
  );
};

export default ProductCard;
