// app/shop/page.tsx
import Image from "next/image";

export default function ShopPage() {
  return (
    <section className="space-y-8">
      {/* Page header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl">
          HCA Shop
        </h1>
        <p className="mt-2 text-gray-700">
          Support the Hazara Cultural Association by purchasing cultural items,
          books, and memorabilia. All proceeds go toward advocacy and community
          programs.
        </p>
      </header>

      {/* TODO note */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
        <strong>Note:</strong> This shop is a placeholder. In the future, it will
        be used to generate revenue for HCA to fund advocacy,
        events, and community projects.
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            name: "Hazaristan Flag",
            price: "$25.00",
            img: "/images/sample/hazaristan-flag.png",
          },
          {
            name: "Hazara Cultural Book",
            price: "$35.00",
            img: "https://picsum.photos/400/300?random=2",
          },
          {
            name: "Hazara Traditional Ornament",
            price: "$45.00",
            img: "https://picsum.photos/400/300?random=3",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-4"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">
              {item.name}
            </h3>
            <p className="mt-1 text-gray-600">{item.price}</p>
            <button className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-white font-medium hover:bg-blue-500">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
