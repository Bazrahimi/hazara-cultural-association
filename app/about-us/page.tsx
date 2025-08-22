import { inter, roboto } from "@/app/utils/font";
import clsx from "clsx";

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
    </section>
  );
}
