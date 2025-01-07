import React from "react";
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Calendar,
  MapPinPlusInside,
  Tractor,
  WalletMinimal,
  WalletCards,
} from "lucide-react";

const MiniSideBar = () => {
  // Flatten the links list to handle children
  const flattenLinks = (links) => {
    return links.flatMap((link) =>
      link.children ? [link, ...link.children] : link
    );
  };

  const flattenedLinks = flattenLinks(links);

  return (
    <div
      id="sidebar-mini"
      className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-20 bg-accent border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      tabIndex={-1}
      aria-label="Mini Sidebar"
    >
      <div className="flex flex-col justify-center items-center gap-y-2 py-4">
        {/* Logo Icon */}
        <div className="mb-4">
          <a className="flex-none focus:outline-none focus:opacity-80" href="#">
            <svg
              className="w-10 h-auto"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="10" fill="black" />
              <path
              d="M30 20 H20 V80 C30 80 80 60 30 20 Z"
              fill="white"
              />
            </svg>
          </a>
        </div>

        {/* Sidebar Links */}
        {flattenedLinks.map((link, index) => (
          <div
            key={index}
            className="hs-tooltip [--placement:right] inline-block"
          >
            <a
              href={link.href}
              className="hs-tooltip-toggle size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              {link.icon}
              <span
                className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700"
                role="tooltip"
              >
                {link.label}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniSideBar;

// Links list
const links = [
  {
    href: "/crop/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/crop/Employees",
    label: "Employees",
    icon: <Users className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/crop/tasks",
    label: "Tasks",
    icon: <ListTodo className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/crop/Schedule",
    label: "Schedule",
    icon: <Calendar className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/crop/map",
    label: "Map",
    icon: <MapPinPlusInside className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/crop/dashboard",
    label: "Crop",
    icon: <Tractor className="w-5 h-5 text-gray-500 " />,
    children: [
      {
        href: "/crop/dashboard/reports",
        label: "Fields",
        icon: <WalletMinimal className="w-5 h-5 text-gray-500 " />,
      },
      {
        href: "/crop/dashboard/analytics",
        label: "Analytics",
        icon: <WalletCards className="w-5 h-5 text-gray-500" />,
      },
    ],
  },
];
