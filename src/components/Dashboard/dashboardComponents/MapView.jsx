import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapView;
