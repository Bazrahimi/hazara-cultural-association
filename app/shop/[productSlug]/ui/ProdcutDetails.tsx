"use client";
import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CartItem, ProductHead, ProductRecord } from "../../lib/definitions";
import { useCart } from "../../ui/cart/CartContext";

const QTY_MIN = 1;
const QTY_MAX = 10;

const ProductDetails = ({ product }: { product: ProductRecord }) => {
  const { add } = useCart();

  // local qty selection (defaults to 1)
  const [qty, setQty] = useState<number>(1);

  // Build a ProductHead (no qty here—qty is passed separately)
  const cartItem: CartItem = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    mainImgPath: product.mainImgPath,
    priceCents: product.priceCents,
    postageCents: product.postageCents,
    qty: qty
  };

  const unitTotalCents = product.priceCents + product.postageCents;

  // Optional: live preview of total based on selected qty
  const selectedTotalCents = useMemo(
    () => qty * unitTotalCents,
    [qty, unitTotalCents]
  );

  // keep qty safe
  const handleQtyChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const next = Number(e.target.value);
    const clamped = Math.max(
      QTY_MIN,
      Math.min(QTY_MAX, isNaN(next) ? 1 : next)
    );
    setQty(clamped);
  };

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src={cldCardHeroAuto(product.mainImgPath)}
          alt={product.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div>
        <Header as="h1" size="md" className="text-3xl text-gray-900">
          {product.title}
        </Header>

        {/* Price: per-unit and selected total */}
        <div className="mt-2">
          <P size="lg">
            ${(unitTotalCents / 100).toFixed(2)}
            <span className="ml-2 text-sm text-gray-500">
              (per item incl. postage)
            </span>
          </P>
          {qty > 1 && (
            <p className="text-sm text-gray-600">
              {qty} × ${(unitTotalCents / 100).toFixed(2)} ={" "}
              <span className="font-semibold">
                ${(selectedTotalCents / 100).toFixed(2)}
              </span>
            </p>
          )}
        </div>

        {/* Qty + Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="col-span-2 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select
              id="qty"
              name="qty"
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
              value={qty}
              onChange={handleQtyChange}
            >
              {Array.from({ length: QTY_MAX }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <Button variant="outline">Buy Now</Button>
          <Button onClick={() => add(cartItem)}>Add to Cart</Button>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-700">Category</dt>
            <dd className="mt-1 capitalize text-gray-600">
              {product.category}
            </dd>
          </div>
          {product.origin && (
            <div>
              <dt className="font-medium text-gray-700">Origin</dt>
              <dd className="mt-1 text-gray-600">{product.origin}</dd>
            </div>
          )}
        </dl>

        <div
          className="prose mt-6 max-w-none prose-p:my-2 prose-headings:mt-6 prose-a:text-blue-600"
          // description_html is already sanitized on write; otherwise sanitize here.
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </div>

      {/* Gallery */}
      {product.otherImgPaths?.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {product.otherImgPaths.map((path, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={cldCardHeroAuto(path)}
                alt={`${product.title} - image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
