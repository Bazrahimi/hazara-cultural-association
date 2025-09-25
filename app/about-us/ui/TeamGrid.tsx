import Image from "next/image";

import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";

export type Person = { name: string; role?: string; img: string };

type TeamGridProps = {
  title: string;
  people: Person[];
};

export function TeamGrid({ title, people }: TeamGridProps) {
  return (
    <section aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}>
      <Header as="h2" size="sm">
        {title}
      </Header>
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 md:gap-10">
        {people.map((person) => (
          <article
            key={person.name}
            className="group mx-auto w-full max-w-xs rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-blue-100 ring-offset-2 shadow sm:h-28 sm:w-28 md:h-32 md:w-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50" />
              <Image
                src={person.img}
                alt={`${person.name}${person.role ? `, ${person.role}` : ""}`}
                fill
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
                className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 6rem, (max-width: 768px) 7rem, 8rem"
              />
            </div>
            <h3 className="mt-3 text-base font-semibold text-gray-900 sm:text-lg">
              {person.name}
            </h3>
            {person.role && (
              <P className="text-sm text-gray-600">{person.role}</P>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
