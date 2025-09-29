import { LogoGrid, LogoItem } from "./ui/LogoGrid";

const PARTNERS: LogoItem[] = [
  {
    name: "BOLAQ",
    logo: "/images/partners/bolag.png",
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
    name: "federation of hazara council of australia",
    logo: "/images/partners/fhca.png",
    href: "https://hazaracouncil.org.au/",
  },
  {
    name: "Hazara Shamama Association of Victoria Inc.",
    logo: "/images/partners/shammama.png",
    href: "https://hazarashamama.org.au/",
  },
  {
    name: "Australian Afghanistan Initiative Inc",
    logo: "/images/partners/australian-afghanistan.png",
    href: "https://afghanaustralianinitiative.weebly.com/",
  },
  // add more…
];

const SUPPORTERS: LogoItem[] = [
  {
    name: "World Connect Travel",
    logo: "/images/supporters/World-Connect-Travels.png",
    href: "https://example.org",
  },
  {
    name: "Fatima Yazdani",
    logo: "/images/supporters/fatima-yazdani.jpg",
    href: "https://example.com",
  },
    {
    name: "Brother's Rendering",
    logo: "/images/supporters/brothers-rendering.png",
    href: "https://www.facebook.com/brothersrendering.com.au/",
  },
  // add more…
];

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-2xl font-semibold">
        Partners & Supporters
      </h1>

      {/* Top: Partners */}
      <LogoGrid title="Partners" items={PARTNERS} />

      {/* Bottom: Supporters */}
      <LogoGrid title="Supporters" items={SUPPORTERS} />
    </main>
  );
}
