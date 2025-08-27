import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { Header } from "./global/Header";
import { P } from "./global/paragraph";

// -------------------------------
// Reusable className tokens
// -------------------------------
const CN = {
  footer: "mt-16 bg-yellow-500 text-gray-900",
  wrap: "mx-auto max-w-7xl px-6 py-14",
  // CHANGED: better responsive grid (1 → 2 → 4)
  grid: "grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-4",
  sectionTitle: "text-gray-950", // Header renders black; this is fine for overrides
  list: "space-y-2 text-sm",
  listDense: "space-y-3 text-sm",
  // CHANGED: unified link styles + focus-visible
  link: "underline underline-offset-4 decoration-black/20 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-sm",
  socialLink:
    "flex items-center gap-2 underline underline-offset-4 decoration-black/20 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-sm",
  contactItem: "flex items-start gap-2",
  contactIcon: "mt-1 text-black",
  // footer bottom
  copy: "border-t border-black/20 px-6 py-4 text-center text-xs text-gray-800",
  copyLink: "underline underline-offset-4 hover:opacity-80",
  copyLinkAlt: "underline underline-offset-4 hover:opacity-80",
};

// -------------------------------
// Data (keeps JSX tiny)
// -------------------------------
const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com",
    label: "Facebook",
    iconClass: "text-blue-600",
    aria: "Visit HCA Facebook page",
    Icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    iconClass: "text-pink-600",
    aria: "Visit HCA Instagram page",
    Icon: FaInstagram,
  },
];

const CONTACT = {
  location: "Melbourne, Victoria, Australia",
  email: "info@hazara.org.au",
  phone: "+61 000 000 000",
};

const Footer = () => {
  return (
    <footer className={CN.footer} role="contentinfo">
      <div className={`${CN.wrap} ${CN.grid}`}>
        {/* Organisation Info — spans 2 cols on sm+ for nicer reading width */}
        <div className="sm:col-span-2">
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Hazara Cultural Association
          </Header>
          <P size="md" className="text-gray-900">
            A non-profit organisation in Australia dedicated to preserving Hazara
            culture, supporting community initiatives, and advocating for justice
            and human rights.
          </P>
        </div>

        {/* Quick Links */}
        <div>
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Quick Links
          </Header>
          <ul className={CN.list}>
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={CN.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Follow Us
          </Header>
          <ul className={CN.list}>
            {SOCIAL_LINKS.map(({ href, label, Icon, iconClass, aria }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CN.socialLink}
                  aria-label={aria}
                >
                  <Icon className={iconClass} aria-hidden /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <address className="not-italic">
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Contact
          </Header>
          <ul className={CN.listDense}>
            <li className={CN.contactItem}>
              <HiLocationMarker className={CN.contactIcon} aria-hidden />
              <span>{CONTACT.location}</span>
            </li>
            <li className={CN.contactItem}>
              <HiMail className={CN.contactIcon} aria-hidden />
              <a href={`mailto:${CONTACT.email}`} className={CN.link}>
                {CONTACT.email}
              </a>
            </li>
            <li className={CN.contactItem}>
              <HiPhone className={CN.contactIcon} aria-hidden />
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className={CN.link}
              >
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </address>
      </div>

      {/* Administration & Credits */}
      <div className="mx-auto max-w-7xl px-6 mt-6">
        <nav aria-labelledby="admin-credits">
          <Header as="h4" id="admin-credits" size="xs" className={CN.sectionTitle}>
            Administration & Credits
          </Header>
          <ul className={CN.listDense}>
            <li>
              <Link href="/login" className={CN.copyLink}>
                Admin Login
              </Link>
            </li>
            <li>
              Built by{" "}
              <a
                href="https://github.com/Bazrahimi"
                target="_blank"
                rel="noopener noreferrer"
                className={CN.copyLinkAlt}
              >
                Baz Rahimi
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Acknowledgement of Country */}
      <section aria-labelledby="ack-heading" className="mx-auto max-w-7xl px-6 mt-10" role="region">
        <div className="relative overflow-hidden rounded-lg border border-black/10 bg-yellow-400/40 p-4 sm:p-5">
          {/* Decorative bar in Aboriginal flag colors */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-1.5 bg-[linear-gradient(to_bottom,#000000,#CC0000,#FFFF00)]"
          />
          <h4 id="ack-heading" className="mb-2 text-sm font-semibold text-black">
            Acknowledgement of Country
          </h4>
          <p className="text-sm leading-6 text-gray-900">
            Hazara Cultural Association acknowledges the Bunurong people of the Kulin
            Nation as the Traditional Custodians of the lands and waters in and around
            Greater Dandenong. We pay our respects to Elders past and present, and extend
            that respect to all Aboriginal and Torres Strait Islander peoples. We honour
            their enduring connection to Country, culture, and community.
          </p>
        </div>
      </section>

      {/* Copyright */}
      <div className={CN.copy}>
        © {new Date().getFullYear()} Hazara Cultural Association. All rights reserved.{" "}
        <Link href="/login" className={CN.copyLink}>
          Admin Login
        </Link>{" "}
        | Built by{" "}
        <a
          href="https://github.com/Bazrahimi"
          target="_blank"
          rel="noopener noreferrer"
          className={CN.copyLinkAlt}
        >
          Baz Rahimi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
