"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

export function Category() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState(1);

  // Handle tab change
  const handleTabChange = (tabId:number) => {
    setActiveTab(tabId);
  };

  // Fade-in animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }} // Customize duration
    >
      <div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          Our Products
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Solutions we have tailored to suit the area of interest
        </p>
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10 lg:mb-14"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 1, delay: 0.2 }} // Delay to stagger the animation
      >
        <motion.a
          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
          href="https://palm.drangue.ai/"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-w-16 aspect-h-9 bg-lime-100 rounded-t-xl">
            <img
              className="w-1/2 mx-auto object-cover rounded-t-xl"
              src="palmoil_img.png"
              alt="Palm Oil Detection"
            />
          </div>
          <div className="p-4 md:p-5 flex items-center justify-between">
            <div>
              <p className="mt-2 text-xs uppercase text-green-600 dark:text-green-400">
                Agriculture
              </p>
              <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
                Palm Oil Pollination Solution
              </h3>
            </div>
            <svg
              className="ml-4 text-gray-500 group-hover:text-blue-600 dark:text-neutral-400 dark:group-hover:text-white transition-all"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 19l5-5-5-5" />
            </svg>
          </div>
        </motion.a>

        <motion.a
          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
          href="https://pineapple.drangue.ai/"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.6, delay: 0.2 }} // Staggering the animation for the second item
        >
          <div className="aspect-w-16 aspect-h-9 bg-amber-100 rounded-t-xl">
            <img
              className="w-1/2 mx-auto object-cover rounded-t-xl"
              src="pineapple_img.png"
              alt="Pineapple Detection"
            />
          </div>
          <div className="p-4 md:p-5 flex items-center justify-between">
            <div>
              <p className="mt-2 text-xs uppercase text-green-600 dark:text-green-400">
                Agriculture
              </p>
              <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
                Pineapple Solution
              </h3>
            </div>
            <svg
              className="ml-4 text-gray-500 group-hover:text-blue-600 dark:text-neutral-400 dark:group-hover:text-white transition-all"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 19l5-5-5-5" />
            </svg>
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}