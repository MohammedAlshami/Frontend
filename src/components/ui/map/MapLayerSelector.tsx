import React, { useState } from "react";
import { FaTemperatureHigh, FaCloudRain, FaMap } from "react-icons/fa"; // Example icons for Temperature and Precipitation

const MapWithLayers: React.FC<{
  selectedLayer: string;
  setSelectedLayer: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedLayer, setSelectedLayer }) => {

  const layers = [
    { name: "NDVI", value: "ndvi", icon: <FaMap className="text-xl" /> },
    {
      name: "Temperature",
      value: "temperature",
      icon: <FaTemperatureHigh className="text-xl" />,
    },
    {
      name: "Precipitation",
      value: "precipitation",
      icon: <FaCloudRain className="text-xl" />,
    },
  ];
  

  return (
    <div className="relative z-50 bg-neutral-800 p-4 rounded-3xl shadow-2xl border border-white/30 text-white">
      <div className="rounded-md border border-neutral-800  flex flex-col sm:flex-row items-center  justify-center gap-8">
        {layers.map((layer, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedLayer(layer.value); // Update selected layer in parent
            }}
            className={`flex items-center w-full p-3 rounded-md ${
              selectedLayer === layer.value
                ? "bg-neutral-700 text-white"
                : "bg-transparent hover:bg-neutral-700"
            }`}
          >
            <span className="mr-3">{layer.icon}</span>
            {layer.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapWithLayers;
