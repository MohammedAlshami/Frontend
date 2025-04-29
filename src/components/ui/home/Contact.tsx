import React, { useState } from "react";
import { motion } from "framer-motion";

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
  const handle_submit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!form_data.name || !form_data.email) {
      set_modal({
        is_open: true,
        message: "Please fill out the required fields (Name and Email).",
        is_success: false,
      });
      return;
    }

    // Show the notification modal first
    set_modal({
      is_open: true,
      message:
        "Opening your email client. Please send the email to complete your inquiry.",
      is_success: true,
    });

    // Prepare email content with proper formatting
    const subject = `Contact Form Inquiry from ${form_data.name}`;
    const body = `Hi,

${form_data.details}

Best regards,
${form_data.name}
${form_data.company_name ? form_data.company_name : ""}
${form_data.email}
${form_data.phone_number ? form_data.phone_number : ""}
    `;

    // Create mailto URL
    const mailtoUrl = `mailto:drangue.official@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Set timeout to close modal after 5 seconds and open email client
    setTimeout(() => {
      // Close the modal
      set_modal((prev) => ({ ...prev, is_open: false }));

      // Open the email client
      window.location.href = mailtoUrl;

      // Reset form
      set_form_data({
        name: "",
        company_name: "",
        email: "",
        phone_number: "",
        details: "",
      });
    }, 5000);
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

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  const formVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
    },
  };

  return (
    <>
      {/* Contact Section */}
      <motion.div
        className="max-w-7xl pb-10 px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        variants={fadeInOutVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        id="contact"
        transition={{ duration: 1 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="mt-12 max-w-2xl flex flex-col justify-center"
            variants={textVariant}
          >
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold">
                What are you waiting for?
              </span>
            </div>
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
              Ready to transform your business?
            </h2>
            <p className="mt-3 text-white text-lg">
              Want our solution tailored to your needs? Tell us how we can help you achieve your goals.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 w-full mx-auto"
            variants={formVariant}
          >
            <div className="relative flex flex-col bg-stone-950 rounded-xl p-4 sm:p-6 lg:p-8">
              <div className="absolute inset-0 -z-[1] border-4 border-transparent rounded-xl bg-gradient-to-br from-blue-600 via-transparent to-violet-600"></div>
              <h2 className="mb-8 text-xl font-semibold text-neutral-200">
                Fill in the form
              </h2>

              <form onSubmit={handle_submit}>
                <div className="grid gap-4 lg:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form_data.name}
                        onChange={handle_change}
                        required
                        className="border border-gray-400 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-violet-900 border-violet-700 text-white placeholder-neutral-500 focus:ring-neutral-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company_name"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={form_data.company_name}
                        onChange={handle_change}
                        className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-violet-900 border-violet-700 text-white placeholder-neutral-500 focus:ring-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={form_data.email}
                        onChange={handle_change}
                        required
                        className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-violet-900 border-violet-700 text-white placeholder-neutral-500 focus:ring-neutral-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone_number"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        value={form_data.phone_number}
                        onChange={handle_change}
                        className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-violet-900 border-violet-700 text-white placeholder-neutral-500 focus:ring-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="details"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Details
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={form_data.details}
                      onChange={handle_change}
                      className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-violet-900 border-violet-700 text-white placeholder-neutral-500 focus:ring-neutral-600"
                      rows="4"
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
                  <p className="text-sm text-neutral-500">
                    We'll get back to you in 1-2 business days.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Modal */}
      {modal.is_open && modal.is_success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          variants={fadeInOutVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-stone-900 p-6 rounded-lg shadow-lg border border-violet-600">
            <p className="text-lg font-semibold text-violet-400">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 w-full bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Modal */}
      {modal.is_open && !modal.is_success && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          variants={fadeInOutVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-stone-900 p-6 rounded-lg shadow-lg border border-red-600">
            <p className="text-lg font-semibold text-red-500">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
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