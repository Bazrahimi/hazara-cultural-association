// app/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { HiCalendar, HiInformationCircle } from "react-icons/hi";
import { MdOutlineEmail, MdVolunteerActivism } from "react-icons/md";

// Reusable styles
const navLinkBase =
  "group flex flex-col items-center gap-1 hover:text-blue-700 flex-1";
const navIcon = "text-2xl sm:text-xl opacity-80 group-hover:opacity-100"; // bigger on mobile
const donateBtn =
  "inline-flex items-center rounded-md border border-blue-600 px-3 py-1.5 font-medium text-blue-700 hover:bg-blue-50";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-gray-200 bg-gray-100/95 px-4 sm:px-6 text-slate-800 backdrop-blur supports-[backdrop-filter]:bg-gray-100/80">
      {/* Left: Brand */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight hover:opacity-90"
          aria-label="Hazara Cultural Association home"
        >
          <Image
            src="/logo-hca-mark.png"
            alt="HCA logo"
            width={28}
            height={28}
            priority
          />
          <span className="hidden sm:inline">HCA</span>
        </Link>
      </div>

      {/* Center: Primary links (spread evenly) */}
      <div className="flex flex-1 justify-evenly max-w-md">
        <Link href="/about-us" className={navLinkBase} aria-label="About Us">
          <HiInformationCircle className={navIcon} />
          <span className="hidden sm:inline">About Us</span>
        </Link>

        <Link href="/blogs" className={navLinkBase} aria-label="Blogs">
          <HiCalendar className={navIcon} />
          <span className="hidden sm:inline">Blogs</span>
        </Link>

        <Link href="/shop" className={navLinkBase} aria-label="Programs">
          <CiShoppingCart className={navIcon} />
          <span className="hidden sm:inline">Shop</span>
        </Link>

        <Link href="/contact-us" className={navLinkBase} aria-label="Contact">
          <MdOutlineEmail className={navIcon} />
          <span className="hidden sm:inline">Contact</span>
        </Link>
      </div>

      {/* Right: Donate */}
      <div className="flex items-center gap-4">
        <Link href="/donate" className={donateBtn} aria-label="Donate">
          <span className="hidden sm:inline">Donate</span>
          <MdVolunteerActivism className="sm:hidden text-xl" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
