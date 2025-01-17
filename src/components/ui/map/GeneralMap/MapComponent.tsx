// Main Map Component: GeneralMap.jsx
import React, { useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  useInitializeMap,
  useZoneInteractions,
  useTreeInteractions,
} from "./MapHooks";
import { CustomZoomControl } from "./ZoomControl";

const GeneralMap = ({ basemap, layers, center, zones }) => {
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useInitializeMap({
    mapContainerRef,
    setMapInstance,
    basemap,
    center,
    layers,
  });
  useZoneInteractions({ mapInstance, zones, selectedZone, setSelectedZone });
  useTreeInteractions({ mapInstance });

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%", position: "relative" }}
      />
      <CustomZoomControl mapInstance={mapInstance} />
    </div>
  );
};

export default GeneralMap;
