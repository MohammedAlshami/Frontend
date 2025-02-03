"use client";

import { HeroScroll } from "@/components/ui/home/HeroScroll";
import { Category } from "@/components/ui/home/Category";
import { TypedOut } from "@/components/ui/home/TypedOut";
import About from "@/components/ui/home/AboutandBenefits";
import Contact from "@/components/ui/home/Contact";
export default function RootPage() {
  return (
    <div className="w-full">
      <div className="w-full absolute inset-0 h-screen"></div>

      <div className="z-60">
        <HeroScroll />
      </div>

      <div className="z-60">
        <About />
      </div>

      <div id="services_s" className="mx-4 sm:mx-0">
        <Category />
      </div>

      <div className="z-60">
        <Contact />
      </div>

      <div className="z-60">
        <TypedOut />
      </div>

    </div>
  );
}