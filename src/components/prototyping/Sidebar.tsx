"use client";
import React, { useState } from "react";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  LayoutDashboard,
  List,
  ListTodo,
  MapPinPlusInside,
  SearchIcon,
  Tractor,
  TreeDeciduous,
  Users,
  WalletCards,
  WalletMinimal,
} from "lucide-react";
import { FaPeopleCarry } from "react-icons/fa";
import { RiNotification3Line } from "@remixicon/react";
import Link from "next/link";

const links = [
  {
    href: "/en/crop/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/en/crop/employees",
    label: "Employees",
    icon: <Users className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/en/crop/tasks",
    label: "Tasks",
    icon: <ListTodo className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/en/crop/schedule",
    label: "Schedule",
    icon: <Calendar className="w-5 h-5 text-gray-500 " />,
  },
  {
    href: "/en/crop/map",
    label: "Map",
    icon: <MapPinPlusInside className="w-5 h-5 text-gray-500 " />,
  },

  {
    href: "/en/crop/dashboard",
    label: "Crop",
    icon: <Tractor className="w-5 h-5 text-gray-500 " />,

    children: [
      {
        href: "/en/crop/fields",
        label: "Fields",
        icon: <TreeDeciduous className="w-5 h-5 text-gray-500 " />,
      },
      {
        href: "/en/crop/dashboard/analytics",
        label: "Analytics",
        icon: <WalletCards className="w-5 h-5 text-gray-500" />,
      },
    ],
  },
];

const Sidebar = ({ children }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (index) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className=" bg-gray-50 transition-all duration-300 lg:hs-overlay-layout-open:ps-[260px] dark:bg-neutral-900">
      <div id="content">
        <div className="hidden sm:block hs-overlay-open hs-overlay w-[260px] h-full fixed inset-y-0 start-0 z-[60] bg-white dark:bg-neutral-800 border-r-2 ">
          <div className="relative flex   flex-col h-full">
            <div className="px-6 pt-4  flex flex-row justify-between items-center gap-4 py-2">
              <a
                className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Preline"
              >
                <img src="/DRANGUE_Logo.png" alt="" className="w-28 h-auto" />
              </a>
              <RiNotification3Line className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-full overflow-y-auto  flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4 p-3">
                <div className=" hover:bg-[#E0E1E6] cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm">
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                  <h2 className="text-gray-500">Search</h2>
                </div>
                <div className="w-full h-[1px] bg-[#E0E1E6]"></div>
                <ul className="space-y-1 ">
                  {links.map((link, index) => (
                    <li key={index}>
                      {!link.children ? (
                        <Link
                          locale="en"
                          href={link.href}
                          className="flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                        >
                          {link.icon}
                          <span className="flex-1">{link.label}</span>
                        </Link>
                      ) : (
                        <div
                          className="flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer"
                          onClick={() => toggleMenu(index)}
                        >
                          {link.icon}
                          <span className="flex-1">{link.label}</span>
                          {expandedMenus[index] ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </div>
                      )}
                      {link.children && expandedMenus[index] && (
                        <ul className="ml-6 space-y-1">
                          {link.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <a
                                href={child.href}
                                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                              >
                                {child.icon}
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-1 border-t-2 border-[#E0E1E6]">
                <div className="flex justify-between items-center rounded-lg p-2 hover:bg-[#E0E1E6] cursor-pointer">
                  <div className="flex  justify-center items-center gap-4 w-11/12">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0F1F5] text-[#60646C]">
                      S
                    </div>
                    <div className="flex flex-col gap-1 w-9/12">
                      <h2 className="text-sm truncate">Shami1</h2>
                      <h2 className="text-sm truncate">mshami2021@gmail.com</h2>
                    </div>
                  </div>
                  <EllipsisVertical className="text-[#60646C] h-12 " />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pl-[240px] py-8 h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
