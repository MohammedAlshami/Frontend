import React from "react";
import { motion } from "framer-motion";
import { ArrowBigDown, ArrowDown } from "lucide-react";

const CTA2 = () => {
  return (
    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
      <a
        href="javascript:void(0)"
        className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
      >
        Browse courses
      </a>
      <a
        href="javascript:void(0)"
        className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
      >
        Get access
      </a>
    </div>
  );
};

const CTA3 = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 justify-center items-center  sm:flex"
    >
      <a
        className="bg-gradient-to-b from-[#4F46E5] to-teal-500 animate-bounce rounded-full p-3 text-white"
        href="#about"
      >
        <ArrowDown />
      </a>
    </form>
  );
};

interface Hero2Props {
  mainTitle: string;
  mainTitleColored: string;
  subTitle: string;
}

const Hero2: React.FC<Hero2Props> = ({
  mainTitle,
  mainTitleColored,
  subTitle,
}) => {
  return (
    <section className="relative overflow-visible bg-white ">
      {/* SVG Background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 500 148"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 0C62.07 99.4 344.8 16.12 500 148H0V0Z"
            fill="currentColor"
            className="stroke-none fill-current text-teal-500"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 md:px-8 overflow-visible pt-12">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          {/* Animated Title */}
          <motion.h2
            className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            {mainTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-teal-500">
              {mainTitleColored}
            </span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          >
            {subTitle}
          </motion.p>
        </div>

        {/* Animated Image */}
        <motion.div
          id="main-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mt-14 flex flex-col gap-8"
        >
          <CTA3 />

          <div className="mockup-browser bg-white border-base-300/20 border shadow-lg rounded-lg">
            <div className="mockup-browser-toolbar"></div>
            <div className="border-base-300 flex justify-center border-t p-2">
              <img src="/hero.png" className="w-full h-full rounded" alt="" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;
