import { BellDot, LayoutDashboard, Users } from "lucide-react";
import React from "react";
import { LineChartCallbackExample } from "@/components/charts/LineChartCallbackExample";
import { DonutChartCallbackExample } from "@/components/charts/DonutChartCallbackExample";
import { AreaChartHero } from "@/components/charts/graph";
import BubbleChart from "@/components/charts/BubbleChart";
import YieldedBlocks from "@/components/charts/YieldedBlocks";
import { BarChartHero } from "@/components/charts/BarChartHero";
import BreadCrumbs from "@/components/ui/BreadCrumbs";

const Page = () => {
  return (
    <div className=" px-6 sm:px-12 flex flex-col  gap-12  pb-12">
      <BreadCrumbs
        title="Dashboard"
        icon={<LayoutDashboard className="text-[#60646C] w-8 h-8" />}
      />
      <div className="flex flex-col gap-12 ">
        <div className="flex flex-col  md:flex-row justify-between gap-12">
          <div className="w-full">
            <div className="border-2 border-black-600/60 p-4 rounded-lg space-x-4 w-full bg-white cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm pl-8 pr-8 pt-8 pb-8">
              <LineChartCallbackExample />
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row justify-between gap-24 ">
          <div className="w-full">
            <div className="border-2 border-black-600/60 p-4 rounded-lg space-x-4 w-full bg-white cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm pl-8 pr-8 pt-8 pb-8">
              <YieldedBlocks />
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="border-2 border-black-600/60 p-4 rounded-lg h-full w-full space-x-4 w-full bg-white cursor-pointer w-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-3 rounded-lg shadow-sm pl-8 pr-8 pt-8 pb-8">
              <DonutChartCallbackExample />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-[122rem]  sm:h-[40rem] md:mx-4  md:h-[37rem] lg:h-[68rem]  w-full  bg-cover bg-center bg-no-repeat bg-[url('/xs_dashboard.svg')] sm:bg-[url('/sm_dashboard.svg')] md:bg-[url('/dashboard.svg')] "></div> */}
    </div>
  );
};

export default Page;
