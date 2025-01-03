import React, { useState, useEffect } from "react";
import FloatingButtons from "./FloatingButtons";
import DateRangePicker from "./DateRangePicker";
import BasemapSelector from "./BasemapSelector";
import MapLayerSelector from "./MapLayerSelector";
import GeneralMap from "./MapComponent";
const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
import { TileLayer } from "react-leaflet";
import WeatherCard from "./WeatherCard";
import { MapOptions } from "./Mapoptions";
import { FaMap, FaSatellite } from "react-icons/fa";

const MapPage = ({ basemap = DEFAULT_BASEMAP, layers, center, zones }) => {
  const [showDateRangePicker, setShowDateRangePicker] = useState(true);

  const handleOpenDateRangePicker = () => {
    setShowDateRangePicker(true);
  };

  const handleCloseDateRangePicker = () => {
    setShowDateRangePicker(false);
  };

  const [selectedLayer, setSelectedLayer] = useState<string>("");
  const [selectedBasemap, setSelectedBasemap] = useState<string>("Satellite");
  const [currentBasemap, setCurrentBasemap] = useState<string>("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png");

  const basemaps = [
    {
      name: "Satellite",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      icon: <FaMap className="text-xl" />, // Placeholder icon
    },
    {
      name: "Street",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      icon: <FaSatellite className="text-xl" />, // Placeholder icon
    },
  ];

  const getBasemapByName = (name: string) => {
    const basemap = basemaps.find((map) => map.name === name);
    return basemap || null; // Return the basemap or null if not found
  };

  useEffect(() => {
    const basemap = getBasemapByName(selectedBasemap);
    if (basemap) {
      setCurrentBasemap(basemap.url); // Set the URL of the selected basemap
    }
  }, [selectedBasemap]); // Update when the selected basemap changes

  // URLs for different map layers
  const basemapUrls: Record<string, string> = {
    ndvi: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    temperature:
      "https://b.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound=true",
    precipitation:
      "https://c.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&day=2025-01-02T23:20",
  };

  return (
    <div className="relative h-screen w-full ">
      {showDateRangePicker && (
        <DateRangePicker onClose={handleCloseDateRangePicker} />
      )}

      {/* GeneralMap Component */}
      <GeneralMap
        basemap={DEFAULT_BASEMAP} // Ensure the basemap is set
        layers={<TileLayer url={basemapUrls[selectedLayer]} />}
        center={[1.632294, 103.771028]}
        zones={zones}
      />

      {/* Overlay Controls */}
      <div className="absolute top-0 right-0 z-10 p-4">
        <div className="flex flex-col gap-12">{/* <WeatherCard /> */}</div>
      </div>

      {/* MapOptions positioned at bottom middle */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center mb-8 z-10">
        <div className="flex flex-col gap-8">
          {selectedLayer == "Layers" && (
            <MapLayerSelector
              setSelectedLayer={setSelectedLayer}
              selectedLayer={selectedLayer}
            />
          )}
          {selectedLayer == "Basemap" && (
            <BasemapSelector
              selectedBasemap={selectedBasemap}
              setSelectedBasemap={setSelectedBasemap}
              basemaps={basemaps}
            />
          )}

          <MapOptions
            setSelectedOption={setSelectedLayer}
            selectedOption={selectedLayer}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
