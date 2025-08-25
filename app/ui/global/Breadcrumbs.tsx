import { Breadcrumb } from "@/app/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/lib/font";

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 ml-2 block overflow-x-auto">
      <ol
        className={clsx(
          lusitana.className,
          "flex flex-wrap items-center gap-x-1.5 text-sm text-gray-500 sm:gap-x-2 sm:text-base md:text-lg",
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={breadcrumb.href}
              className={clsx(
                "flex items-center",
                breadcrumb.active && "font-medium text-gray-900",
              )}
              aria-current={breadcrumb.active ? "page" : undefined}
            >
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              {!isLast && (
                <span
                  className="mx-1 text-gray-300 select-none"
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
};

export default Breadcrumbs;