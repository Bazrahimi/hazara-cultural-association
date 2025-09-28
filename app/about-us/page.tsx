import { Button } from "../ui/global/components";
import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import { Person, TeamGrid } from "./ui/TeamGrid";

const MANAGEMENT: Person[] = [
  {
    name: "Barat Ali Batoor",
    role: "President",
    img: "/images/member/batoor.png",
    bio: "An award-winning photojournalist and community leader, Batoor brings years of advocacy experience to HCA. He is committed to preserving Hazara heritage and amplifying the voices of his community.",
    contact: "+61 469 813 842"
  },
  {
    name: "Yasin Hazara",
    role: "Vice President | Senior Public Liaison officer",
    img: "/images/member/yasin.png",
  },
  { name: "Zabih Rezai", role: "Secretary", img: "/images/member/zabi.png" },
  {
    name: "Liaquat Ali",
    role: "Treasurer",
    img: "/images/member/Liaquat.jpeg",
  },

  {
    name: "Ali Khan",
    role: "Policy & Strategic Advisor",
    img: "/images/member/khan.png",
  },
  {
  name: "Baz Rahimi",
  role: "Governance Advisor | Full Stack Web Developer",
  img: "/images/member/rahimi.jpg",
},

  {
    name: "Latif Mahmoodi",
    role: "Assistant Public Liaison officer",
    img: "/images/member/latif.png",
  },

  { name: "Jawid Ahmad Nairan", img: "/images/member/nairan.png" },

  { name: "Abulfazl Zaki", img: "/images/member/abul.png" },
  { name: "Ahmad Reza Fayaz", img: "/images/member/fayaz.png" },
];

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
        {/* Acknowledgement of Country */}
        <section aria-labelledby="acknowledgement">
          <Header size="sm" as="h2">
            Acknowledgement of Country
          </Header>
          <P>
            We acknowledge the Traditional Owners of the lands on which we live,
            learn, and work, and pay our respects to Elders past and present. We
            recognise that sovereignty was never ceded.
          </P>
        </section>

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
        <section aria-labelledby="what-we-do">
          <Header size="sm" as="h2">
            What We Do
          </Header>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Advocate for recognition of the Hazara genocide and human rights
              protections
            </li>
            <li>
              Host cultural festivals, exhibitions, and community gatherings in
              Melbourne’s South-East
            </li>
            <li>
              Offer language, history, and youth programs that celebrate Hazara
              identity
            </li>
            <li>
              Run talks, workshops, and educational resources for schools and
              community groups
            </li>

            <li>
              Support families with local networks, referrals, and community
              initiatives
            </li>
          </ul>
        </section>

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
            <TeamGrid title="Executive Members" people={MANAGEMENT} />
            {/* You can add additional groups if needed, e.g.: */}
            {/* <TeamGrid title="Advisory Committee" people={ADVISORY} /> */}
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
