import { Suspense } from "react";
import Hero from "./_ui/Hero";
import FeaturedBlogPosts from "./_ui/homepage/blog/FeaturedBlogPosts";
import Memorial133Spotlight from "./_ui/homepage/blog/Memorial133Spotlight";
import TricolorRule from "./_ui/TricolorRule";
import Acknowledgements from "./about-us/ui/Acknowledgements";
import PartnersAndSupporters from "./partners/page";

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
