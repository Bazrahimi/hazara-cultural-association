// app/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { HiCalendar, HiInformationCircle } from "react-icons/hi";
import { MdOutlineEmail, MdVolunteerActivism } from "react-icons/md";

// Reusable styles
const navLinkBase =
  "group flex flex-col items-center gap-1 hover:text-gray-50 flex-1";
const navIcon = "text-2xl sm:text-xl opacity-80 group-hover:opacity-100"; // bigger on mobile
const donateBtn =
  "inline-flex items-center rounded-md border border-gray-100 px-3 py-1.5 font-medium text-gray-100 hover:bg-gray-50 hover:text-blue-500";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-gray-50 bg-blue-5 px-4 sm:px-6 text-slate-800 backdrop-blur supports-[backdrop-filter]:bg-blue-600/80">
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
            className="transition duration-200 hover:opacity-80"
            priority
          />
          <span className="hidden sm:inline hover:text-gray-50">HCA</span>
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
