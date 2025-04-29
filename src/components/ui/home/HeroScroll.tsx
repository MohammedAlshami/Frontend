"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";

export function HeroScroll() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-24 md:mt-36 md:mb-6">
        <div className="max-w-2xl text-center mx-auto">
          <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
            Innovations Through <span className="text-violet-600">Intelligence</span>
          </h1>
          <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">Empowering Innovation as Your Trusted AI Solution Provider</p>
        </div>

        <div className="mt-10 relative max-w-5xl mx-auto">
          <div className="w-full object-cover h-96 sm:h-120 bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

          <div className="absolute bottom-12 -start-20 -z-1 size-48 bg-linear-to-b from-orange-500 to-white p-px rounded-lg dark:to-neutral-900">
            <div className="bg-violet-600 size-48 rounded-lg"></div>
          </div>

          <div className="absolute -top-12 -end-20 -z-1 size-48 bg-linear-to-t from-blue-600 to-cyan-400 p-px rounded-full">
            <div className="bg-blue-600 size-48 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

  );
}