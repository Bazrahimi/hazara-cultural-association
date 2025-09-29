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
    name: "Patron Group",
    logo: "/images/partners/patron.svg",
    href: "https://example.net",
  },
  // add more…
];

const SUPPORTERS: LogoItem[] = [
  {
    name: "Sunrise Trust",
    logo: "/images/partners/sunrise.svg",
    href: "https://example.org",
  },
  {
    name: "Community Hub",
    logo: "/images/partners/hub.png",
    href: "https://example.com",
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
