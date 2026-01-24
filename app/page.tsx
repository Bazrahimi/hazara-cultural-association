import { Suspense } from "react";
import Acknowledgements from "./about-us/ui/Acknowledgements";
import PartnersAndSupporters from "./partners/page";
import TricolorRule from "./ui/global/TricolorRule";
import Hero from "./ui/Hero";
import FeaturedBlogPosts from "./ui/homepage/blog/FeaturedBlogPosts";
import Memorial133Spotlight from "./ui/homepage/blog/Memorial133Spotlight";

export default function HomePage() {
  return (
    <>
      <section className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
        <Hero />
      </section>
      <div className="flex flex-col">
        <section className=" bg-gray-50 ">
          <Acknowledgements />
          <TricolorRule />
        </section>

        <section className="pt-10">
          <FeaturedBlogPosts limit={8} />
        </section>

        <section className=" pt-10">
          <Suspense fallback={null}>
            <Memorial133Spotlight />
          </Suspense>
        </section>

        <section className="pt-10">
          <Suspense fallback={null}>
            <PartnersAndSupporters />
          </Suspense>
        </section>
      </div>
    </>
  );
}
