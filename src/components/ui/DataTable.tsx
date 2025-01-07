import React, { useState } from "react";
import { SearchIcon, Download, ChevronLeft, ChevronRight } from "lucide-react";
import * as XLSX from "xlsx";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
  itemsPerPage?: number;
  showSearch?: boolean;
  searchKeys?: string[];
  enableExport?: boolean;
  exportFileName?: string;
  className?: string;
}

const DataTable = ({
  data,
  columns,
  itemsPerPage = 6,
  showSearch = true,
  searchKeys = [],
  enableExport = false,
  exportFileName = "export",
  className = "",
}: TableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (item: any) => {
    const searchFields = searchKeys.length
      ? searchKeys
      : columns.map((col) => col.key);
    return searchFields.some((key) =>
      String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredData = data.filter(handleSearch);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToExcel = () => {
    const dataForExport = filteredData.map((item) => {
      const exportRow: any = {};
      columns.forEach((col) => {
        exportRow[col.header] = item[col.key];
      });
      return exportRow;
    });

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${exportFileName}.xlsx`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {showSearch && (
          <div className="flex-1 pr-4">
            <div className="bg-accent border border-[#E0E1E6] flex items-center gap-2 p-2 rounded-lg shadow-sm">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 pl-3 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        )}
        {enableExport && (
          <button
            onClick={exportToExcel}
            className="hover:bg-[#E0E1E6] cursor-pointer h-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-2 rounded-lg shadow-sm"
          >
            <Download className="w-5 h-5" />
            Export to Excel
          </button>
        )}
      </div>

      <div
        className={`w-full bg-accent rounded-xl border border-[#E0E1E6] overflow-auto ${className}`}
      >
        <table className="w-full text-[#606475] border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-4">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-accent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-accent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
