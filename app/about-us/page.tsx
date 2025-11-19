import { Button } from "../ui/global/components";
import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import Acknowledgements from "./ui/Acknowledgements";
import { TeamGrid } from "./ui/TeamGrid";
import WhatWeDo from "./ui/WhatWeDo";

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Header as="h1" align="center">
        About Us
      </Header>

      <P>
        The Hazara Cultural Association (HCA) is a community-driven,
        volunteer-led nonprofit rooted in Melbourne’s{" "}
        <strong>South-Eastern suburbs</strong> — home to thousands of Hazara
        families who have found a new beginning after seeking asylum from more
        than a century of persecution and dispossession. From this base, we work
        to{" "}
        <strong>
          preserve and celebrate the Hazara people’s rich culture and history
        </strong>
        , contribute to Australia’s multicultural life, and strengthen a sense
        of belonging for our community — especially for younger generations
        growing up in Australia.
      </P>

      {/* Content stack */}
      <section className="mt-10 space-y-12">
        {/* Acknowledgement */}
        <Acknowledgements />
    

        {/* Purpose */}
        <section aria-labelledby="purpose">
          <Header size="sm" as="h2">
            Our Purpose
          </Header>
          <P>
            HCA exists to <strong>preserve Hazara culture and language</strong>,
            <strong> share our history truthfully</strong>, and
            <strong> advocate for justice and dignity</strong> for our people.
            For thousands of years, Hazaras lived in their ancestral homeland
            rich in traditions and stories. Over the past 130 years, much of
            this history was erased from{" "}
            <strong>official Afghan government narratives</strong>. We work to
            ensure it is remembered, understood, and passed on with pride.
          </P>
        </section>

        {/* Vision */}
        <section aria-labelledby="vision">
          <Header size="sm" as="h2">
            Our Vision
          </Header>
          <P>
            We envision a future where Hazara culture is respected, our story is
            told accurately, and our children grow up confident in their
            identity. We advocate within the Hazara diaspora, civil society, and
            the international community for the{" "}
            <strong>official recognition of the Hazara genocide</strong> and for
            a future grounded in truth, safety, and opportunity.
          </P>
        </section>

        {/* What we do */}
        <WhatWeDo />

        {/* Governance */}
        <section aria-labelledby="governance">
          <Header as="h2" size="sm">
            Governance & Management
          </Header>
          <P>
            The Hazara Cultural Association is{" "}
            <strong>entirely volunteer-led</strong>. Our executive and committee
            work together to uphold good governance, community service, and
            cultural stewardship.
          </P>

          <div className="mt-6 space-y-12">
            <TeamGrid />
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="get-involved" className="text-center">
          <Header as="h2" size="sm">
            Get Involved
          </Header>
          <P>
            Join us to preserve culture, amplify truth, and support our
            community in Melbourne’s South-East. Whether you volunteer, attend
            events, or partner with us, your contribution makes a difference.
          </P>

          <Button as="link" href="/contact-us">
            Contact Us
          </Button>
        </section>
      </section>
    </main>
  );
}
