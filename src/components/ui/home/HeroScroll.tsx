"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";

export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <div className="mb-24 max-w-2xl text-center mx-auto">
              <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
                Innovations Through{" "}
                <span className="text-violet-600">Intelligence</span>
              </h1>
              <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
                Empowering Innovation as Your Trusted AI Solution Provider
              </p>
            </div>
          </>
        }
      >
        <Image
          src={`/pollination.png`}
          alt="hero"
          height={720}
          width={1200}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
