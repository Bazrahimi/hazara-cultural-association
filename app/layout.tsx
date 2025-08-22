
import type { Metadata } from "next";


import { Geist, Geist_Mono } from "next/font/google";


import "./globals.css";

// Import layout components for consistent navigation and footer.
import Footer from "./ui/Footer";
import NavBar from "./Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font in the same way.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define default metadata for the application (title, description, SEO).
export const metadata: Metadata = {
  title: "Hazara Cultural Association",
  description:
    "Hazara Cultural Association (HCA) is a non-profit organisation in Australia dedicated to preserving Hazara culture, supporting the community, and advocating for justice for the Hazara people.",
};

// Root layout component wraps all pages.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Ensures children can be any valid React content
}>) {
  return (
    // Root <html> element with language set to English.
    <html lang="en">
      <body
        // Apply both custom font variables and enable antialiasing for smoother text.
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global navigation bar at the top of every page */}
        <NavBar />

        {/* Main content wrapper with responsive max width */}
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Global footer at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}
