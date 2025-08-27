import Image from "next/image";
import { Header } from "../ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "../ui/global/ImageShimer";
import { P } from "../ui/global/paragraph";

type Person = { name: string; role: string; img: string };

const PEOPLE: Person[] = [
  {
    name: "Barat Ali Batoor",
    role: "President",
    img: "/images/member/batoor.png",
  },
  {
    name: "Zabih Rezai",
    role: "Secretary",
    img: "https://picsum.photos/200/200?random=1",
  }, // add picsum in next.config.js images.remotePatterns
  {
    name: "Liaquat Ali",
    role: "Treasurer",
    img: "/images/member/Liaquat.jpeg",
  },
  {
    name: "Yasin Hazara",
    role: "Media Officer",
    img: "https://picsum.photos/200/200?random=3",
  }, // add picsum in next.config.js images.remotePatterns
];

export default function AboutUsPage() {
  return (
    // container + breathing room
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Header as="h1" align="center">
        About Us
      </Header>
      <P>
        Hazara Cultural Association (HCA) is a community-driven nonprofit
        organisation in Melbourne dedicated to preserving Hazara culture,
        teaching our history, and reclaiming our identity.
      </P>

      {/* Content stack */}
      <section className="mt-10 space-y-12">
        {/* Purpose */}
        <section aria-labelledby="purpose">
          <Header size="sm" as="h2">
            {" "}
            Our Purpose
          </Header>
          <P>
            The purpose of HCA is to{" "}
            <strong>advocate for the Hazara people</strong> and to teach younger
            generations about our history, heritage, and language. For thousands
            of years, Hazaras lived in their ancestral homeland, rich with
            culture, traditions, and stories. Yet, for the past 130 years,
            Hazara history has been erased from official books and denied by
            successive rulers in Kabul.
          </P>
          <P className="mt-3 ">
            Our mission is to reclaim this identity, to give every Hazara a
            sense of belonging, and to ensure that our culture and language are
            preserved and passed down with pride.
          </P>
        </section>

        {/* Vision */}
        <section aria-labelledby="vision">
          <Header size="sm" as="h2">
            Our Vision
          </Header>
          <P>
            We envision a world where the Hazara people’s story is told
            truthfully, where our cultural heritage is valued, and where justice
            is pursued without fear. Our vision is to advocate among the Hazara
            diaspora, in civil society, and in the international community for
            the <strong>official recognition of the Hazara genocide</strong>.
          </P>
          <P className="mt-3 ">
            Through education, advocacy, and cultural programs, we aim to
            empower Hazaras everywhere to reconnect with their roots, strengthen
            their communities, and proudly reclaim their identity.
          </P>
        </section>

        {/* Governance */}
        <section aria-labelledby="governance">
          <Header as="h2" size="sm">
            {" "}
            Governance and Management
          </Header>
          <P>
            The Hazara Cultural Association is led by dedicated volunteers from
            across Melbourne, working together to serve the community.
          </P>

          {/* 
            ✅ Upgrades:
            - Tighter gaps on small screens (gap-x-4 gap-y-6)
            - Scale spacing up at sm/md
            - Cards with ring, shadow, hover
            - Centered cards with max width to avoid wide empty right gap
          */}
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 md:gap-10">
            {PEOPLE.map((person) => (
              <article
                key={person.name}
                className="group mx-auto w-full max-w-xs rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-blue-100 ring-offset-2 shadow sm:h-28 sm:w-28 md:h-32 md:w-32">
                  {/* subtle bg to avoid white flash while the image loads */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50" />
                  <Image
                    src={person.img}
                    alt={`${person.name}, ${person.role}`}
                    fill
                    placeholder="blur"
                    blurDataURL={IMAGE_DEFAULT_BLUR}
                    className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 6rem, (max-width: 768px) 7rem, 8rem"
                    priority={false}
                  />
                </div>

                <h3 className="mt-3 text-base font-semibold text-gray-900 sm:text-lg">
                  {person.name}
                </h3>
                <P className="text-sm text-gray-600">{person.role}</P>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
