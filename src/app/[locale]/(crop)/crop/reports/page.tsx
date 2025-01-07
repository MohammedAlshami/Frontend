"use client";
import DataTable from "@/components/ui/DataTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Download, LayoutDashboard } from "lucide-react";
import CardComponent from "@/components/ui/CardComponent";
import { useState } from "react";

const Page = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: "2025-01-01",
      report_id: "4825",
      description:
        "Detailed report on the crops harvested in 2024, including yield and quality analysis.",
      file: "https://raw.githubusercontent.com/py-pdf/sample-files/refs/heads/main/025-attachment/with-attachment.pdf",
    },
    {
      id: 2,
      date: "2025-02-01",
      report_id: "48247",
      description:
        "Summary of the single crop harvested in early 2025, including yield and quality analysis.",
      file: "https://raw.githubusercontent.com/py-pdf/sample-files/refs/heads/main/025-attachment/with-attachment.pdf",
    },
    {
      id: 3,
      date: "2025-03-31",
      report_id: "48247",
      description:
        "Report on the crop harvested at the end of the first quarter of 2025, including yield and quality analysis.",
      file: "https://raw.githubusercontent.com/py-pdf/sample-files/refs/heads/main/025-attachment/with-attachment.pdf",
    },
  ]);

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
      />
    </div>
  );
};

export default Page;
