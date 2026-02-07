import { Button, Header, IMAGE_DEFAULT_BLUR, P } from "@/app/_ui";

import Image from "next/image";

export default function Memorial133Spotlight() {
  return (
    <section className="mx-auto">
      <Header as="h2" size="sm" align="center" className="mb-4">
        133rd Hazara Genocide Memorial — Community Spotlight
      </Header>

      <P className="text-gray-600">
        A full-house memorial at Drum Theatre brought together hundreds of
        community members — a powerful reminder that Hazara trauma is not just
        history, but a lived and ongoing reality.
      </P>

      {/* Keynote Speakers Highlight */}
      <P className="mt-2 text-sm text-gray-500">
        Featuring keynote reflections from <strong>Dr. Grace Sultani</strong>{" "}
        (refugee trauma, wellbeing & post-traumatic growth) and{" "}
        <strong>Mohammad J. Gulzari</strong> (historian & archivist specialising
        in Hazara history through British records), whose insights deepened the
        memorial’s historical and emotional significance.
      </P>

      {/* Image Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="relative h-56 w-full sm:h-64">
            <Image
              src="/images/memorial/133/full-house.jpg"
              alt="Audience filling all seats at Drum Theatre during the memorial."
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_DEFAULT_BLUR}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="p-4">
            <P size="sm">
              A packed theatre — reflecting collective grief, unity, and the
              community’s growing call for official recognition of the Hazara
              Genocide.
            </P>
          </div>
        </article>

        <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="relative h-56 w-full sm:h-64">
            <Image
              src="/images/memorial/133/mazari-bamiyan.jpg"
              alt="Portrait of Baba Mazari with memorial display."
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={IMAGE_DEFAULT_BLUR}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="p-4">
            <P size="sm">
              Honouring Baba Mazari and the Hazara struggle — linking memory,
              identity, and the fight for dignity and rights.
            </P>
          </div>
        </article>
      </div>

      {/* Significance */}
      <div className="mx-auto mt-10 max-w-3xl text-center">
        <P size="sm">
          The memorial was more than an event — it was a collective expression
          of pain, identity, and the continuing quest for justice. The turnout
          reaffirmed the urgent need for truth-telling and formal recognition of
          the Hazara Genocide.
        </P>
        <Button as="link" href="/blog/hazara-genocide-memorial/133" fullWidth>
          View Full Memorial Coverage →
        </Button>
      </div>
    </section>
  );
}
