import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Feature1 = ({ features }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger only once when the component is in view

  return (
    <div
      ref={ref}
      className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-16 justify-between md:px-8 lg:flex  p-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-teal-500 h-fit p-4"
      >
        <div className="max-w-xl space-y-3">
          <motion.h3
            className="text-violet-700 font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Desktop Features
          </motion.h3>
          <motion.p
            className="text-white text-3xl font-semibold sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Oversee crop growth with our AI
          </motion.p>
          <motion.p
            className="text-neutral-200"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Collect insights from workers to make informed decisions
          </motion.p>
        </div>
        <motion.div
          className="mt-12 max-w-lg lg:max-w-none "
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <ul className="space-y-8 ">
            {features.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex gap-x-4"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * idx }}
              >
                <div className="flex-none w-12 h-12 bg-green-50 text-violet-700 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-white font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-white">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <motion.div
        className="relative mt-12 lg:mt-0 sw-full m:w-7/12"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/about3.png"
          alt="AI technology for detecting trees and ripeness"
          className="w-full h-full shadow-lg rounded-lg border object-cover"
        />
      </motion.div>
    </div>
  );
};
const Feature2 = ({ features }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-screen-xl flex  flex-col-reverse   mx-auto px-4 text-gray-600 gap-12 justify-between md:px-8 lg:flex lg:flex-row"
    >
      <div className="mt-12 lg:mt-0 sw-full m:w-7/12 flex gap-12">
        {[0, 1].map((i) => (
          <motion.figure
            key={i}
            className="mx-auto max-w-full w-64 sm:w-60 lg:w-72 h-auto"
          >
            <div className="p-2  shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)]  rounded-3xl">
              <img
                className=" lg:max-w-full rounded-[1.25rem] h-[400px] lg:h-[580px] object-cover"
                src={
                  i === 0
                    ? "mobile-detection.png"
                    : "mobile-task.png"
                }
                alt="Mobile Placeholder"
              />
            </div>
          </motion.figure>
        ))}
      </div>
      <div>
        <div className="max-w-xl space-y-3 bg-teal-500 h-fit p-4">
          <motion.h3
            className="text-violet-700 font-semibold"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            App Features
          </motion.h3>
          <motion.p
            className="text-white text-3xl font-semibold sm:text-4xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            Inspect and report back conveniently 
          </motion.p>
          <motion.p
            className="text-neutral-200"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            Send your daily feedback and reports from your preferred location without having to travel far
          </motion.p>
        </div>
        <motion.div
          className="mt-12 max-w-lg lg:max-w-none bg-teal-500 h-fit p-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <ul className="space-y-8">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-4">
                <div className="flex-none w-12 h-12 bg-green-50 text-violet-700 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg text-white font-semibold">
                    {item.title2} {/* Now correctly renders title2 */}
                  </h4>
                  <p className="mt-3 text-white">{item.desc2}</p> {/* Now correctly renders desc2 */}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};


const About = ({title, description, title2, description2}) => {
  const features = [
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
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: title,
      desc: description,
      title2: title2,
      desc2: description2,
    },
  ];

  return (
    // <section className="py-14 bg-teal-500 pt-24 sm:pt-32 space-y-52 bg-[url('/4-point-stars.svg')] bg-repeat bg-[length:30px_30px] ">
    <section className="py-14 bg-teal-500 pt-24 sm:pt-32 space-y-52 ">
      <Feature1 features={features} />
      <Feature2 features={features} />
    </section>
  );
};

export default About;
