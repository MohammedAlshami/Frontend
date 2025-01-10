import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { sampleTrees } from "./TreesData";
import { ZONE_HEIGHT } from "./MapStyles";

mapboxgl.accessToken =
  "process.env.NEXT_PUBLIC_MAPBOX_TOKEN || """;

export const useInitializeMap = ({
  mapContainerRef,
  mapInstance,
  setMapInstance,
  basemap,
  center,
  layers,
}) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          "google-satellite": {
            type: "raster",
            tiles: [
              // 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
              "https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png", // Satellite
              // For regular roadmap, use: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
              // For terrain, use: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
              // For hybrid, use: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            ],
            tileSize: 256,
          },
          "default-map": {
            type: "raster",
            tiles: [
              "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
              // "https://zappa-drangue-deployments-test.s3.ap-southeast-1.amazonaws.com/MyHackathonMaps/myhackatho/{z}/{x}/{y}.png", // Satellite
              // For regular roadmap, use: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
              // For terrain, use: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
              // For hybrid, use: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "default-satellite-layer",
            type: "raster",
            source: "default-map",
            minzoom: 0,
            maxzoom: 22,
          },
          {
            id: "google-satellite-layer",
            type: "raster",
            source: "google-satellite",
            minzoom: 0,
            maxzoom: 22,
          },
        ],
      },
      center,
      zoom: 19,
      pitch: 0,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: false }),
      "top-right"
    );

    map.on("load", () => {
      setMapInstance(map);

      map.addSource("trees", { type: "geojson", data: sampleTrees });

      map.addLayer({
        id: "trees",
        type: "circle",
        source: "trees",
        paint: {
          "circle-radius": 6,
          "circle-stroke-color": "#000",
          "circle-stroke-width": 0.1,
          "circle-color": [
            "match",
            ["get", "ripeness"],
            "ripe",
            "#2ECC71",
            "not ripe",
            "#E74C3C",
            "not checked",
            "#F1C40F",
            "#BDC3C7",
          ],
        },
      });

      //   layers?.forEach((layer) => map.addLayer(layer));
    });

    return () => map.remove();
  }, [basemap, center, layers, mapContainerRef, setMapInstance]);
};

export const useZoneInteractions = ({
  mapInstance,
  zones,
  selectedZone,
  setSelectedZone,
  zonesVisible,
}) => {
  useEffect(() => {
    if (!mapInstance || !zones) return;

    mapInstance.addSource("zones", { type: "geojson", data: zones });

    mapInstance.addLayer({
      id: "zones-outline",
      type: "line",
      source: "zones",
      paint: {
        "line-color": "#FFD700",
        "line-width": 3,
        "line-opacity": 0.8,
      },
    });

    const handleZoneClick = (zone) => {
      if (selectedZone) {
        mapInstance.setLayoutProperty("zones-3d", "visibility", "none");
        mapInstance.setFilter("trees", ["==", "zoneId", ""]);
      }

      if (selectedZone === zone) {
        setSelectedZone(null);
        mapInstance.setLayoutProperty(
          "zones-3d",
          "visibility",
          zonesVisible ? "visible" : "none"
        );
        mapInstance.setFilter("trees", ["==", "zoneId", ""]);
      } else {
        setSelectedZone(zone);
        mapInstance.setLayoutProperty("zones-3d", "visibility", "visible");
        mapInstance.setFilter("zones-3d", [
          "==",
          ["get", "zoneId"],
          zone.properties.zoneId,
        ]);
        mapInstance.setFilter("trees", [
          "==",
          "zoneId",
          zone.properties.zoneId,
        ]);
      }
    };

    mapInstance.on("click", "zones-3d", (e) => {
      const clickedZone = e.features[0];
      handleZoneClick(clickedZone);

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>Zone Height:</strong> ${ZONE_HEIGHT}m`)
        .addTo(mapInstance);
    });
  }, [mapInstance, zones, selectedZone, setSelectedZone, zonesVisible]);
};

export const useTreeInteractions = ({ mapInstance }) => {
  useEffect(() => {
    if (!mapInstance) return;

    const treePopup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    mapInstance.on("mouseenter", "trees", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const { treeType, height } = e.features[0].properties;

      treePopup
        .setLngLat(coordinates)
        .setHTML(
          `<strong>Type:</strong><br><strong>Height:</strong>`
        )
        .addTo(mapInstance);
    });

    mapInstance.on("mouseleave", "trees", () => {
      treePopup.remove();
    });
  }, [mapInstance]);
};
