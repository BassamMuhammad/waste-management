"use client";

import "leaflet-polylinedecorator";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MarkerComp } from "./MarkerComp";
import { useEffect } from "react";

function ChangeView({ updateMap, setUpdateMap, center, zoom }) {
  if (updateMap) {
    const map = useMap();
    map.setView(center, zoom);
    setTimeout(() => {
      setUpdateMap(false);
    }, 10);
  }
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
