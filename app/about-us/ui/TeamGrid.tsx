import Image from "next/image";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";

export type Person = {
  name: string;
  role?: string;
  img: string;
  bio?: string;
  contact?: string; // phone or email; renders tel: or mailto: automatically
};

type TeamGridProps = {
  title: string;
  people: Person[];
};

export function TeamGrid({ title, people }: TeamGridProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, "-");

  const isEmail = (v: string) => v.includes("@");

  return (
    <section aria-labelledby={sectionId}>
      <Header as="h2" size="sm" id={sectionId}>
        {title}
      </Header>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-7 md:grid-cols-3 md:gap-8">
        {people.map((person) => (
          <article
            key={person.name}
            className="mx-auto w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Avatar */}
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-blue-100 ring-offset-2 shadow-sm sm:h-28 sm:w-28">
              <Image
                src={person.img}
                alt={`${person.name}${person.role ? `, ${person.role}` : ""}`}
                fill
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
                className="rounded-full object-cover"
                sizes="6rem"
              />
            </div>

            {/* Name + Role (centered) */}
            <h3 className="mt-3 text-center text-base font-semibold text-gray-900 sm:text-lg">
              {person.name}
            </h3>
            {person.role && (
              <P className="text-center text-sm text-gray-600">{person.role}</P>
            )}

            {/* Divider */}
            {(person.bio || person.contact) && (
              <div className="mx-auto mt-3 w-full max-w-[92%] border-t border-gray-100" />
            )}

            {/* Bio (left aligned, compact) */}
            {person.bio && (
              <P className="mt-3 text-left text-sm leading-snug text-gray-700">
                {person.bio}
              </P>
            )}

            {/* Contact (left aligned with icon) */}
            {person.contact && (
              <div className="mt-2 text-left">
                {isEmail(person.contact) ? (
                  <a
                    href={`mailto:${person.contact}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {/* Mail icon */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                    {person.contact}
                  </a>
                ) : (
                  <a
                    href={`tel:${person.contact}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {/* Phone icon */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.67-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {person.contact}
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
