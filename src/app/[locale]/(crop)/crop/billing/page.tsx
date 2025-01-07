// Billing page.tsx
'use client';
import DataTable from "@/components/ui/DataTable";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Download, LayoutDashboard } from "lucide-react";
import CardComponent from "@/components/ui/CardComponent";
import { useState } from "react";

const Page = () => {
  const [billingData, setReports] = useState([
    {
      id: 1,
      date: "2025-01-01",
      orderNumber: "482521350-857",
      status: "PAID",
      paymentMethod: "Card",
      product: "Subscription: Annual Plan",
      total: "US$198.00",
      file: "https://github.com/excid3/receipts/blob/main/examples/invoice.pdf?raw=true",
    },
    {
      id: 2,
      date: "2025-02-01",
      orderNumber: "482475520-431",
      status: "PAID",
      paymentMethod: "Card",
      product: "1 product",
      total: "US$7.76",
      file: "https://github.com/excid3/receipts/blob/main/examples/invoice.pdf?raw=true",
    },
    {
      id: 3,
      date: "2025-03-31",
      orderNumber: "482475527-936",
      status: "PAID",
      paymentMethod: "Card",
      product: "1 product",
      total: "US$9.68",
      file: "https://github.com/excid3/receipts/blob/main/examples/invoice.pdf?raw=true",
    },
  ]);

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
      />
    </div>
  );
};
export default Page;
