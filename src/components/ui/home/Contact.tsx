import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const Contact = () => {
  // State variables for form data
  const [form_data, set_form_data] = useState({
    name: "",
    company_name: "",
    email: "",
    phone_number: "",
    details: "",
  });

  // State variable for modal visibility
  const [modal, set_modal] = useState({
    is_open: false,
    message: "",
    is_success: false,
  });

  // Handle input change
  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ugs5b5uxm6.execute-api.ap-southeast-1.amazonaws.com/main/send-enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form_data),
        }
      );

      if (response.ok) {
        set_modal({
          is_open: true,
          message: "Your inquiry was sent successfully!",
          is_success: true,
        });
        set_form_data({
          name: "",
          company_name: "",
          email: "",
          phone_number: "",
          details: "",
        });
      } else {
        throw new Error("Failed to send inquiry");
      }
    } catch (error) {
      set_modal({
        is_open: true,
        message: "Something went wrong. Please try again.",
        is_success: false,
      });
    }
  };

  // Close the modal
  const close_modal = () => {
    set_modal((prev) => ({ ...prev, is_open: false }));
  };

  // Fade in/out transition variants
  const fadeInOutVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* Contact Section */}
      <motion.div
        className="max-w-[85rem] pb-10 px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        variants={fadeInOutVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 1 }} // You can adjust the duration as needed
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="mt-12 max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">
              Contact Us
            </h2>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Want our solution tailored to your needs? Tell us how
            </p>
            <img className="w-[100rem] mt-6" src="contact.svg" alt="Contact Us" />
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 via-transparent p-[0.07rem] rounded-xl">
              <div className="relative flex flex-col bg-stone-950 rounded-xl p-4 sm:p-6 lg:p-10 m-">
                <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Fill in the form
                </h2>

                <form onSubmit={handle_submit}>
                  <div className="grid gap-4 lg:gap-6">
                    {/* Name & Company Name Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm text-gray-500 font-medium"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={form_data.name}
                          onChange={handle_change}
                          className="py-3 px-4 block w-full rounded-lg text-sm bg-stone-950 text-gray-400 border border-gray-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company_name"
                          className="block mb-2 text-sm text-gray-500 font-medium"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          id="company_name"
                          value={form_data.company_name}
                          onChange={handle_change}
                          className="py-3 px-4 block w-full rounded-lg text-sm bg-stone-950 text-gray-400 border border-gray-700"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Number Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm text-gray-500 font-medium"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          value={form_data.email}
                          onChange={handle_change}
                          className="py-3 px-4 block w-full rounded-lg text-sm bg-stone-950 text-gray-400 border border-gray-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone_number"
                          className="block mb-2 text-sm text-gray-500 font-medium"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phone_number"
                          id="phone_number"
                          value={form_data.phone_number}
                          onChange={handle_change}
                          className="py-3 px-4 block w-full rounded-lg text-sm bg-stone-950 text-gray-400 border border-gray-700"
                        />
                      </div>
                    </div>

                    {/* Details Section */}
                    <div>
                      <label
                        htmlFor="details"
                        className="block mb-2 text-sm text-gray-500 font-medium"
                      >
                        Details
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={form_data.details}
                        onChange={handle_change}
                        className="py-3 px-4 block w-full rounded-lg text-sm bg-stone-950 text-gray-400 border border-gray-700"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 grid">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Send inquiry
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      We'll get back to you in 1-2 business days.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Success Modal */}
      {modal.is_open && modal.is_success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          variants={fadeInOutVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-green-600">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Modal */}
      {modal.is_open && !modal.is_success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          variants={fadeInOutVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-red-600">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Contact;