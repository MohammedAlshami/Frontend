"use client";
import React, { useState } from "react";
import {
  AlertCircle,
  Calendar,
  Camera,
  ChevronDown,
  ChevronRight,
  CreditCard,
  EllipsisVertical,
  LayoutDashboard,
  List,
  ListCollapse,
  ListTodo,
  MapPinPlusInside,
  ScrollTextIcon,
  SearchIcon,
  Tractor,
  TreeDeciduous,
  Users,
  WalletCards,
  WalletMinimal,
} from "lucide-react";
import { FaPeopleCarry } from "react-icons/fa";
import { RiExportLine, RiNotification3Line } from "@remixicon/react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
const links = [
  {
    href: "/en/crop/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5 text-icon " />,
  },
  {
    href: "/en/crop/farms",
    label: "Farm",
    icon: <TreeDeciduous className="w-5 h-5 text-icon " />,
  },
  {
    href: "/en/crop/employees",
    label: "Employees",
    icon: <Users className="w-5 h-5 text-icon " />,
  },
  {
    href: "/en/crop/detect",
    label: "Detect",
    icon: (
      <Icon
        icon="fluent:scan-camera-16-filled"
        className="w-5 h-5 text-icon "
      />
    ),
  },
  {
    href: "/en/crop/tasks",
    label: "Tasks",
    icon: <ListTodo className="w-5 h-5 text-icon " />,
  },
  {
    href: "/en/crop/schedule",
    label: "Schedule",
    icon: <Calendar className="w-5 h-5 text-icon " />,
  },

  {
    href: "/en/crop/billing",
    label: "Billing",
    icon: <CreditCard className="w-5 h-5 text-icon " />,
  },

  {
    href: "/en/crop/reports",
    label: "Reports",
    icon: <ScrollTextIcon className="w-5 h-5 text-icon " />,
  },
];

const Sidebar = ({ children, Minimize }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  var [isMinimized, setIsMinimized] = useState(Minimize);

  const toggleMenu = (index) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className=" bg-gray-50 transition ease-in-out delay-150 ">
      <div id="content">
        <div
          className={`w-full sm:block hs-overlay-open hs-overlay ${
            !isMinimized ? "sm:w-[260px]  h-fit " : "sm:w-16"
          } sm:h-full fixed inset-y-0 start-0 z-[60] bg-accent border-r-2 transition-all duration-600 ease-in-out`}
        >
          <div className="relative flex   flex-col h-full">
            <div
              className={`px-3 pt-4  flex ${
                isMinimized
                  ? "flex-row-reverse sm:flex-col"
                  : "flex-row flex-row-reverse"
              } justify-between items-center gap-4 py-2`}
            >
              <div
                className="cursor-pointer hover:bg-black hover:text-white text-icon  rounded-full p-2"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <ListCollapse
                  className={`w-5 h-5  ${isMinimized ? "rotate-180" : ""}`}
                />
              </div>
              <a
                className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                href="#"
                aria-label="Preline"
              >
                {!isMinimized ? (
                  <img
                    src="/DRANGUE_Logo.png"
                    alt="Drangue Logo"
                    className="w-28 h-auto"
                  />
                ) : (
                  <img
                    src="/DrangueMiniLogo.svg"
                    alt="Drangue Mini Logo"
                    className="w-10 h-auto"
                  />
                )}
              </a>
            </div>
            <div
              className={`${
                !isMinimized ? "hidden" : ""
              }  sm:flex h-full overflow-y-auto  flex-col justify-between gap-4`}
            >
              <div className="flex flex-col gap-4 p-3">
                <div className="hover:bg-[#E0E1E6] cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-2 rounded-lg shadow-sm">
                  <SearchIcon className="w-5 h-5 text-icon" />
                  {!isMinimized && <h2 className="text-icon">Search</h2>}
                </div>
                <div className="w-full h-[1px] bg-[#E0E1E6]"></div>
                <ul className="space-y-1">
                  {links.map((link, index) => (
                    <li key={index}>
                      {!link.children ? (
                        isMinimized ? (
                          <Tooltip
                            content={link.label}
                            showArrow={true}
                            placement="right"
                            delay={10}
                          >
                            <Link
                              locale="en"
                              href={link.href}
                              className="flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                            >
                              {link.icon}
                              {!isMinimized && (
                                <span className="flex-1 text-textDark">{link.label}</span>
                              )}
                            </Link>
                          </Tooltip>
                        ) : (
                          <Link
                            locale="en"
                            href={link.href}
                            className="flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                          >
                            {link.icon}
                            <span className="flex-1  text-textDark">{link.label}</span>
                          </Link>
                        )
                      ) : (
                        <>
                          {isMinimized ? (
                            <Tooltip
                              content={link.label}
                              showArrow={true}
                              placement="right"
                              delay={10}
                            >
                              <div
                                className="flex items-center gap-x-3.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer"
                                onClick={() => toggleMenu(index)}
                              >
                                {link.icon}
                              </div>
                            </Tooltip>
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
                            <ul
                              className={`${
                                !isMinimized ? "ml-6" : ""
                              } space-y-1`}
                            >
                              {link.children.map((child, childIndex) =>
                                isMinimized ? (
                                  <Tooltip
                                    key={childIndex}
                                    content={child.label}
                                    showArrow={true}
                                    placement="right"
                                    delay={10}
                                  >
                                    <li>
                                      <a
                                        href={child.href}
                                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                                      >
                                        {child.icon}
                                      </a>
                                    </li>
                                  </Tooltip>
                                ) : (
                                  <li key={childIndex}>
                                    <a
                                      href={child.href}
                                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900"
                                    >
                                      {child.icon}
                                      {child.label}
                                    </a>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <Dropdown className="border-2 border-black/5">
                <DropdownTrigger>
                  <div className="p-1 border-t-2 border-[#E0E1E6]">
                    <div className="flex justify-between items-center rounded-lg p-2 hover:bg-[#E0E1E6] cursor-pointer">
                      <div className="flex justify-center items-center gap-4 w-11/12">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F0F1F5] text-icon">
                          S
                        </div>
                        {!isMinimized && (
                          <div className="flex flex-col gap-1 w-9/12">
                            <h2 className="text-sm truncate">Shami1</h2>
                            <h2 className="text-sm truncate">
                              mshami2021@gmail.com
                            </h2>
                          </div>
                        )}
                      </div>
                      {!isMinimized && (
                        <EllipsisVertical className="text-icon h-12" />
                      )}
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Link Actions">
                  <DropdownItem key="home" href="/en/logout">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div
          className={`${
            !isMinimized ? " sm:pl-[240px]" : "sm:pl-12"
          } h-screen transition-all duration-600 ease-in-out`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
