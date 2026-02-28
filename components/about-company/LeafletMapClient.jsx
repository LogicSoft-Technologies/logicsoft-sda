"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";

// ── Fix Leaflet's broken default icon paths in Next.js ────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Logicsoft custom SVG icon ─────────────────────────────────────────────────
const makeSvgIcon = (color = "#1f6fb2") => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='44' height='54' viewBox='0 0 44 54'>
      <defs>
        <filter id='shadow' x='-30%' y='-20%' width='160%' height='160%'>
          <feDropShadow dx='0' dy='3' stdDeviation='3' flood-color='${color}' flood-opacity='0.35'/>
        </filter>
      </defs>
      <!-- Pin body -->
      <path d='M22 2C12.06 2 4 10.06 4 20c0 14 18 32 18 32S40 34 40 20C40 10.06 31.94 2 22 2z'
        fill='${color}' filter='url(#shadow)'/>
      <!-- Inner ring -->
      <circle cx='22' cy='20' r='8' fill='white' opacity='0.9'/>
      <!-- Center dot -->
      <circle cx='22' cy='20' r='4' fill='${color}'/>
    </svg>
  `;
  return new L.Icon({
    iconUrl:    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    iconSize:   [44, 54],
    iconAnchor: [22, 54],
    popupAnchor:[0, -54],
  });
};

const ICONS = {
  "#1f6fb2": makeSvgIcon("#1f6fb2"),
  "#059669": makeSvgIcon("#059669"),
  "#7c3aed": makeSvgIcon("#7c3aed"),
};

const getIcon = (color) => ICONS[color] ?? makeSvgIcon(color);

// ── Inner component that wires up mapRef via useMap ───────────────────────────
function MapRefBridge({ mapRef }) {
  const map = useMap();
  useEffect(() => {
    if (mapRef) mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function LeafletMapClient({ mapRef, offices }) {
  const center = [8.4, 6.2]; // Nigeria centred

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ width: "100%", height: "420px" }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      {/* Wire mapRef without the deprecated whenCreated */}
      <MapRefBridge mapRef={mapRef} />

      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Corporate Map">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Street Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {offices.map((office, i) => (
        <Marker
          key={i}
          position={office.position}
          icon={getIcon(office.accentColor ?? "#1f6fb2")}
        >
          <Popup>
            {/* Custom styled popup */}
            <div style={{
              fontFamily: "inherit",
              minWidth: "180px",
              padding: "4px 2px",
              lineHeight: 1.5,
            }}>
              <p style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#1f3a5f",
                marginBottom: "2px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {office.type ?? "Office"}
              </p>
              <p style={{ fontSize: "15px", fontWeight: 700, color: office.accentColor ?? "#1f6fb2", marginBottom: "4px" }}>
                {office.city}
              </p>
              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "2px" }}>
                {office.address}
              </p>
              {office.phone && (
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>{office.phone}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}