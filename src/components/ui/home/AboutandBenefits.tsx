"use client";
import React, { useRef } from "react";

const projectCards = [
  {
    title: "Palm Oil Solution",
    description: "An AI system using a camera to observe flower readiness for pollination in mother palms, while also detecting fruit ripeness and estimating fruit weight for optimized harvesting decisions.",
    image: "/pollination.png",
    link: "palm.drangue.ai/en",
    tags: ["Image Processing", "AI Agents", "Web Apps/Mobile Apps", "Big Data Analytics"],
  },
  {
    title: "Pocket",
    description: "Designed a mobile application for IntelliLabs aimed at making Islamic finance more accessible, understandable, and convenient for Muslims globally. ",
    image: "pocket.png",
    link: "",
    tags: ["Web Apps/Mobile Apps", "UI/UX", "Consultation"],
  },
  {
    title: "Pineapple Solution",
    description: "An AI system using a camera to detect pineapple ripeness, estimate fruit grade, and assess internal translucency levels that influence sweetness and market quality.",
    image: "/pineapple.png",
    link: "https://pineapple.drangue.ai/en",
    tags: ["Image Processing", "AI Agents", "Web Apps/Mobile Apps", "Big Data Analytics", "Consultation"],
  },
  {
    title: "Disaster Management System",
    description: "Developed a landslide disaster management system for a UNITEN researcher, commissioned by an insurance company, integrating real-time data analysis for improved risk management.",
    image: "/disaster.png",
    link: "",
    tags: ["Image Processing", "Web Apps/Mobile Apps", "AI Agents", "Consultation"],
  }
];

export default function About() {
  const scrollRef = useRef(null);

  // Group cards in pairs for desktop view
  const cardPairs = [];
  for (let i = 0; i < projectCards.length; i += 2) {
    cardPairs.push(projectCards.slice(i, i + 2));
  }

  return (
    <div className="md:mx-96 py-12">
      {/* Mobile View (One card at a time) */}
      <div
        className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 px-12 py-6 scroll-smooth"
      >
        {projectCards.map((card, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[85vw] flex-none bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden transition group hover:shadow-xl"
          >
            <div className="w-full h-56 overflow-hidden bg-gray-100 dark:bg-neutral-800">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="relative inline-block font-semibold text-xl text-black dark:text-white">
                  <span className="relative z-10">{card.title}</span>
                  <span className="absolute bottom-0.5 left-0 w-full h-1 bg-violet-600 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </h3>
                <p className="mt-3 text-gray-600 dark:text-neutral-400 text-sm">
                  {card.description}{" "}
                  {card.link && (
                    <a 
                      href={card.link} 
                      className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 font-medium inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  )}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="py-1.5 px-3 bg-white dark:bg-neutral-800 text-gray-600 dark:text-neutral-400 border border-gray-200 dark:border-neutral-700 text-xs rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Two cards per container) */}
      <div
        ref={scrollRef}
        className="hidden md:flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 py-4 scroll-smooth"
      >
        {cardPairs.map((pair, pairIndex) => (
          <div
            key={pairIndex}
            className="snap-center shrink-0 w-[85vw] max-w-5xl flex gap-6 flex-none"
          >
            {pair.map((card, index) => (
              <div
                key={index}
                className="w-1/2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl overflow-hidden transition group hover:shadow-xl"
              >
                <div className="w-full h-80 overflow-hidden bg-gray-100 dark:bg-neutral-800">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="relative inline-block font-semibold text-xl text-black dark:text-white">
                      <span className="relative z-10">{card.title}</span>
                      <span className="absolute bottom-0.5 left-0 w-full h-1 bg-violet-600 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
                    </h3>
                    <p className="mt-3 text-gray-600 dark:text-neutral-400 text-sm">
                      {card.description}{" "}
                      {card.link && (
                        <a 
                          href={card.link} 
                          className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 font-medium inline-flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      )}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <div key={tag} className="bg-gradient-to-br from-blue-600 to-violet-600 via-transparent p-[0.07rem] rounded-xl">
                        <span
                          className="py-1.5 px-3 bg-white dark:bg-neutral-800 text-blue-400 text-xs rounded-xl"
                        >
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
