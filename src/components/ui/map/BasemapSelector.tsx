import React, { useState } from "react";
import { FaMap, FaSatellite } from "react-icons/fa";

const BasemapSelector = ({ selectedBasemap, setSelectedBasemap, basemaps }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative z-50">
      <div className="relative bg-neutral-800 p-4 rounded-3xl shadow-2xl border border-white/30 text-white tooltip-container">
        <div className="flex flex-col sm:flex-row items-center justify-center rounded-md border border-neutral-800 gap-6">
          {basemaps.map((basemap, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedBasemap(basemap.name);
                setIsDropdownOpen(false); // Close dropdown after selection
              }}
              className={`flex items-center w-full p-3 rounded-md ${
                selectedBasemap === basemap.name
                  ? "bg-neutral-700 text-white"
                  : "bg-transparent hover:bg-neutral-700"
              }`}
            >
              <span className="mr-3">{basemap.icon}</span>
              {basemap.name}
            </button>
          ))}
        </div>
      </div>
      {/* Tooltip Arrow */}
      <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0  border-t-[10px] border-t-neutral-800 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></div>
    </div>
  );
};

export default BasemapSelector;
