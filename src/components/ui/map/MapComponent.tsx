import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DEFAULT_BASEMAP = "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";

const GeneralMap = ({ basemap = DEFAULT_BASEMAP, layers, center, zones }) => {
  const mapRef = useRef(null);
  const MAXZOOM = 22;

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
            localStorage.setItem(key, JSON.stringify(cacheData));
            resolve(reader.result);
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
          style={(feature) => ({
            color: "yellow",
            weight: 2,
            fillColor: "yellow",
            fillOpacity: 0.5,
          })}
        />
      </MapContainer>
    </div>
  );
};

export default GeneralMap;
