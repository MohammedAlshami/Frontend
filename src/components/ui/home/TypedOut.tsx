"use client";
import { TypewriterEffectSmooth } from "./typewriter-effect";
export function TypedOut() {
  const words = [
    {
      text: "Transform",
    },
    {
      text: "Your",
    },
    {
      text: "Business",
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
        Where technology meets innovation
      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
