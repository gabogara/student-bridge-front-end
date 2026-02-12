import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = ({ resources, selectedResource, setSelectedResource }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const buildPopupHtml = (resource) => {
    const addressLine = `${resource.address}, ${resource.city}`;

    return `
      <div>
        <h3>${resource.title}</h3>
        <p><strong>${resource.category}</strong></p>
        <p>${addressLine}</p>
        <p>Details: /resources/${resource.id}</p>
      </div>
    `;
  };

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
      // limpiar markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // remove map and resetear ref
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Create / refresh markers when resources change
  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapRef.current.getCanvasContainer) return;

    // remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasPoints = false;

    resources.forEach((resource) => {
      const lat = Number(resource.lat);
      const lng = Number(resource.lng);

      // si lat/lng no son num validos ignora
      if (Number.isNaN(lat) || Number.isNaN(lng)) return;

      hasPoints = true;
      bounds.extend([lng, lat]);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        buildPopupHtml(resource)
      );

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      marker.getElement().addEventListener("click", () => {
        setSelectedResource(resource);
      });
      markersRef.current.push(marker);
    });

    if (hasPoints) {
      try {
        mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      } catch (err) {
        console.log("fitBounds error:", err);
      }
    }
  }, [resources, setSelectedResource]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapView;
