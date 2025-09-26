import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import { Person, TeamGrid } from "./ui/TeamGrid";

const MANAGEMENT: Person[] = [
  {
    name: "Barat Ali Batoor",
    role: "President",
    img: "/images/member/batoor.png",
  },
  { name: "Zabih Rezai", role: "Secretary", img: "/images/member/zabi.png" },
  {
    name: "Liaquat Ali",
    role: "Treasurer",
    img: "/images/member/Liaquat.jpeg",
  },
  {
    name: "Yasin Hazara",
    role: "Media Officer",
    img: "/images/member/yasin.png",
  },
  {
    name: "Ali Khan",
    role: "Policy & Strategic Advisor",
    img: "/images/member/khan.png",
  },
  {
    name: "Baz Rahimi",
    role: "Software Engineer",
    img: "/images/member/rahimi.jpg",
  },
  {
    name: "Latif Mahmoodi",
    role: "Assistant Public Liaison officer",
    img: "/images/member/latif.png",
  },

  { name: "Jawad Ahmad Nairan", img: "/images/member/nairan.png" },

  { name: "Abul Ali", img: "/images/member/abul.png" },
  { name: "Fayaz", img: "/images/member/fayaz.png" },
];

// const MEMBERS: Person[] = [
//   // {
//   //   name: "Ali Khan",
//   //   role: "Legal Advisor | Lawyer",
//   //   img: "/images/member/khan.png",
//   // },
//   // { name: "Jawad Ahmad Nairan", img: "/images/member/nairan.png" },

//   // {
//   //   name: "Latif Mahmoodi",
//   //   role: "Assistant Public Liaison officer",
//   //   img: "/images/member/latif.png",
//   // },
//   // {
//   //   name: "Baz Rahimi",
//   //   role: "Software Engineer",
//   //   img: "/images/member/baz.jpg",
//   // },
//   // { name: "Abul Ali", img: "/images/member/abul.png" },
//   // { name: "Fayaz", img: "/images/member/fayaz.png" },
// ];

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

        <section aria-labelledby="governance">
          <Header as="h2" size="sm">
            Governance and Management
          </Header>
          <P>
            The Hazara Cultural Association is led by dedicated volunteers from
            across Melbourne, working together to serve the community.
          </P>

          <div className="mt-6 space-y-12">
            <TeamGrid title="Executive Members" people={MANAGEMENT} />
            {/* <TeamGrid title="Members" people={MEMBERS} /> */}
          </div>
        </section>
      </section>
    </main>
  );
}
