import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { Header } from "./global/Header";
import { P } from "./global/paragraph";

// -------------------------------
// Reusable className tokens
// -------------------------------
const CN = {
  footer: "mt-16 bg-yellow-500",
  wrap: "mx-auto max-w-7xl px-6 py-14",
  grid: "grid grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4",
  sectionTitle: "text-gray-950", // Header already styles size/color
  list: "space-y-2 text-sm",
  listDense: "space-y-3 text-sm",
  link: "hover:text-yellow-300",
  socialLink: "flex items-center gap-2 hover:text-yellow-300",
  contactItem: "flex items-start gap-2",
  contactIcon: "mt-1 text-yellow-400",
  copy: "border-t border-gray-700 px-6 py-4 text-center text-xs text-gray-500",
  copyLink: "text-yellow-400 hover:text-yellow-500",
  copyLinkAlt: "text-yellow-400 hover:text-yellow-300",
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
    Icon: FaFacebook,
    iconClass: "text-blue-500",
    aria: "Visit HCA Facebook page",
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    Icon: FaInstagram,
    iconClass: "text-pink-500",
    aria: "Visit HCA Instagram page",
  },
];

const CONTACT = {
  location: "Melbourne, Victoria, Australia",
  email: "info@hazara.org.au", // unified text & href
  phone: "+61 000 000 000",
};

const Footer = () => {
  return (
    <footer className={CN.footer}>
      <div className={`${CN.wrap} ${CN.grid}`}>
        {/* Organisation Info */}
        <div>
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Hazara Cultural Association
          </Header>
          <P size="md" className="text-gray-700">
            A non-profit organisation in Australia dedicated to preserving
            Hazara culture, supporting community initiatives, and advocating for
            justice and human rights.
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
                  <Icon className={iconClass} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <Header as="h4" size="xs" className={CN.sectionTitle}>
            Contact
          </Header>
          <ul className={CN.listDense}>
            <li className={CN.contactItem}>
              <HiLocationMarker className={CN.contactIcon} />
              <span>{CONTACT.location}</span>
            </li>
            <li className={CN.contactItem}>
              <HiMail className={CN.contactIcon} />
              <a href={`mailto:${CONTACT.email}`} className={CN.link}>
                {CONTACT.email}
              </a>
            </li>
            <li className={CN.contactItem}>
              <HiPhone className={CN.contactIcon} />
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className={CN.link}
              >
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={CN.copy}>
        © {new Date().getFullYear()} Hazara Cultural Association. All rights
        reserved.{" "}
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
