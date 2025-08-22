import Link from "next/link";
import {
  HiAcademicCap,
  HiCalendar,
  HiHome,
  HiInformationCircle,
} from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-gray-200 bg-gray-100/95 px-4 sm:px-6 text-sm text-slate-800 backdrop-blur supports-[backdrop-filter]:bg-gray-100/80">
      {/* Left: Brand + Primary nav */}
      <div className="flex items-center gap-6">
        {/* Brand (clickable) */}
        <Link
          href="/"
          className="font-semibold tracking-tight hover:opacity-90"
          aria-label="Hazara Cultural Association home"
        >
          HCA
        </Link>

        {/* Primary links */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 hover:text-blue-700"
          >
            <HiHome className="text-lg opacity-80 group-hover:opacity-100" />
            <span>Home</span>
          </Link>

          <Link
            href="/about-us"
            className="group inline-flex items-center gap-2 hover:text-blue-700"
          >
            <HiInformationCircle className="text-lg opacity-80 group-hover:opacity-100" />
            <span>About Us</span>
          </Link>

          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 hover:text-blue-700"
          >
            <HiAcademicCap className="text-lg opacity-80 group-hover:opacity-100" />
            <span>Programs</span>
          </Link>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 hover:text-blue-700"
          >
            <HiCalendar className="text-lg opacity-80 group-hover:opacity-100" />
            <span>Events</span>
          </Link>

          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 hover:text-blue-700"
          >
            <MdOutlineEmail className="text-lg opacity-80 group-hover:opacity-100" />
            <span>Contact</span>
          </Link>
        </div>
      </div>

      {/* Right: Quick contact (optional) */}
      <div className="flex items-center gap-4">
        <Link
          href="/contact-us"
          className="inline-flex items-center rounded-md border border-blue-600 px-3 py-1.5 font-medium text-blue-700 hover:bg-blue-50"
          aria-label="Quick enquiry"
        >
          Enquire
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
