// app/events/133rd-hazara-genocide-memorial/memoMemorial133.tsx
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import ImageGallery from "./ui/ImageGallery";
import { IMAGE_GALLERY, KEYNOTE_SPEAKERS } from "./util/helper";

// ---------------------------
// Memorial133
// ---------------------------
export default function Memorial133() {
  return (
    <main className="mx-auto mt-5 md:mt-10 px-5 md:px-10 py-5 md:py-10 bg-gray-50">
      {/* Title */}
      <Header as="h1" align="center">
        133rd Hazara Genocide Memorial
      </Header>
      <P className="mt-2 text-center text-sm text-gray-500">
        Drum Theatre, Dandenong, Victoria • Capacity 360 • Full house + entrance
        queue
      </P>

      {/* Overview */}
      {/* Overview */}
      <section className="mt-10 space-y-4">
        <Header as="h2" size="sm">
          Overview
        </Header>
        <P>
          The Hazara Cultural Association (HCA) hosted the{" "}
          <strong>133rd Hazara Genocide Memorial</strong> at the Drum Theatre,
          Dandenong (360 seats). The theatre reached a{" "}
          <strong>full house</strong>, with an additional{" "}
          <strong>queue of around ten attendees</strong> at the entrance during
          peak arrival. Alongside the memorial program, an exhibition documented
          the loss of <strong>innocent Hazara civilian lives</strong> over the
          past 25 years in Afghanistan and Quetta.
        </P>
        <P>
          This strong turnout reflects the Hazara community’s deep memory of
          persecution and dispossession in our ancestral homeland, and a shared
          commitment to remembrance, dignity, and justice.
        </P>
      </section>

      {/* Highlights */}
      <section className="mt-10 space-y-4">
        <Header as="h2" size="sm">
          Highlights
        </Header>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            Full-house attendance (all 360 seats); strong community turnout.
          </li>
          <li>
            Exhibition featuring <strong>names and photographs</strong> of
            Hazara civilians killed in Afghanistan and Quetta over the last 25
            years.
          </li>
          <li>
            Memorial banner with names and images to honour ordinary civilian
            lives.
          </li>
          <li>
            Keynotes by <strong>Grace Sultani</strong> (trauma & wellbeing) and{" "}
            <strong>Mohammad Ali Gulzari</strong> (archival research from
            British sources).
          </li>
        </ul>
      </section>

      {/* Speakers */}
      <section className="mt-10">
        <Header as="h2" size="sm">
          Speakers
        </Header>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {KEYNOTE_SPEAKERS.map((sp) => (
            <article
              key={sp.name}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-2 ring-blue-100 ring-offset-2">
                <Image
                  src={sp.img}
                  alt={sp.name}
                  fill
                  placeholder="blur"
                  blurDataURL={IMAGE_DEFAULT_BLUR}
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {sp.name}
                </h3>
                <p className="text-sm text-gray-600">{sp.role}</p>
                <p className="mt-1 text-sm text-gray-700">{sp.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Exhibition */}
      <section className="mt-10 space-y-4">
        <Header as="h2" size="sm">
          Exhibition
        </Header>
        <P>
          The foyer featured an exhibition of{" "}
          <strong>names and photographs</strong> of Hazara civilians who lost
          their lives in the last 25 years. Panels and banners provided context,
          personal stories, and historical timelines to honour their memory and
          educate attendees.
        </P>

        <P className="text-sm text-gray-600">
          Historical note: Sydney-born physician Lillias Anna Hamilton—formerly
          court physician to Amir Abdur Rahman Khan—described the Hazara war as
          a struggle for survival in{" "}
          <em>A Vizier’s Daughter: A Tale of the Hazara War</em> (1900).
        </P>
      </section>

      {/* Photo Gallery */}
      <section className="mt-10">
        <Header as="h2" size="sm">
          Photo Gallery
        </Header>
        <ImageGallery images={IMAGE_GALLERY} />
      </section>
    </main>
  );
}
