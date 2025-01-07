import React from "react";
import CalendarUI from "@/components/ui/schedule/CalendarUI";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { LayoutDashboard } from "lucide-react";
import ReportsTable from "@/components/ui/ReportTable";

const page = () => {
  return (
    <div className=" px-6 sm:px-12 flex flex-col  gap-12  pb-12 bg-[#FCFCFD]">
      <BreadCrumbs
        title="Reports"
        icon={<LayoutDashboard className="text-icon w-8 h-8" />}
      />
      <ReportsTable />
    </div>
  );
};

export default page;
