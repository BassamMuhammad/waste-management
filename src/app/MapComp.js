"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapComp({center, markers}) {
  return (
    <MapContainer center={center}
    style={{ height: "100vh", width: "100vw" }} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              {marker.time}
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  )
}
