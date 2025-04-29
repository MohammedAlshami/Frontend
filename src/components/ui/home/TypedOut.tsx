"use client";
import { TypewriterEffectSmooth } from "./typewriter-effect";
export function TypedOut() {
  const words = [
    {
      text: "Protect",
    },
    {
      text: "Your",
    },
    {
      text: "Community",
    },
    {
      text: "with",
    },
    {
      text: "Drangue.",
      className: "text-violet-600 dark:text-main",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[20rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
   
    </div>
  );
}