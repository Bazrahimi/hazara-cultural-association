// app/events/133rd-hazara-genocide-memorial/memoMemorial133.tsx
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";
import type { Metadata } from "next";
import Image from "next/image";
import Gallery from "./ui/Gallery";

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
      "Full house: all 360 seats at Drum Theatre, Dandenong. A collective remembrance of genocide and colonisation (1891–1893), with losses recorded by Faiz Mohammad Katib in *Siraj al-Tawarikh* (vol. 4) as affecting over 400,000 Hazara families (~2.4 million people).",
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
  {
    src: "/images/memorial/133/grace-sultani.png",
    alt: "Grace Sultani (PhD candidate) speaking at HCA’s 133rd Hazara Genocide Memorial.",
    caption:
      "Grace Sultani (PhD candidate) urged the Hazara community to wear their ancestral identity and traditions—and carry their language—with pride. She highlighted the long history of erasure; the memorial recognises more than a century of systematic erasure and dehumanisation of Hazaras under successive rulers in Kabul.",
  },
  {
    src: "/images/memorial/133/huma-media-doc.jpg",
    alt: "Projected black-and-white scene from a Huma Media documentary during the memorial at Drum Theatre; stage with HCA lectern and portrait, audience in the foreground.",
    caption:
      "Huma Media’s documentary reflected on Hazara resilience and the struggle for survival, recalling Shirin and her companions’ last stand—retreating to a mountain to avoid capture and enslavement—as preserved in community histories and early accounts.",
  },
  {
  src: "/images/memorial/133/mohammad-j-gulzari.jpg",
  alt: "Mohammad J. Gulzari speaking on stage at HCA’s 133rd Hazara Genocide Memorial, holding a microphone and a gift bag; event backdrop with sponsor logos.",
  caption:
    "Mohammad J. Gulzari, historian and archivist, cited British colonial records describing how Kabul authorities mobilised volunteer militias by enlisting religious authorities to brand Hazaras as ‘infidels,’ leading to indiscriminate shootings and the enslavement of Hazaras.",
}


  // Add more…
];

const SPEAKERS = [
  {
    name: "Grace Sultani",
    role: "Social worker & PhD candidate (University of Newcastle) — refugee trauma, post-traumatic growth & wellbeing",
    img: "/images/memorial/133/speaker/grace-sultani.png",
    bio: "PhD candidate researching post-traumatic growth and wellbeing among refugees; keynote on trauma, resilience, and Hazara community wellbeing.",
  },

  {
    name: "Mohammad J. Gulzari",
    role: "Independent historian & archivist (Hazara history; British archives)",
    img: "/images/memorial/133/speaker/gulzari.png",
    bio: "Researcher of Hazara history drawing on British colonial records and declassified documents; speaker on the 1891–93 events and the Hazara Pioneers; contributor to Hazara Archives.",
  },
];

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
        <Gallery images={GALLERY} />
      </section>
    </main>
  );
}
