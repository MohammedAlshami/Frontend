"use client";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const About = () => {
  // Fade-in animation variants
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Typing effect animation for benefits
  const typingVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5, // Delay before typing starts
        type: "spring",
      },
    },
  };

  return (
    <motion.section
      className=""
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 1 }} // Duration for the fade-in effect
    >
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <motion.h2
          className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.6 }} // Customize duration for each element
        >
          Introduction
        </motion.h2>
        <motion.p
          className="mt-1 text-gray-600 dark:text-neutral-400"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.6, delay: 0.2 }} // Delay to stagger the appearance
        >
          We are dedicated to solving problems with our technology
        </motion.p>

        <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
          {/* Container with gradient border and stone-950 fill */}
          <motion.div
            className="relative w-full md:flex md:items-center rounded-2xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-2xl bg-stone-950 p-8"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 1, delay: 0.4 }} // Delay for the container's fade-in
          >
            <div className="mt-2 md:mx-6">
              <div className="mx-auto px-4 py-12">
                <img
                  src="/drangue_light_logo.svg"
                  alt="Drangue Logo"
                  className="w-full flex w-7/12 mx-auto mb-12"
                />
                <motion.p
                  className="mt-4 text-lg leading-relaxed text-white md:text-xl"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.6, delay: 0.6 }} // Delay the text for better visual flow
                >
                  Drangue is a platform designed to enhance community safety and decision-making. We provide real-time updates and insights through advanced GIS technology, empowering you to take informed actions for the well-being of your community.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </main>

        <motion.div
          className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 1, delay: 0.6 }} // Adding a delay to the grid section
        >
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 1, delay: 0.8 }} // Stagger the grid items' appearance
          >
            {/* Benefits with typing effect */}
            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                <svg
                  className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="10" height="14" x="3" y="8" rx="2" />
                  <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
                  <path d="M8 18h.01" />
                </svg>
              </div>
              <motion.div
                className="mt-5"
                variants={typingVariants} // Apply typing effect
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Accurate Decision-Making
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  AI-powered GIS delivers precise, real-time data
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                <svg
                  className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </div>
              <motion.div
                className="mt-5"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Easy Access
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Compatible with existing communicating applications
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                <svg
                  className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <motion.div
                className="mt-5"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Increase Efficiency
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  Cuts development costs and improves response times
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-neutral-900">
                <svg
                  className="shrink-0 size-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <motion.div
                className="mt-5"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Better Collaboration
                </h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                  WhatsApp streamlines communication and data
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;