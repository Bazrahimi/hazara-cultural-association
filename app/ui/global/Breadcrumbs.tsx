import { lusitana } from "@/app/_lib/font";
import clsx from "clsx";
import Link from "next/link";

export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

type Props = {
  breadcrumbs: Breadcrumb[];
  isRTL?: boolean;
};

export default function Breadcrumbs({ breadcrumbs, isRTL = false }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      dir={isRTL ? "rtl" : "ltr"}
      className="mb-6 ml-2 block overflow-x-auto"
    >
      <ol
        className={clsx(
          lusitana.className,
          "flex items-center gap-x-1.5 text-sm text-gray-500 sm:gap-x-2 sm:text-base md:text-lg",
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={`${breadcrumb.href}-${index}`}
              className={clsx(
                "flex min-w-0 items-center", // min-w-0 is important for truncate
                breadcrumb.active && "font-medium text-gray-900",
              )}
              aria-current={breadcrumb.active ? "page" : undefined}
            >
              {breadcrumb.active ? (
                <span
                  className={clsx(
                    "min-w-0",
                    isLast && "truncate max-w-[5rem] md:max-w-[18rem]",
                  )}
                  title={isLast ? breadcrumb.label : undefined}
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="whitespace-nowrap hover:text-gray-700"
                >
                  {breadcrumb.label}
                </Link>
              )}

              {!isLast && (
                <span
                  className="mx-1 select-none text-gray-300"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
