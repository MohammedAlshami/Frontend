import React, { useState } from 'react';
import { SearchIcon, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';

const FarmFieldsTable = () => {
  

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredFields = fields.filter((field) =>
    field.field1.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.field2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFields.length / itemsPerPage);
  const displayedFields = filteredFields.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToExcel = () => {
    const dataForExport = filteredFields.map(field => ({
      'Field ID': field.id,
      'Field 1': field.field1,
      'Field 2': field.field2,
      'Number of Trees': field.numberOfTrees,
      'Total Fruits': field.totalFruits,
      'Harvested': `${field.harvestedFruits}/${field.totalFruits}`,
      'Harvest Progress': `${((field.harvestedFruits / field.totalFruits) * 100).toFixed(1)}%`
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Farm Fields');
    XLSX.writeFile(wb, 'farm_fields_report.xlsx');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 pr-4">
          <div className="bg-accent border border-[#E0E1E6] flex items-center gap-2 p-2 rounded-lg shadow-sm">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="w-full p-2 pl-3 focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="hover:bg-[#E0E1E6] cursor-pointer h-full border border-[#E0E1E6] flex items-center gap-2 p-2 pl-2 rounded-lg shadow-sm"
        >
          <Download className="w-5 h-5" />
          Export to Excel
        </button>
      </div>

      <div className="w-full bg-accent rounded-xl border border-[#E0E1E6] overflow-auto">
        <table className="w-full text-[#606475] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Field ID
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Field 1
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Field 2
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Trees
              </th>
              <th className="text-sm font-semibold p-4 text-left border-b border-[#E0E1E6]">
                Harvest Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedFields.map((field) => (
              <tr key={field.id}>
                <td className="p-4">{field.id}</td>
                <td className="p-4">{field.field1}</td>
                <td className="p-4">{field.field2}</td>
                <td className="p-4">{field.numberOfTrees}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(field.harvestedFruits / field.totalFruits) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm">
                      {field.harvestedFruits}/{field.totalFruits}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredFields.length)} of {filteredFields.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-accent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default FarmFieldsTable;