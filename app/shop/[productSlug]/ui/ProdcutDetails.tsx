import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import Image from "next/image";
import { ProductRecord } from "../../lib/definitions";
import ProductPriceTag from "../../ui/ProductPriceTag";

const ProductDetails = ({ product }: { product: ProductRecord }) => {
  const totalPriceCents = product.priceCents + product.postageCents;

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

        <div className="mt-3">
          {/* Single total price (price + postage) */}
          <ProductPriceTag
            priceCents={product.priceCents}
            postageCents={product.postageCents}
            size="lg"
          />
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
