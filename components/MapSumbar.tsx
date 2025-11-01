"use client";

import React from "react";

type KabupatenItem = {
  key: string;
  name: string;
  lat: number;
  lng: number;
  color: string; // tailwind-like token e.g., bg-blue-500
};

const colorHexMap: Record<string, string> = {
  "bg-blue-500": "#3B82F6",
  "bg-green-500": "#22C55E",
  "bg-purple-500": "#A855F7",
  "bg-orange-500": "#F97316",
  "bg-teal-500": "#14B8A6",
  "bg-pink-500": "#EC4899",
  "bg-indigo-500": "#6366F1",
  "bg-red-500": "#EF4444",
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
      zoom: 8,
      scrollWheelZoom: false,
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

  // Render/Update markers whenever items or selectedKey change
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
      const fill = colorHexMap[kab.color] ?? "#F97316";
      const isSel = selectedKey === kab.key;

      const marker = L.circleMarker([kab.lat, kab.lng], {
        radius: isSel ? 16 : 13,
        weight: 3,
        color: isSel ? "#FACC15" : "#FFFFFF",
        fillColor: fill,
        fillOpacity: 0.9,
      }).addTo(layer);

      marker.bindTooltip(kab.name, { direction: "top", offset: [0, -8], opacity: 1, permanent: false });
      marker.on("click", () => onSelect(kab.key));
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
