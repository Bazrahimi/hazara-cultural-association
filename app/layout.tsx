// app/layout.tsx
import type { Metadata } from "next";
import { CartProvider } from "./(disabled)/_shop/ui/cart/CartContext";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// import { CartProvider } from "./(disabled)/_shop/ui/cart/CartContext";
import { ORG_PROFILE } from "./_lib/org/profile";
import Footer from "./_ui/Footer";
import { NotificationCenter } from "./blog/ui/NotificationCenter";
import NavBar from "./Navbar";
import { getSession } from "./_lib/session/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TEMP: block search engines while in dev/test
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
      noarchive: true,
    },
  },

  title: ORG_PROFILE.orgName,
  description:
    ORG_PROFILE.orgName +
    "is an Australian non-profit organisation advocating for the Hazara people and preserving culture.",
  manifest: "/images/favicon_io/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/images/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/images/favicon_io/favicon.ico", rel: "icon" },
    ],
    apple: [
      {
        url: "/images/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider userId={Number(session?.userId)}>
        <NavBar />

        <main
          className="
                      mx-auto
                      w-full
                      max-w-7xl
                      px-1
                      md:px-3
                      lg:px-5
          
          "
        >
          {children}
        </main>

        <NotificationCenter />
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}
