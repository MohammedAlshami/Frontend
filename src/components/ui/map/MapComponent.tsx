import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

const GeneralMap = ({
  basemap = DEFAULT_BASEMAP,
  layers,
  center,
  zones,
  showPopup,
  setShowPopup,
}) => {
  const mapRef = useRef(null);
  const MAXZOOM = 22;
  const [selectedZone, setSelectedZone] = useState(null);
  const [cutoutStyle, setCutoutStyle] = useState({ display: "none" });
  const [cutoutPosition, setCutoutPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const handleMapClick = (e) => {
    setShowPopup(true);
  };

  // Custom TileLayer with caching
  const CachedTileLayer = ({ urlTemplate, ...props }) => {
    const getTileKey = (x, y, z) => `tile_${z}_${x}_${y}`;

    const loadTileFromCache = async (key) => {
      try {
        const cachedData = localStorage.getItem(key);
        if (!cachedData) return null;

        const { timestamp, dataUrl } = JSON.parse(cachedData);

        if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
          return null;
        }

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
                localStorage.clear();
              }
              resolve(null);
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
            const cachedTile = await loadTileFromCache(key);
            if (cachedTile) {
              tile.src = cachedTile;
              done(null, tile);
              return;
            }

            const url = urlTemplate
              .replace("{x}", coords.x)
              .replace("{y}", coords.y)
              .replace("{z}", coords.z);

            const tileBlob = await fetchTile(url);
            if (!tileBlob) {
              handleError();
              return;
            }

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

  const defaultStyle = {
    color: "yellow",
    weight: 2,
    fillColor: "yellow",
    fillOpacity: 0.5,
  };

  const handleZoneClick = (e) => {
    if (!e.target || !e.target.setStyle) {
      console.error('Invalid layer clicked');
      return;
    }

    const clickedZone = e.target;

    try {
      if (selectedZone === clickedZone) {
        setSelectedZone(null);
        clickedZone.setStyle(defaultStyle);
        setCutoutStyle({ display: "none" });
      } else {
        if (selectedZone && selectedZone.setStyle) {
          selectedZone.setStyle(defaultStyle);
        }

        clickedZone.setStyle({
          ...defaultStyle,
          fillColor: "green",
        });

        setSelectedZone(clickedZone);

        const bounds = clickedZone.getBounds();
        if (mapRef.current) {
          const map = mapRef.current;
          map.fitBounds(bounds);

          const zoneCenter = bounds.getCenter();
          const mapSize = map.getSize();
          const offsetX = mapSize.x * -0.3;
          const offsetPoint = map
            .latLngToContainerPoint(zoneCenter)
            .subtract([offsetX, 0]);
          const newCenter = map.containerPointToLatLng(offsetPoint);

          map.setView(newCenter, map.getZoom());
        }

        const zoneBounds = clickedZone.getBounds();
        const cutout = {
          top: zoneBounds.getNorthWest().lat + "%",
          left: zoneBounds.getNorthWest().lng + "%",
          width: (zoneBounds.getSouthEast().lng - zoneBounds.getNorthWest().lng) + "%",
          height: (zoneBounds.getSouthEast().lat - zoneBounds.getNorthWest().lat) + "%",
        };
        
        setCutoutPosition(cutout);
        setCutoutStyle({
          display: "block",
          ...cutout,
        });
      }
    } catch (error) {
      console.error('Error handling zone click:', error);
    }
  };

  const onEachFeature = (feature, layer) => {
    if (layer) {
      layer.on({
        click: (e) => {
          handleZoneClick(e);
          handleMapClick(e);
        },
      });
    }
  };

  const CustomZoomControl = () => {
    return (
      <div className={`absolute ${!showPopup ? "top-4 right-4" : "top-4 left-4"} bg-[#F9FAFB] rounded shadow-lg z-[10000000000000] flex flex-col rounded-xl`}>
        <button
          onClick={zoomIn}
          className="text-3xl p-2 px-4 bg-[#F9FAFB] text-black hover:cursor-pointer hover:bg-purple-600 rounded-t-xl"
        >
          +
        </button>
        <hr className="border-t border-gray-500" />
        <button
          onClick={zoomOut}
          className="text-3xl p-2 px-2 bg-[#F9FAFB] text-black hover:cursor-pointer hover:bg-purple-600 rounded-b-xl"
        >
          -
        </button>
      </div>
    );
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

        {zones && (
          <GeoJSON
            data={zones}
            style={defaultStyle}
            onEachFeature={onEachFeature}
          />
        )}
        <CustomZoomControl />
      </MapContainer>

      <div
        style={{
          ...cutoutStyle,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "transparent",
            border: "2px solid white",
            ...cutoutPosition,
          }}
        />
      </div>
    </div>
  );
};

export default GeneralMap;