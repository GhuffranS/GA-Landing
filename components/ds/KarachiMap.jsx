"use client";

import { useEffect, useRef } from "react";

// Install clusters across Karachi: [lat, lng, count, spread] — ported from
// the previous landing page. Pins are jittered around each cluster centre.
const CLUSTERS = [
  [24.818, 67.0815, 18, 0.018],
  [24.787, 67.064, 14, 0.016],
  [24.938, 67.026, 13, 0.02],
  [24.896, 66.914, 12, 0.022],
  [24.924, 67.105, 9, 0.019],
  [24.862, 67.054, 8, 0.014],
  [24.81, 67.029, 7, 0.013],
  [24.8607, 67.0099, 5, 0.011],
  [24.819, 67.126, 7, 0.018],
  [24.965, 67.11, 7, 0.022],
];

function gauss() {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function initMap(el) {
  const L = window.L;
  const map = L.map(el, {
    center: [24.89, 67.045],
    zoom: window.innerWidth < 640 ? 10 : 11,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const pinIcon = L.divIcon({
    className: "",
    html: '<div style="width:11px;height:11px;border-radius:50%;background:#18181b;border:2px solid #fff;box-shadow:0 1px 5px rgba(24,24,27,.45);"></div>',
    iconSize: [11, 11],
    iconAnchor: [5, 5],
  });

  CLUSTERS.forEach(([lat, lng, count, spread]) => {
    for (let i = 0; i < count; i++) {
      L.marker(
        [lat + gauss() * spread * 0.55, lng + gauss() * spread * 0.65],
        { icon: pinIcon }
      ).addTo(map);
    }
  });
}

export default function KarachiMap() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    // Leaflet loads lazily, only when the map scrolls near the viewport
    const load = () => {
      if (el.dataset.loaded) return;
      el.dataset.loaded = "1";
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (window.L) {
        if (!cancelled) initMap(el);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => { if (!cancelled) initMap(el); };
      document.head.appendChild(script);
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            obs.disconnect();
            load();
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(el);
      return () => { cancelled = true; io.disconnect(); };
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return <div ref={ref} className="karachi-map" role="img" aria-label="Map of APC Solar installations across Karachi" />;
}
