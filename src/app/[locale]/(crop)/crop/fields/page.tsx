"use client";
import { RiAddFill, RiAddLargeFill } from "@remixicon/react";
import React, { useState } from "react";
import { Navbar } from "@/components/prototyping/Navbar";

import { CardComponent } from "@/components/prototyping/CardComponent";
import Link from "next/link";
import {
  BadgeRussianRuble,
  Calculator,
  Calendar,
  Calendar1,
  CalendarCheck2,
  LayoutDashboard,
  LocateIcon,
  Palmtree,
  Users,
} from "lucide-react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { FaUserPlus } from "react-icons/fa";

const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm whitespace-nowrap">
      {icon}
      {content}
    </div>
  );
};
const TopPart = ({ title }) => {
  return (
    <div className="w-full flex flex-row gap-4">
      <div className="w-full flex justify-between items-center ">
        <div className="w-full flex flex-row justify-between gap-6">
          <h2 className="text-black font-bold text-xl w-full">{title}</h2>
          <DetailItem
            icon={<LocateIcon className="text-teal-500 fill-teal-500" />}
            content={<p>2.946121, 101.559075</p>}
          />
        </div>
      </div>
    </div>
  );
};
const Fields = () => {
  const [isFlex, setIsFlex] = useState(false);

  return (
    <div>
      <div className=" px-6 sm:px-12 flex flex-col  gap-12  pb-12">
        <div className="flex justify-between">
          <BreadCrumbs
            title="Fields"
            icon={<Users className="text-[#60646C] w-8 h-8" />}
          />
          <div className="flex gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsFlex(!isFlex)}
            >
              <h1 className="font-medium">
                {isFlex ? "Switch to Cards" : "Switch to Flex"}
              </h1>
              <div
                className={`w-10 h-6   border border-[#E0E1E6] ${
                  isFlex ? "bg-teal-300" : "bg-gray-300"
                } rounded-full flex items-center p-1`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                    isFlex ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <RiAddLargeFill className="w-4 h-4" />
              Add Field
            </button>
          </div>
        </div>

        <div
          className={`${
            isFlex
              ? "flex flex-col gap-2"
              : "grid grid-cols-1 lg:grid-cols-3 gap-12"
          } transition-all duration-300 ease-in-out`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className={`w-full h-fit transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer p-2  bg-white cursor-pointer border border-[#E0E1E6]  rounded-lg shadow-sm ${
                isFlex ? "flex flex-row items-center justify-center" : ""
              } rounded-lg space-y-4 shadow-md transition-all duration-300 ease-in-out`}
              key={index}
            >
              <img
                src={`/fields/${(index % 3) + 1}.png`}
                alt={`Field ${index + 1}`}
                className={`${
                  isFlex ? "h-12 w-12" : "h-64 w-full"
                } rounded-lg object-cover transition-all duration-300 ease-in-out`}
              />
              <div
                className={`flex flex-row ${
                  isFlex ? "w-full flex-row justify-between" : "w-full flex-col"
                } gap-3 px-4 pb-4 transition-all duration-300 ease-in-out`}
              >
                <TopPart title={`Farm ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return <Fields />;
};

export default page;
