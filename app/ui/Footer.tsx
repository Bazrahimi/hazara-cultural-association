import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTiktok, FaWpforms } from "react-icons/fa6";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { MdDeveloperMode } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { Header } from "./global/Header";
import { P } from "./global/paragraph";

// -------------------------------
// Reusable className tokens
// -------------------------------
const CN = {
  footer: "mt-16 bg-hca-yellow-main",
  wrap: "mx-auto max-w-7xl px-6 py-14",
  grid: "grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-4",
  // sectionTitle: "text-hca-blue-light",
  list: "space-y-2 text-sm",
  listDense: "space-y-3 text-sm",
  link: "underline underline-offset-4 decoration-black/30 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-sm",
  socialLink:
    "flex items-center gap-2 underline underline-offset-4 decoration-black/30 hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-sm",
  Item: "flex items-start gap-2",
  Icon: "mt-1 text-black",
  copy: "border-t border-black/20 px-6 py-4 text-center text-xs text-gray-800",
};

// -------------------------------
// Data
// -------------------------------
const ORG = {
  name: "Hazara Cultural Association",
  abn: "60 858 912 479",
};

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About HCA" },
  { href: "/blogs", label: "News & Blogs" },
  { href: "/shop", label: "Shop Merchandise" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "//terms-of-service", label: "Terms of Service" },
  { href: "/donate", label: "Support HCA" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/profile.php?id=61557919424367",
    label: "Facebook",
    iconClass: "text-blue-600",
    aria: "Open HCA Facebook (opens in new tab)",
    Icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/hazaraculturalassociation/",
    label: "Instagram",
    iconClass: "text-pink-600",
    aria: "Open HCA Instagram (opens in new tab)",
    Icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@yourusername", // <-- replace with real TikTok URL
    label: "TikTok",
    iconClass: "text-black", // TikTok icon is usually black/white, you could style with gradient if desired
    aria: "Open HCA TikTok (opens in new tab)",
    Icon: FaTiktok,
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
        {/* Organisation Info */}
        <div className="sm:col-span-2">
          <Header as="h4" size="sm">
            {ORG.name}
          </Header>
          <P size="md" className="text-gray-900">
            A non-profit organisation in Australia dedicated to preserving
            Hazara culture, supporting community initiatives, and advocating for
            justice and human rights.
          </P>
          <p className="mt-2 text-sm">
            <span className="font-medium">ABN:</span> {ORG.abn}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <Header as="h4" size="sm">
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

        {/* Contact Info */}
        <address className="not-italic" aria-labelledby="contact-heading">
          <Header as="h4" id="contact-heading" size="sm">
            Get in touch with HCA
          </Header>
          <ul className={CN.listDense}>
            <li className={CN.Item}>
              <FaWpforms className={CN.Icon} aria-hidden="true" />
              <Link href="/contact-us" className={CN.link}>
                Quick Enquiry
              </Link>
            </li>
            <li className={CN.Item}>
              <HiLocationMarker className={CN.Icon} aria-hidden="true" />
              <span>{CONTACT.location}</span>
            </li>
            <li className={CN.Item}>
              <HiMail className={CN.Icon} aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className={CN.link}>
                {CONTACT.email}
              </a>
            </li>
            <li className={CN.Item}>
              <HiPhone className={CN.Icon} aria-hidden="true" />
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className={CN.link}
              >
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </address>

        {/* Social Media */}
        <div>
          <Header as="h4" size="sm">
            Follow HCA on Social Media
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
                  <Icon className={iconClass} aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Administration & Credits */}

        <nav aria-labelledby="admin-credits">
          <Header as="h4" id="admin-credits" size="sm">
            Administration & Developer Credit
          </Header>
          <ul className={CN.list}>
            <li className={CN.Item}>
              <RiAdminLine className={CN.Icon} aria-hidden="true" />
              <Link href="/u/login" className={CN.link}>
                Admin Login
              </Link>
            </li>
            <li className={CN.Item}>
              <MdDeveloperMode className={CN.Icon} aria-hidden="true" />
              <a
                href="https://github.com/Bazrahimi"
                target="_blank"
                rel="noopener noreferrer"
                className={CN.link}
              >
                Baz Rahimi
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Acknowledgement of Country */}
      <section
        aria-labelledby="ack-heading"
        className="mx-auto mt-10 max-w-7xl px-6"
        role="region"
      >
        <div className="relative overflow-hidden rounded-lg border border-black/10 bg-hca-yellow-dark p-4 sm:p-5">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1.5 bg-[linear-gradient(to_bottom,#000000,#CC0000,#FFFF00)]"
          />
          <Header
            as="h4"
            id="ack-heading"
            className="mb-2 text-sm font-semibold text-hca-blue-main"
          >
            Acknowledgement of Country
          </Header>
          <p className="text-sm leading-6 text-gray-900">
            Hazara Cultural Association acknowledges the Bunurong people of the
            Kulin Nation as the Traditional Custodians of the lands and waters
            in and around Greater Dandenong. We pay our respects to Elders past
            and present, and extend that respect to all Aboriginal and Torres
            Strait Islander peoples. We honour their enduring connection to
            Country, culture, and community.
          </p>
        </div>
      </section>

      {/* Copyright */}
      <div className={CN.copy}>
        © {new Date().getFullYear()} {ORG.name}. All rights reserved.{" "}
        <Link href="/login" className={CN.link}>
          Admin Login
        </Link>{" "}
        | Built by{" "}
        <a
          href="https://github.com/Bazrahimi"
          target="_blank"
          rel="noopener noreferrer"
          className={CN.link}
        >
          Baz Rahimi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
