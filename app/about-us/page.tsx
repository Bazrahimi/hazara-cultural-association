import { inter, roboto } from "@/app/utils/font";
import clsx from "clsx";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <section className="space-y-10">
      {/* Page header */}
      <header className="text-center">
        <h1
          className={clsx(
            inter.className,
            "text-3xl font-bold sm:text-4xl lg:text-5xl text-blue-700"
          )}
        >
          About Us
        </h1>
        <p
          className={clsx(
            roboto.className,
            "mt-3 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed"
          )}
        >
          Hazara Cultural Association (HCA) is a community-driven nonprofit
          organisation in Melbourne dedicated to preserving Hazara culture,
          teaching our history, and reclaiming our identity.
        </p>
      </header>

      {/* Purpose section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Our Purpose</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The purpose of HCA is to{" "}
          <strong>advocate for the Hazara people</strong>
          and to teach younger generations about our history, heritage, and
          language. For thousands of years, Hazaras lived in their ancestral
          homeland, rich with culture, traditions, and stories. Yet, for the
          past 130 years, Hazara history has been erased from official books and
          denied by successive rulers in Kabul.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Our mission is to reclaim this identity, to give every Hazara a sense
          of belonging, and to ensure that our culture and language are
          preserved and passed down with pride.
        </p>
      </section>

      {/* Vision section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          We envision a world where the Hazara people’s story is told
          truthfully, where our cultural heritage is valued, and where justice
          is pursued without fear. Our vision is to advocate among the Hazara
          diaspora, in civil society, and in the international community for the{" "}
          <strong>official recognition of the Hazara genocide</strong>.
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">
          Through education, advocacy, and cultural programs, we aim to empower
          Hazaras everywhere to reconnect with their roots, strengthen their
          communities, and proudly reclaim their identity.
        </p>
      </section>

      {/* /* Governance section (with placeholder team members) */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900">
          Governance and Management
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The Hazara Cultural Association is led by dedicated volunteers from
          across Melbourne, working together to serve the community.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "???? Hussaini",
              role: "President",
              img: "https://picsum.photos/200/200?random=1",
            },
            {
              name: "???? Jawadi",
              role: "Vice President",
              img: "https://picsum.photos/200/200?random=2",
            },
            {
              name: "??? Yazdani",
              role: "Secretary",
              img: "https://picsum.photos/200/200?random=3",
            },
            {
              name: "???? Kazemi",
              role: "Treasurer",
              img: "https://picsum.photos/200/200?random=4",
            },
            {
              name: "??? Karimi",
              role: "Community Liaison",
              img: "https://picsum.photos/200/200?random=5",
            },
            {
              name: "??? Sadiqi",
              role: "Program Coordinator",
              img: "https://picsum.photos/200/200?random=6",
            },
          ].map((person) => (
            <div
              key={person.name}
              className="flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
