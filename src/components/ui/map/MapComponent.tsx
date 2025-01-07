import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

mapboxgl.accessToken = "process.env.NEXT_PUBLIC_MAPBOX_TOKEN || """;

const GeneralMap = ({
  basemap = DEFAULT_BASEMAP,
  layers,
  center = [0, 0], // [lng, lat] format for Mapbox
  zones,
  showPopup,
  setShowPopup,
}) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          basemap: {
            type: "raster",
            tiles: [basemap],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "basemap",
            type: "raster",
            source: "basemap",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center,
      zoom: 17,
    });

    // Add navigation controls
    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: false }),
      "top-right"
    );

    map.on("load", () => {
      setMapInstance(map);
    });

    return () => {
      map.remove();
    };
  }, [basemap, center]);

  // Handle zone clicks
  const handleZoneClick = (zone) => {
    if (selectedZone === zone) {
      setSelectedZone(null);
    } else {
      setSelectedZone(zone);
      if (mapInstance) {
        const bounds = zone.geometry.coordinates.flat(2);
        mapInstance.fitBounds(bounds, { padding: 20 });
      }
    }
  };

  // Add GeoJSON layers
  useEffect(() => {
    if (!mapInstance || !zones) return;

    mapInstance.on("click", "zones", (e) => {
      const clickedZone = e.features[0];
      handleZoneClick(clickedZone);
      setShowPopup(true);
    });

    mapInstance.addSource("zones", {
      type: "geojson",
      data: zones,
    });

    mapInstance.addLayer({
      id: "zones",
      type: "fill",
      source: "zones",
      paint: {
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "selected"], false],
          "green",
          "yellow",
        ],
        "fill-opacity": 0.5,
      },
    });

    return () => {
      if (mapInstance.getLayer("zones")) {
        mapInstance.removeLayer("zones");
        mapInstance.removeSource("zones");
      }
    };
  }, [mapInstance, zones]);

  // Custom Zoom Control
  const zoomIn = () => {
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapInstance) {
      mapInstance.zoomOut();
    }
  };

  const CustomZoomControl = () => (
    <div className="absolute top-4 right-4 bg-white rounded shadow-lg z-50 flex flex-col">
      <button
        onClick={zoomIn}
        className="text-3xl p-2 bg-gray-200 hover:bg-gray-300 rounded-t"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="text-3xl p-2 bg-gray-200 hover:bg-gray-300 rounded-b"
      >
        −
      </button>
    </div>
  );

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div
        ref={mapContainerRef}
        style={{ height: "100%", width: "100%", position: "relative" }}
      />
      <CustomZoomControl />
    </div>
  );
};

export default GeneralMap;
