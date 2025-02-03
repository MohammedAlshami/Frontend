"use client";

import { HeroScroll } from "@/components/ui/home/HeroScroll";
import { Category } from "@/components/ui/home/Category";
import { TypedOut } from "@/components/ui/home/TypedOut";
import About from "@/components/ui/home/AboutandBenefits";
import Contact from "@/components/ui/home/Contact";
import Navbar from "./Navbar";
export default function MainPage() {
  return (
    <div lang="en" className="dark  bg-neutral-950" suppressHydrationWarning>
      <head>
        <title>DRANGUE</title>
      </head>
      <body className="h-screen">
        <div className="flex min-h-full flex-col">
          <Navbar />
          <div className="flex-1">
            <div className="w-full dark bg-neutral-950">
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
          </div>
        </div>
      </body>
    </div>
  );
}
