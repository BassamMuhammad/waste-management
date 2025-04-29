"use client";

import "leaflet-polylinedecorator";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MarkerComp } from "./MarkerComp";
import { useEffect } from "react";

function ChangeView({ updateMap, setUpdateMap, center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (updateMap) {
      if (!map) return;
      map.setView(center, zoom);
      setTimeout(() => {
        setUpdateMap(false);
      }, 10);
    }
  }, [updateMap, map]);

  return null;
}

const arrow = [
  {
    offset: 10,
    repeat: 50,
    symbol: L.Symbol.arrowHead({
      pixelSize: 15,
      polygon: false,
      pathOptions: { stroke: true },
    }),
  },
];

function PolylineDecorator({ patterns, polyline }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    L.polyline(polyline).addTo(map);
    L.polylineDecorator(polyline, {
      patterns,
    }).addTo(map);
  }, [map]);

  return null;
}

export default function MapComp({
  updateMap,
  setUpdateMap,
  center,
  markers,
  setMarkers,
  polyline,
}) {
  return (
    <MapContainer
      center={center}
      style={{ height: "100vh", width: "100vw" }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <ChangeView
        center={center}
        zoom={13}
        updateMap={updateMap}
        setUpdateMap={setUpdateMap}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerComp markers={markers} setMarkers={setMarkers} />
      {polyline && <PolylineDecorator polyline={polyline} patterns={arrow} />}
    </MapContainer>
  );
}
