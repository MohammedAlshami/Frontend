"use client";
import React, { useEffect, useState } from "react";
import CalendarUI from "@/components/ui/schedule/CalendarUI";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { CreditCard, LayoutDashboard } from "lucide-react";
import Calendar from "@/components/ui/schedule/CalendarComponent";

const Page = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch("/data/eventsData.json");
        const data = await response.json();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchEventsData();
  }, []);
  return (
    <div className=" px-6 sm:px-12 flex flex-col  gap-12  pb-12 bg-[#FCFCFD]">
      <BreadCrumbs
        title="Schedule"
        icon={<CreditCard className="text-icon w-8 h-8" />}
      />
      <CalendarUI calendar={<Calendar />} events={eventsData} />
    </div>
  );
};

export default Page;
