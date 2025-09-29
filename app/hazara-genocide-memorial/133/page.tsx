// app/events/133rd-hazara-genocide-memorial/page.tsx
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "133rd Hazara Genocide Memorial — Event Report | HCA",
  description:
    "Event recap of HCA’s 133rd Hazara Genocide Memorial at Drum Theatre, Dandenong. Full house (360 seats), exhibition, speakers, and photos.",
  openGraph: {
    title: "133rd Hazara Genocide Memorial — Event Report | HCA",
    description:
      "Full-house memorial at Drum Theatre, Dandenong with exhibition and keynote speakers.",
    type: "article",
  },
};

// ---------------------------
// Helpers / Types
// ---------------------------
type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

// Put your images in /public/images/events/133rd/...
const GALLERY: GalleryImage[] = [
  {
    src: "/images/memorial/133/full-house.jpg",
    alt: "Audience filling all seats at Drum Theatre during the memorial.",
    caption:
      "Full house: all 360 seats at Drum Theatre, Dandenong. A collective remembrance of genocide and colonisation (1891–1893), with losses documented by Faiz Mohammad Katib in Siraj al-Tawarikh (vol. 4) as affecting over 400,000 Hazara families (~2.4 million people).",
  },
  {
    src: "/images/memorial/133/mazari-bamiyan.jpg",
    alt: "Portrait of Abdul Ali 'Baba' Mazari on an easel beside a signed #HazarasForYes poster.",
    caption:
      "A tribute linking Hazara memory of Bamiyan with First Nations' connection to Country — standing together for dignity, truth, and rights.",
  },
  {
    src: "/images/memorial/133/girl-school.jpg",
    alt: "Exhibition panels showing names and photographs of Hazara students from a girls' school in West Kabul.",
    caption:
      "Names and photos honouring Hazara teenagers killed in an attack on a girls’ school in West Kabul.",
  },
  {
    src: "/images/memorial/133/exhibition1.jpg",
    alt: "Memorial banner listing names and images of Hazara civilians.",
    caption:
      "Memorial banner with names and images of Hazara civilians lost over the past 25 years; some researchers describe the Hazara genocide as among the longest-running.",
  },
  // Add more…
];

const SPEAKERS = [
  {
    name: "Dr. Grace Sultani",
    role: "Researcher on Hazara post-traumatic experiences & wellbeing",
    img: "/images/memorial/133/speaker/grace-sultani.png", // replace if available
    bio: "Keynote on trauma, resilience, and wellbeing within Hazara communities.",
  },
  {
    name: "Mohammad J Gulzari",
    role: "Historian & archivist",
    img: "/images/memorial/133/speaker/gulzari.png",
    bio: "Presented findings from thousands of primary-source manuscripts gathered from British archives.",
  },
];

// ---------------------------
// Page
// ---------------------------
export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Title */}
      <Header as="h1" align="center">
        133rd Hazara Genocide Memorial
      </Header>
      <P className="mt-2 text-center text-sm text-gray-500">
        Drum Theatre, Dandenong, Victoria • Capacity 360 • Full house + entrance
        queue
      </P>

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
            Keynotes by <strong>Dr. Grace Sultani</strong> (trauma & wellbeing)
            and <strong>Mohammad Ali Gulzari</strong> (archival research from
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
          {SPEAKERS.map((sp) => (
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
        <P className="text-sm text-gray-500">
          <em>Content note:</em> Some images and descriptions may be
          distressing.
        </P>
      </section>

      {/* Photo Gallery */}
      <section className="mt-10">
        <Header as="h2" size="sm">
          Photo Gallery
        </Header>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {GALLERY.map((img) => (
            <figure
              key={img.src}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="relative h-40 w-full sm:h-44 md:h-48">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={IMAGE_DEFAULT_BLUR}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              {img.caption && (
                <figcaption className="px-3 py-2 text-xs text-gray-700">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
