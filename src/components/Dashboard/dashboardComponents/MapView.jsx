import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = (props) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!import.meta.env.VITE_MAPBOX_TOKEN) {
      console.log("Missing VITE_MAPBOX_TOKEN in .env");
      return;
    }

    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-122.4194, 37.7749],
      zoom: 10,
    });

    mapRef.current = map;

    requestAnimationFrame(() => {
      if (mapRef.current) mapRef.current.resize();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Create / refresh markers when resources change
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasPoints = false;

    props.resources.forEach((resource) => {
      const lat = Number(resource.lat);
      const lng = Number(resource.lng);

      if (Number.isNaN(lat) || Number.isNaN(lng)) return;

      hasPoints = true;
      bounds.extend([lng, lat]);

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
      markersRef.current.push(marker);
    });

    if (hasPoints) {
      try {
        mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      } catch (err) {
        console.log("fitBounds error:", err);
      }
    }

    requestAnimationFrame(() => {
      if (mapRef.current) mapRef.current.resize();
    });
  }, [props.resources]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapView;
