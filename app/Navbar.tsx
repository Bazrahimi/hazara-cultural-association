// app/Navbar.tsx
import Image from "next/image";
import Link from "next/link";
// import { CiShoppingCart } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { MdOutlineEmail, MdVolunteerActivism } from "react-icons/md";
import CartIcon from "./(disabled)/_shop/ui/cart/CartBadge";
import BlogMenu from "./blog/ui/BlogMenu";
// import AccountMenu from "./ui/global/AccountMenu";
import { DonateRoutes, PublicRoutes } from "./_lib/routes";
import AccountMenu from "./account/ui/AccountMenu";

// Reusable styles
const navLinkBase =
  "group flex flex-col items-center gap-1 text-white hover:text-hca-yellow-main flex-1";
const navIcon =
  "text-2xl sm:text-xl opacity-80 group-hover:opacity-100 md:hidden"; // bigger on mobile

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-[100] flex h-16 w-full items-center justify-between border-b border-gray-50 bg-blue-5 px-4 sm:px-6 text-slate-800 backdrop-blur supports-[backdrop-filter]:bg-hca-blue-main">
      {/* Left: Hca */}
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

          <span className="hidden sm:inline hover:text-gray-50"></span>
        </Link>
      </div>

      {/* Center: Primary links (spread evenly) */}
      <div className="flex flex-1 justify-evenly max-w-md">
        <Link
          href={PublicRoutes.about()}
          className={navLinkBase}
          aria-label="About Us"
        >
          <HiInformationCircle className={navIcon} />
          <span className="hidden sm:inline">About Us</span>
        </Link>

        <nav>
          <BlogMenu navLinkBase={navLinkBase} navIcon={navIcon} />
        </nav>

        {/* <Link href="/shop" className={navLinkBase} aria-label="Programs">
          <CiShoppingCart className={navIcon} />
          <span className="hidden sm:inline">Shop</span>
        </Link> */}

        <Link href="/contact-us" className={navLinkBase} aria-label="Contact">
          <MdOutlineEmail className={navIcon} />
          <span className="hidden sm:inline">Contact</span>
        </Link>
        <Link
          href={DonateRoutes.root()}
          className={navLinkBase}
          aria-label="Donate"
        >
          <MdVolunteerActivism className={navIcon} />
          <span className="hidden sm:inline">Donate</span>
        </Link>

        <CartIcon />
      </div>

      {/* Right: Donate */}
      <div className="flex items-center gap-2">
        <AccountMenu navLinkBase={navLinkBase} navIcon={navIcon} />
      </div>
    </nav>
  );
};

export default NavBar;
