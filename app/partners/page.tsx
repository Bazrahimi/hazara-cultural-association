import { DonateRoutes } from "../lib/routes";
import { Header } from "../ui/global/Header";
import { P } from "../ui/global/paragraph";
import { LogoGrid, type CTA, type LogoItem } from "./ui/LogoGrid";

const PARTNERS: LogoItem[] = [
  {
    name: "BOLAQ",
    logo: "/images/partners/bolaq.png", // <- check filename
    href: "https://www.bolaq.org/",
  },
  {
    name: "Hazara Archives",
    logo: "/images/partners/hazara-archives.webp",
    href: "https://hazaraarchives.com/",
  },
  {
    name: "Hazara Genocide Archive",
    logo: "/images/partners/hazara-genocide.png",
    href: "https://www.hazaragenocide.com/",
  },
  {
    name: "Huma Media",
    logo: "/images/partners/huma-media.png",
    href: "https://www.facebook.com/HumaMedia",
  },
  // {
  //   name: "Federation of Hazara Councils of Australia (FHCA)",
  //   logo: "/images/partners/fhca.png",
  //   href: "https://hazaracouncil.org.au/",
  // },
  // {
  //   name: "Hazara Shamama Association of Victoria Inc.",
  //   logo: "/images/partners/shamama.png", // <- check filename
  //   href: "https://hazarashamama.org.au/",
  // },
  // {
  //   name: "Australian Afghanistan Initiative Inc.",
  //   logo: "/images/partners/australian-afghanistan.png",
  //   href: "https://afghanaustralianinitiative.weebly.com/",
  // },
];

const SUPPORTERS: LogoItem[] = [
  {
    name: "World Connect Travel",
    logo: "/images/supporters/World-Connect-Travels.png",
    href: "https://worldconnecttravels.com.au/",
  },
  {
    name: "Fatima Yazdani",
    logo: "/images/supporters/fatima-yazdani.jpg",
    href: "https://www.realestate.com.au/agent/fatima-yazdani-3342044",
  },
  {
    name: "Brother's Rendering",
    logo: "/images/supporters/brothers-rendering.png",
    href: "https://www.facebook.com/brothersrendering.com.au/",
  },
];

const PARTNERS_CTA: CTA = {
  href: "/contact-us",
  text: "Share our vision and values? Explore partnership opportunities with HCA.",
  buttonLabel: "Become a Partner",
};

const SUPPORTERS_CTA: CTA = {
  href: DonateRoutes.root(),
  text: "Believe in our work? Your contribution funds our programs and community services.",
  buttonLabel: "Donate Now",
};

export default function Page() {
  return (
    <main >
      <Header as="h1" align="center">
        Partners & Supporters
      </Header>

      <P>
        We partner with organisations that actively advocate for the official
        recognition of the Hazara genocide and the protection of human rights,
        and we co-host events that educate, mobilise, and celebrate our
        community in Melbourne’s South-East.
      </P>

      {/* Partners (values-aligned) */}
      <LogoGrid
        title="Partners"
        items={PARTNERS}
        cta={PARTNERS_CTA}
        nameWrap="wrap"
      />

      {/* Supporters (financial via donate) */}
      <LogoGrid title="Supporters" items={SUPPORTERS} cta={SUPPORTERS_CTA} />

      {/* Tiny footer note, no extra CTA */}
      <p className="mt-12 text-center text-sm text-gray-500">
        Missing your logo or details?{" "}
        <a href="/contact-us" className="text-blue-600 hover:underline">
          Contact us
        </a>{" "}
        and we’ll add it.
      </p>
    </main>
  );
}
