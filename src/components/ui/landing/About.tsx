import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Reusable browser frame component
const BrowserFrame = ({ children, className }) => (
  <div className={`rounded-lg overflow-hidden shadow-xl ${className}`}>
    <div className="bg-gray-200 p-2 flex items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

    </div>
    {children}
  </div>
);

// Reusable iPhone frame component
const IPhoneFrame = ({ children, className }) => (
  <div className={`relative mx-auto ${className}`}>
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
        {children}
      </div>
    </div>
  </div>
);

// Reusable feature list component to avoid duplication
const FeatureList = ({ features, isInView, isWebFeature = true }) => (
  <ul className="space-y-6">
    {features.map((item, idx) => (
      <motion.li
        key={idx}
        className="flex gap-x-4"
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 * idx + 0.5, duration: 0.5 }}
      >
        <div className="flex-none w-12 h-12 bg-green-50 text-green-700 rounded-lg flex items-center justify-center">
          {item.icon}
        </div>
        <div>
          <h4 className="text-lg text-white font-semibold">
            {isWebFeature ? item.title : item.title2}
          </h4>
          <p className="mt-2 text-white opacity-90">
            {isWebFeature ? item.desc : item.desc2}
          </p>
        </div>
      </motion.li>
    ))}
  </ul>
);

// Section for Web Features
const WebFeature = ({ features }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex py-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" h-fit p-6 lg:p-8 lg:w-1/2"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1  bg-opacity-50 rounded-full text-sm font-medium text-white"
          >
            Desktop Dashboard
          </motion.div>
          <motion.h2
            className="text-white text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Oversee Farm Operations with AI Monitoring
          </motion.h2>
          <motion.p
            className="text-teal-50 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our cloud-based SaaS platform gives you comprehensive insights into
            all aspects of your farm operations with AI-powered analytics.
          </motion.p>
        </div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <FeatureList
            features={features}
            isInView={isInView}
            isWebFeature={true}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="relative mt-12 lg:mt-0 lg:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <BrowserFrame className="w-full max-w-xl">
          <img
            src="/about3.png"
            alt="AI tree mapping dashboard interface"
            className="w-full object-cover"
          />
        </BrowserFrame>
      </motion.div>
    </div>
  );
};

// First Mobile App Feature Section
const MobileFeature1 = ({ features }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex py-16"
    >
      <motion.div
        className="relative mt-12 lg:mt-0 lg:w-1/2 flex justify-center items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <IPhoneFrame className="transform rotate-3">
          <img
            src="/appFeature1.jpg"
            alt="Mobile app farm monitoring interface"
            className="w-full h-full object-cover"
          />
        </IPhoneFrame>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" h-fit p-6 lg:p-8 lg:w-1/2"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1  bg-opacity-50 rounded-full text-sm font-medium text-white"
          >
            Mobile Application
          </motion.div>
          <motion.h2
            className="text-white text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Farm Management at Your Fingertips
          </motion.h2>
          <motion.p
            className="text-teal-50 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Track tasks, monitor farm performance, and access critical
            information from anywhere with our intuitive mobile app.
          </motion.p>
        </div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <FeatureList
            features={features}
            isInView={isInView}
            isWebFeature={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Second Mobile App Feature Section
const MobileFeature2 = ({ features }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex py-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-xl  h-fit p-6 lg:p-8 lg:w-1/2"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1  bg-opacity-50 rounded-full text-sm font-medium text-white"
          >
            AI Analysis Tools
          </motion.div>
          <motion.h2
            className="text-white text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Advanced Crop Analysis with AI
          </motion.h2>
          <motion.p
            className="text-teal-50 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Use our AI-powered tools to detect diseases, assess ripeness, and
            monitor pollination status in real-time.
          </motion.p>
        </div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <ul className="space-y-6">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Disease Detection",
                desc: "Identify plant diseases early with our visual AI recognition system",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                ),
                title: "Ripeness Tracking",
                desc: "Monitor crop maturity with precision to optimize harvest timing",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
                title: "Pollination Monitoring",
                desc: "Track pollination patterns and optimize crop yield potential",
              },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                className="flex gap-x-4"
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * idx + 0.5, duration: 0.5 }}
              >
                <div className="flex-none w-12 h-12 bg-green-50 text-green-700 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-white font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-white opacity-90">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <motion.div
        className="relative mt-12 lg:mt-0 lg:w-1/2 flex justify-center items-center gap-4"
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -5 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <IPhoneFrame>
            <img
              src="/detectionOptions.png"
              alt="AI disease detection interface"
              className="w-full h-full object-cover"
            />
          </IPhoneFrame>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 5 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden md:block"
        >
          <IPhoneFrame>
            <img
              src="/appFeature2.jpg"
              alt="Crop analysis interface"
              className="w-full h-full object-cover"
            />
          </IPhoneFrame>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main About component
const About = () => {
  // Base features data
  const webFeatures = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      title: "AI Tree Mapping",
      desc: "Advanced tree detection and mapping to optimize orchard management and tracking",
      title2: "Mobile Farm Management",
      desc2:
        "Access farm data, assign tasks and monitor progress from anywhere",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
      ),
      title: "Cloud-Based Monitoring",
      desc: "Real-time data synchronization across all devices with secure cloud storage",
      title2: "Field Data Collection",
      desc2:
        "Record observations and collect data directly from the field with easy form submission",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          />
        </svg>
      ),
      title: "Data Analytics Dashboard",
      desc: "Comprehensive analytics to track farm performance, crop health, and yield predictions",
      title2: "Task Management",
      desc2:
        "Organize and prioritize farm tasks with progress tracking and notifications",
    },
  ];

  return (
    <section className="py-14  bg-teal-500  pt-24 sm:pt-32 space-y-24 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          AI-Powered Agriculture Monitoring
        </h1>
        <p className="mt-4 text-xl text-teal-100 max-w-2xl mx-auto">
          Transforming farm management with intelligent technology for better
          yields and sustainable farming
        </p>
      </motion.div>

      <WebFeature features={webFeatures} />
      <MobileFeature1 features={webFeatures} />
      <MobileFeature2 />
    </section>
  );
};

export default About;
