"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import MiniSideBar from "@/components/prototyping/MiniSideBar";
import { useParams, useSearchParams } from "next/navigation";

const layers = {
  Imagery:
    "https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png",
};

const DynamicMap = dynamic(() => import("../../../../components/ui/map/Map"), {
  ssr: false,
});

const MapPage = () => {
  const [zonesData, setZonesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const map_id = searchParams.get("map_id")?.replace(/"/g, ""); // Remove quotes if present

  // Fetch zones data
  useEffect(() => {
    setIsLoading(true);
    fetch("http://127.0.0.1:5000/v1/field/get-all-field")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setZonesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching geojson data:", error);
        setIsLoading(false);
      });
  }, []);

  // Map configurations based on map_id
  const mapConfigs = {
    palm: {
      center: [-21.098761, -175.342867],
      layers: layers,
    },
    pineapple: {
      center: [-21.098761, -175.342867],
      layers: layers,
    },
  };

  console.log(zonesData);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const selectedConfig = mapConfigs[map_id];

  return (
    <div className="h-screen w-full z-0">
      <MiniSideBar />

      <div className="lg:pl-20">
        {selectedConfig ? (
          <DynamicMap
            center={selectedConfig.center}
            layers={selectedConfig.layers}
            zones={zonesData}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p>Map not found for ID: {map_id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
