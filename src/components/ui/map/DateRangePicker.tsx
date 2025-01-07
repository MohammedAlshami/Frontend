import React, { useState } from "react";
import { motion } from "framer-motion";

const DateRangePicker = ({ onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isComparison, setIsComparison] = useState(false);

  const handleComparisonChange = () => {
    setIsComparison(!isComparison);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-accent p-6 rounded-lg shadow-xl w-96">
        <h3 className="text-xl mb-4">Select Date Range</h3>
        <div>
          <label className="block mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <label className="block mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isComparison}
            onChange={handleComparisonChange}
            className="mr-2"
          />
          <label>Comparison Mode</label>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Close
          </button>
          <button
            onClick={() => alert("Date Range Selected")}
            className="bg-teal-500 px-4 py-2 rounded-md text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DateRangePicker;
