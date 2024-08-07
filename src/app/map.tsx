"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import { MapMarkers } from "@/app/map-markers";

const zoom = 16;
const coordinates: LatLngExpression = [49.2827, -123.1207];

export function Map() {
  return (
    <div className="h-full z-0">
      <MapContainer
        center={coordinates}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers />
      </MapContainer>
    </div>
  );
}
