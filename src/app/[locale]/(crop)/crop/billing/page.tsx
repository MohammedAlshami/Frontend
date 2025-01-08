// Billing page.tsx
"use client";
import DataTable from "@/components/ui/DataTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Download, LayoutDashboard } from "lucide-react";
import CardComponent from "@/components/ui/CardComponent";
import { useEffect, useState } from "react";

const Page = () => {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await fetch("/data/billingData.json");
        const data = await response.json();
        setBillingData(data);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
  }, []);

  const columns = [
    { key: "date", header: "Date" },
    { key: "orderNumber", header: "Order Number" },
    {
      key: "status",
      header: "Status",
      render: (status) => (
        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
          {status}
        </span>
      ),
    },
    { key: "paymentMethod", header: "Payment Method" },
    { key: "product", header: "Product" },
    { key: "total", header: "Total" },
    {
      key: "file",
      header: "Invoice",
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
        title="Billing"
        icon={<LayoutDashboard className="text-icon w-8 h-8" />}
      />
      <CardComponent />
      <DataTable
        data={billingData}
        columns={columns}
        enableExport
        exportFileName="billing_history"
        isLoading={billingData.length == 0}
      />
    </div>
  );
};
export default Page;
