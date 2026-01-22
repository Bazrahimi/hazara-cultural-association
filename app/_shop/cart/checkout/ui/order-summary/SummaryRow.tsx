"use client";
import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { CartItem } from "@/app/_shop/lib/definitions";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import Link from "next/link";

const SummaryRow = ({ item }: { item: CartItem }) => {
  const lineDollar = (item.qty * (item.priceCents + item.postageCents)) / 100;

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      {/* ✅ Link goes INSIDE the td */}
      <td className="py-4 px-6">
        <Link
          href={`/shop/${item.slug}-${item.id}`}
          className="flex items-center gap-4 hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-md"
        >
          <Image
            alt={`${item.title}'s Image`}
            src={cldCardHeroAuto(item.mainImgPath)}
            width={64}
            height={64}
            className="rounded-md object-cover shadow-sm"
            sizes="(max-width: 640px) 48px, 64px"
          />
          <div className="flex flex-col">
            <Header
              as="h4"
              size="xs"
              className="text-gray-800 font-semibold tracking-tight"
            >
              {item.title}
            </Header>
            <P size="sm" className="text-gray-500 mt-1">
              ${lineDollar.toFixed(2)}
            </P>
          </div>
        </Link>
      </td>

      <td className="py-4 px-6 text-center text-gray-700 font-medium tabular-nums">
        {item.qty}
      </td>

      <td className="py-4 px-6 text-right text-hca-blue-main font-semibold tabular-nums">
        ${lineDollar.toFixed(2)}
      </td>
    </tr>
  );
};

export default SummaryRow;
