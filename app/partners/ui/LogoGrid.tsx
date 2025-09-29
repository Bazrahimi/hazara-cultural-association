import { Button } from "@/app/ui/global/components";
import Image from "next/image";

export type LogoItem = {
  name: string;
  logo: string;               // e.g. "/images/partners/acme.svg"
  href: string;               // website or social profile
  bgClass?: string;           // optional per-item bg override
};

export type CTA = {
  href: string;
  text: string;
  buttonLabel: string;
};

export function LogoGrid({
  title,
  items,
  cta, // <- different per section
  defaultBgClass = "bg-gray-50 dark:bg-gray-800",
}: {
  title?: string;
  items: LogoItem[];
  cta?: CTA;
  defaultBgClass?: string;
}) {
  const id = title ? title.toLowerCase().replace(/\s+/g, "-") : undefined;

  return (
    <section aria-labelledby={id} className="mt-10">
      {title && (
        <h2 id={id} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
      )}

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((p) => (
          <article
            key={p.name}
            className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
            title={p.name}
          >
            {/* Logo area with background */}
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

            {/* Name under logo */}
            <h3 className="mt-2 truncate text-center text-sm font-medium text-gray-800">
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

      {/* Section-specific CTA */}
      {cta && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{cta.text}</p>
          <Button as="link" href={cta.href} className="mt-3">
            {cta.buttonLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
