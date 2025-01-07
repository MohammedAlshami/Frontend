import React from "react";
import CalendarUI from "@/components/ui/schedule/CalendarUI";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Calendar, CreditCard, LayoutDashboard } from "lucide-react";

const page = () => {
  return (
    <div className=" px-6 sm:px-12 flex flex-col  gap-12  pb-12 bg-[#FCFCFD]">
      <BreadCrumbs
        title="Schedule"
        icon={<Calendar className="text-icon w-8 h-8" />}
      />
      <CalendarUI />
    </div>
  );
};

export default page;
