import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

const GeneralMap: React.FC = ({
  basemap = DEFAULT_BASEMAP,
  layers,
  center,
  zones,
  showPopup,
  setShowPopup,
}) => {
  const handleMapClick = (e) => {
    setShowPopup(true);
  };
  const mapRef = useRef(null);
  const MAXZOOM = 22;

  const [selectedZone, setSelectedZone] = useState(null); // State to track selected zone
  const [cutoutStyle, setCutoutStyle] = useState({ display: "none" }); // State for overlay cutout
  const [cutoutPosition, setCutoutPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  // Custom TileLayer with caching
  const CachedTileLayer = ({ urlTemplate, ...props }) => {
    const getTileKey = (x, y, z) => `tile_${z}_${x}_${y}`;

    const loadTileFromCache = async (key) => {
      try {
        const cachedData = localStorage.getItem(key);
        if (!cachedData) return null;

        // Try to parse the cached data
        const { timestamp, dataUrl } = JSON.parse(cachedData);

        // Check if cache is older than 24 hours
        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
          return null;
        }

        // Verify the data URL is valid
        const response = await fetch(dataUrl);
        if (!response.ok) {
          localStorage.removeItem(key);
          return null;
        }

        return dataUrl;
      } catch (error) {
        console.error("Error loading from cache:", error);
        localStorage.removeItem(key);
        return null;
      }
    };

    const saveTileToCache = async (key, blob) => {
      try {
        // Convert blob to data URL
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const cacheData = {
              timestamp: Date.now(),
              dataUrl: reader.result,
            };
            try {
              localStorage.setItem(key, JSON.stringify(cacheData));
              resolve(reader.result);
            } catch (error) {
              if (error.name === "QuotaExceededError") {
                console.error("LocalStorage quota exceeded. Clearing cache.");
                localStorage.clear(); // Clear the local storage cache if quota is exceeded
              }
              resolve(null); // If saving fails, resolve with null
            }
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error saving to cache:", error);
        return null;
      }
    };

    const fetchTile = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch tile: ${url}`);
        return await response.blob();
      } catch (error) {
        console.error(`Error fetching tile:`, error);
        return null;
      }
    };

    useEffect(() => {
      const originalCreateTile = L.TileLayer.prototype.createTile;

      L.TileLayer.prototype.createTile = function (coords, done) {
        const tile = document.createElement("img");
        const key = getTileKey(coords.x, coords.y, coords.z);

        const handleError = () => {
          console.error("Tile load error");
          done(new Error("Tile load error"));
        };

        const loadTile = async () => {
          try {
            // First try to load from cache
            const cachedTile = await loadTileFromCache(key);
            if (cachedTile) {
              tile.src = cachedTile;
              done(null, tile);
              return;
            }

            // If not in cache, fetch from server
            const url = urlTemplate
              .replace("{x}", coords.x)
              .replace("{y}", coords.y)
              .replace("{z}", coords.z);

            const tileBlob = await fetchTile(url);
            if (!tileBlob) {
              handleError();
              return;
            }

            // Save to cache and set tile src
            const dataUrl = await saveTileToCache(key, tileBlob);
            if (dataUrl) {
              tile.src = dataUrl;
              done(null, tile);
            } else {
              handleError();
            }
          } catch (error) {
            handleError();
          }
        };

        loadTile();
        return tile;
      };

      return () => {
        L.TileLayer.prototype.createTile = originalCreateTile;
      };
    }, [urlTemplate]);

    return <TileLayer url={urlTemplate} {...props} />;
  };

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleZoneClick = (e) => {
    const clickedZone = e.target;

    // If the clicked zone is the same as the selected one, deselect it
    if (selectedZone === clickedZone) {
      setSelectedZone(null);
      clickedZone.setStyle({
        fillColor: "yellow", // Default color
      });
      setCutoutStyle({ display: "none" }); // Hide overlay
    } else {
      // Set the color of the previously selected zone back to yellow
      if (selectedZone) {
        selectedZone.setStyle({
          fillColor: "yellow", // Default color
        });
      }

      // Set the color of the clicked zone to green
      clickedZone.setStyle({
        fillColor: "green",
      });

      // Update the selected zone state
      setSelectedZone(clickedZone);

      // Zoom to the clicked zone
      const bounds = clickedZone.getBounds(); // Get bounds of the clicked zone
      if (mapRef.current) {
        const map = mapRef.current;
        map.fitBounds(bounds);

        // Get the center of the bounds
        const zoneCenter = bounds.getCenter();

        // Offset the center to move the zone to the left side
        const mapSize = map.getSize();
        const offsetX = mapSize.x * -0.3; // Adjust offset percentage
        const offsetPoint = map
          .latLngToContainerPoint(zoneCenter)
          .subtract([offsetX, 0]);
        const newCenter = map.containerPointToLatLng(offsetPoint);

        map.setView(newCenter, map.getZoom());
      }

      // Set overlay cutout position and size
      const zoneBounds = clickedZone.getBounds();
      const cutout = {
        top: zoneBounds.getNorthWest().lat + "%", // Adjust position
        left: zoneBounds.getNorthWest().lng + "%",
        width:
          zoneBounds.getSouthEast().lng - zoneBounds.getNorthWest().lng + "%",
        height:
          zoneBounds.getSouthEast().lat - zoneBounds.getNorthWest().lat + "%",
      };
      setCutoutPosition(cutout);
      setCutoutStyle({
        display: "block", // Show overlay
        ...cutout,
      });
    }
  };
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MapContainer
        center={center}
        zoom={17}
        scrollWheelZoom={true}
        className="h-[100%] w-[100%] z-0 rounded-lg"
        maxZoom={MAXZOOM}
        ref={mapRef}
        zoomControl={false}
      >
        <CachedTileLayer
          urlTemplate={basemap}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={MAXZOOM}
        />
        {layers}

        <GeoJSON
          data={zones}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: (e) => {
                handleZoneClick(e);
                handleMapClick(e);
              }, // Add click event listener to each zone
            });

            layer.setStyle({
              color: "yellow",
              weight: 2,
              fillColor: "yellow", // Default fill color
              fillOpacity: 0.5,
            });
          }}
        />
        <CustomZoomControl />
      </MapContainer>

      {/* Overlay cutout */}
      <div
        style={{
          ...cutoutStyle,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay
          zIndex: 1000,
          pointerEvents: "none", // Prevent overlay from blocking clicks
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "transparent", // Cutout effect
            border: "2px solid white", // Optional: Add a border around the selected zone
            ...cutoutPosition,
          }}
        />
      </div>
    </div>
  );

  function CustomZoomControl() {
    return (
      <div className={`absolute ${!showPopup ? "top-4 right-4 ": "top-4 left-4 "} bg-[#F9FAFB] rounded shadow-lg z-[10000000000000] flex flex-col rounded-xl`}>
        <button
          onClick={zoomIn}
          className="text-3xl p-2 px-4 bg-[#F9FAFB] text-black hover:cursor-pointer hover:bg-purple-600 rounded-t-xl"
        >
          +
        </button>
        <hr className="border-t border-gray-500" />
        <button
          onClick={zoomOut}
          className="text-3xl p-2 px-2 bg-[#F9FAFB] text-black hover:cursor-pointer hover:bg-purple-600 rounded-b-xl "
        >
          -
        </button>
      </div>
    );
  }
};

export default GeneralMap;
