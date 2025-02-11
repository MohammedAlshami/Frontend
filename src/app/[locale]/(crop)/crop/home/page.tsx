"use client";
import { RiAddFill, RiNotification2Fill } from "@remixicon/react";
import React from "react";
import { Navbar } from "@/components/prototyping/Navbar";
import { CardComponent } from "@/components/prototyping/CardComponent";
import Sidebar from "@/components/prototyping/Sidebar";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { LayoutDashboard, MapPin } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { LineChartCallbackExample } from "@/components/charts/LineChartCallbackExample";
import CalendarUI from "@/components/ui/schedule/CalendarUI";
const DetailItem = ({ icon, content }) => {
  return (
    <div className="flex gap-2 items-center text-sm text-white">
      {icon}
      {content}
    </div>
  );
};

const HomePage = ({}) => {
  const [farmsData, setFarmsData] = useState([]);

  useEffect(() => {
    const fetchFarmsData = async () => {
      try {
        const response = await fetch(
          "https://duk8eezkki.execute-api.ap-southeast-1.amazonaws.com/main/v1/get-all",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table: "farms",
            }),
          }
        );
        const data = await response.json();
        setFarmsData(data);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchFarmsData();
  }, []);
  return (
    <div className="">
      <div className="px-6 sm:px-12 flex flex-col  gap-12 ">
        <BreadCrumbs
          title="Dashboard"
          icon={<LayoutDashboard className="text-icon w-8 h-8" />}
        />
        <div className="flex flex-col  md:flex-row justify-between gap-12">
          <div className="w-full">
            <h1 className="font-medium text-3xl pb-6">Harvest Stats</h1>

            <div className="border-2 border-black-600/60 p-4 rounded-lg space-x-4 w-full bg-accent cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm pl-8 pr-8 pt-8 pb-8">
              <LineChartCallbackExample />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="font-medium text-3xl">Farms</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {farmsData.map((field) => (
              <Link
                href={`/en/crop/map?map_id=${field.href}`}
                key={field.id}
                className="shadow-sm bg-accent rounded-xl overflow-hidden shadow-sm border border-gray-200 transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative">
                  {/* Background Image */}
                  <Image
                    width={400}
                    height={400}
                    src={field.image}
                    alt={field.name}
                    className="w-full h-56 object-cover"
                  />

                  {/* Black Overlay with 20% opacity */}
                  <div className="absolute inset-0 bg-black opacity-20" />

                  {/* Gradient Overlay from top to bottom with 40% opacity */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />

                  {/* Title Bar */}
                  <div className="absolute top-0 left-0 right-0 h-full p-4 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-white">
                        <h2 className="text-lg font-bold">{field.name}</h2>
                      </div>
                      <div className="p-2 rounded-full bg-teal-300 bg-opacity-50 text-white">
                        <Icon
                          icon="typcn:arrow-back"
                          width="24"
                          height="24"
                          className="rotate-180"
                        />
                      </div>
                    </div>
                    <DetailItem
                      icon={
                        <span className="text-sm tex-text-white bg-teal-300 p-2 rounded-full">
                          <MapPin className="w-4 h-4 " />
                        </span>
                      }
                      content={field.location}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
