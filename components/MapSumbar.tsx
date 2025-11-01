"use client";

import React from "react";

type KabupatenItem = {
  key: string;
  name: string;
  lat: number;
  lng: number;
  color: string; // hex color from database e.g., #3b82f6
  itemCount?: number; // Number of budaya items in this kabupaten
};

export default function MapSumbar({
  items,
  onSelect,
  selectedKey,
}: {
  items: KabupatenItem[];
  onSelect: (key: string) => void;
  selectedKey?: string | null;
}) {
  const center: [number, number] = [-0.7399, 100.3835]; // sekitar Sumbar

  const [mounted, setMounted] = React.useState(false);
  const [Lmods, setLmods] = React.useState<any | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<any | null>(null);
  const markersLayerRef = React.useRef<any | null>(null);

  // Mount flag and CSS injection (client only)
  React.useEffect(() => {
    setMounted(true);

    const cssId = "leaflet-css";
    if (typeof document !== "undefined" && !document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Add custom styles for pin markers and tooltips
    const styleId = "leaflet-custom-pin";
    if (typeof document !== "undefined" && !document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .custom-pin-icon {
          background: transparent !important;
          border: none !important;
          z-index: 1000 !important;
        }
        .custom-pin-icon svg {
          cursor: pointer;
          transition: all 0.2s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .custom-pin-icon:hover svg {
          transform: scale(1.15);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
        }
        .custom-tooltip {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 2px solid rgba(0, 0, 0, 0.1) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          font-family: inherit !important;
        }
        .custom-tooltip::before {
          border-top-color: rgba(255, 255, 255, 0.98) !important;
        }
        .leaflet-tooltip-top::before {
          border-top-color: rgba(255, 255, 255, 0.98) !important;
        }
      `;
      document.head.appendChild(style);
    }

    let cancelled = false;
    import("leaflet")
      .then((L) => {
        if (!cancelled) setLmods(L);
      })
      .catch(() => {
        // ignore
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize map once
  React.useEffect(() => {
    if (!mounted || !Lmods || !containerRef.current) return;
    if (mapRef.current) return; // already initialized

    const L = Lmods.default || Lmods;

    const map = L.map(containerRef.current, {
      center,
      zoom: 7.5, // Slightly zoomed out for better spacing
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      try {
        map.remove();
      } catch {}
      mapRef.current = null;
    };
  }, [mounted, Lmods]);

  // Render/Update markers with custom colored pins and permanent labels
  React.useEffect(() => {
    if (!mapRef.current || !Lmods) return;
    const L = Lmods.default || Lmods;

    // Clear previous layer
    if (markersLayerRef.current) {
      markersLayerRef.current.remove();
      markersLayerRef.current = null;
    }

    const layer = L.layerGroup();

    items.forEach((kab: any) => {
      const fill = kab.color ?? "#F97316";
      const isSel = selectedKey === kab.key;
      const itemCount = kab.itemCount || 0;

      // Create custom colored pin icon using divIcon
      const pinIcon = L.divIcon({
        className: 'custom-pin-icon',
        html: `
          <div style="position: relative; width: 30px; height: 40px;">
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow-${kab.key}" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
              </defs>
              <path 
                d="M15 0C8.373 0 3 5.373 3 12c0 8.25 12 28 12 28s12-19.75 12-28c0-6.627-5.373-12-12-12z" 
                fill="${fill}" 
                stroke="${isSel ? '#FACC15' : '#FFFFFF'}" 
                stroke-width="${isSel ? '3' : '2'}"
                filter="url(#shadow-${kab.key})"
              />
              <circle cx="15" cy="12" r="5" fill="white" opacity="0.9"/>
              <text x="15" y="15" text-anchor="middle" font-size="10" font-weight="bold" fill="${fill}">${itemCount}</text>
            </svg>
          </div>
        `,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
      });

      const marker = L.marker([kab.lat, kab.lng], { icon: pinIcon }).addTo(layer);

      // Tooltip on hover
      const tooltipContent = `<div style="text-align: center;"><strong>${kab.name}</strong><br/><span style="font-size: 11px; color: #666;">${itemCount} item budaya</span></div>`;
      marker.bindTooltip(tooltipContent, { 
        direction: "top", 
        offset: [0, -40], 
        opacity: 0.95,
        className: "custom-tooltip"
      });

      // Click handler for marker
      marker.on("click", () => onSelect(kab.key));
      
      // Hover effects
      marker.on("mouseover", () => {
        if (!isSel) {
          marker.setIcon(L.divIcon({
            className: 'custom-pin-icon',
            html: `
              <div style="position: relative; width: 30px; height: 40px;">
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="shadow-hover-${kab.key}" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.4"/>
                    </filter>
                  </defs>
                  <path 
                    d="M15 0C8.373 0 3 5.373 3 12c0 8.25 12 28 12 28s12-19.75 12-28c0-6.627-5.373-12-12-12z" 
                    fill="${fill}" 
                    stroke="#FACC15" 
                    stroke-width="3"
                    filter="url(#shadow-hover-${kab.key})"
                  />
                  <circle cx="15" cy="12" r="5" fill="white" opacity="0.9"/>
                  <text x="15" y="15" text-anchor="middle" font-size="10" font-weight="bold" fill="${fill}">${itemCount}</text>
                </svg>
              </div>
            `,
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
          }));
        }
      });
      
      marker.on("mouseout", () => {
        if (!isSel) {
          marker.setIcon(pinIcon);
        }
      });
    });

    layer.addTo(mapRef.current);
    markersLayerRef.current = layer;
  }, [items, selectedKey, Lmods, onSelect]);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div ref={containerRef} style={{ height: 600, width: "100%" }} className="relative bg-gray-100" />
  );
}
