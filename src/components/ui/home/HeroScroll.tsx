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
            <h1 className="text-4xl font-semibold text-black dark:text-white mb-12">
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none">
                Predict. Prepare. Protect.
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/intro-2.gif`}
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