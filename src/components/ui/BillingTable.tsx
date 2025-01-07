"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { ArrowLeftCircle, ArrowRightCircle, SearchIcon } from "lucide-react";

const BillingTable = () => {
  const [reports, setReports] = useState([
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

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const filteredReports = reports.filter((report) =>
    report.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const displayedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="pr-5 w-full bg-accent border border-[#E0E1E6] flex items-center gap-2 p-2 rounded-lg shadow-sm">
      <SearchIcon className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 pl-3"
      />
    </div> */}

      <div className="bg-accent w-full bg-accent rounded-xl border border-[#E0E1E6] overflow-auto">
        <table className="w-full text-[#606475] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Date
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Order Number
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Status
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Payment Method
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Product
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Total
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedReports.map((report) => (
              <tr key={report.id}>
                <td className="p-4">{report.date}</td>
                <td className="p-4">{report.orderNumber}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                    {report.status}
                  </span>
                </td>
                <td className="p-4">{report.paymentMethod}</td>
                <td className="p-4">{report.product}</td>
                <td className="p-4">{report.total}</td>
                <td className="p-4">
                  <a
                    href={report.file}
                    download
                    className="bg-gray-100 p-2 rounded-full text-neutral-700 hover:text-blue-700 flex justify-center items-center gap-2"
                  >
                    <FaDownload />
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="flex justify-center items-center mt-4 space-x-2 gap-4 text-[#1C2024]">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="flex items-center justify-center gap-4 px-4 py-2 bg-accent border border-[#E0E1E6] rounded-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ArrowLeftCircle />
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="flex items-center justify-center gap-4 px-4 py-2 bg-accent border border-[#E0E1E6] rounded-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightCircle />
      </button>
    </div> */}
    </div>
  );
};

export default BillingTable;
