import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        {/* Organisation Info */}
        <div>
          <h3 className="mb-3 text-lg font-bold text-yellow-400">
            Hazara Cultural Association
          </h3>
          <p className="text-sm leading-relaxed">
            A non-profit organisation in Australia dedicated to preserving
            Hazara culture, supporting community initiatives, and advocating
            for justice and human rights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-400">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-yellow-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-yellow-300">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-yellow-300">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-yellow-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-400">
            Follow Us
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-300"
                aria-label="Visit HCA Facebook page"
              >
                <FaFacebook className="text-blue-500" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-300"
                aria-label="Visit HCA Instagram page"
              >
                <FaInstagram className="text-pink-500" /> Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-3 text-base font-semibold text-yellow-400">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <HiLocationMarker className="mt-1 text-yellow-400" />
              <span>Melbourne, Victoria, Australia</span>
            </li>
            <li className="flex items-start gap-2">
              <HiMail className="mt-1 text-yellow-400" />
              <a
                href="mailto:info@hca.org.au"
                className="hover:text-yellow-300"
              >
                info@hazara.org.au
              </a>
            </li>
            <li className="flex items-start gap-2">
              <HiPhone className="mt-1 text-yellow-400" />
              <a href="tel:+61000000000" className="hover:text-yellow-300">
                +61 000 000 000
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 px-6 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Hazara Cultural Association. All rights
        reserved. <Link href="/login" className="text-yellow-400 hover:text-yellow-500">Admin Login</Link> | Built by{" "}
        <a
          href="https://github.com/Bazrahimi"
          target="_blank"
          className="text-yellow-400 hover:text-yellow-300"
        >
          Baz Rahimi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
