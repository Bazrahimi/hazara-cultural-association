// LogoGrid.tsx
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";

export type LogoItem = {
  name: string;
  logo: string;
  href: string;
  bgClass?: string;
};

export type CTA = { href: string; text: string; buttonLabel: string };

export function LogoGrid({
  title,
  items,
  cta,
  defaultBgClass = "bg-gray-50 dark:bg-gray-800",
  nameWrap = "truncate", // 'truncate' | 'wrap'
}: {
  title?: string;
  items: LogoItem[];
  cta?: CTA;
  defaultBgClass?: string;
  nameWrap?: "truncate" | "wrap";
}) {
  const id = title ? title.toLowerCase().replace(/\s+/g, "-") : undefined;
  const nameClass =
    nameWrap === "wrap"
      ? "mt-2 text-center text-sm font-medium text-gray-800 break-words"
      : "mt-2 truncate text-center text-sm font-medium text-gray-800";

  return (
    <section aria-labelledby={id} className="mt-10">
      {title && <Header as="h2">{title}</Header>}

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p) => (
          <article
            key={p.name}
            className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
            title={p.name}
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.name}`}
              className={`flex h-24 items-center justify-center overflow-hidden rounded-lg border border-gray-50 ${p.bgClass ?? defaultBgClass}`}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={220}
                height={80}
                className="max-h-16 w-auto object-contain"
              />
            </a>

            <h3 className={nameClass}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                aria-label={`Open ${p.name}`}
              >
                {p.name}
              </a>
            </h3>
          </article>
        ))}
      </div>

      {cta && (
        <div className="mt-8 text-center">
          <P size="sm" className="text-gray-500">
            {cta.text}
          </P>

          <Button as="link" href={cta.href} className="mt-3">
            {cta.buttonLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
