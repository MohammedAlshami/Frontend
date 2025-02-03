"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header
        className="fixed top-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm"
        style={{ zIndex: 1000000000000000 }}
      >
        <nav
          className="mt-6 relative max-w-[55rem] w-full border border-purple-600 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-neutral-800/80 dark:border-neutral-700"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white"
              href="/"
            >
              <img
                className="mr-3"
                src="/drangue_light_logo.svg"
                width="120"
                alt="Drangue Logo"
              />
            </Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
              <Link
                href="/"
                className="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-neutral-400 dark:hover:text-neutral-500"
              >
                Home
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;