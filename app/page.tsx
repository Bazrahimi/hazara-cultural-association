import { Suspense } from "react";
import Acknowledgements from "./about-us/ui/Acknowledgements";
import PartnersAndSupporters from "./partners/page";
import Hero from "./ui/Hero";
import FeaturedBlogPosts from "./ui/homepage/blog/FeaturedBlogPosts";
import Memorial133Spotlight from "./ui/homepage/blog/Memorial133Spotlight";

export default function HomePage() {
  return (
    <div className="flex flex-col">
            <section className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-white border-b border-gray-200">
        <Hero />
      </section>

      <section className="w-full bg-gray-50 border-b border-gray-200 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Acknowledgements />
        </div>
      </section>

      <section className="w-full bg-white border-b border-gray-200 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense fallback={null}>
            <Memorial133Spotlight />
          </Suspense>
        </div>
      </section>

      <section className="w-full bg-gray-50 border-b border-gray-200 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense fallback={null}>
            <FeaturedBlogPosts />
          </Suspense>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense fallback={null}>
            <PartnersAndSupporters />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
