"use client";
import DataTable from "@/components/ui/DataTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Download, LayoutDashboard } from "lucide-react";
import CardComponent from "@/components/ui/CardComponent";
import { useEffect, useState } from "react";

const Page = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/data/reports.json");
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);
  const columns = [
    { key: "date", header: "Date" },
    { key: "report_id", header: "Report ID" },
    { key: "description", header: "Description" },
    {
      key: "file",
      header: "Download Report",
      render: (file) => (
        <a
          href={file}
          download
          className="bg-gray-100 p-2 rounded-full text-neutral-700 hover:text-blue-700 flex justify-center items-center gap-2"
        >
          <Download /> Download
        </a>
      ),
    },
  ];

  return (
    <div className="px-6 sm:px-12 flex flex-col gap-12 pb-12 bg-[#FCFCFD]">
      <BreadCrumbs
        title="Reports"
        icon={<LayoutDashboard className="text-icon w-8 h-8" />}
      />

      <DataTable
        data={reports}
        columns={columns}
        enableExport
        exportFileName="reports_history"
        isLoading={reports.length == 0}
      />
    </div>
  );
};

export default Page;
