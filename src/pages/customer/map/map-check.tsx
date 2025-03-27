import { useState, useEffect, useCallback } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapCheck = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const markers = {
        geocode: [latitude ?? 0, longitude ?? 0] as [number, number],
        popUp: "Hello, I am pop up 1"
    };

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
            });
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    return (
        <MapContainer zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <MapUpdater latitude={latitude} longitude={longitude} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {latitude && longitude && (
                <Marker position={markers.geocode}>
                    <Popup>{markers.popUp}</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

const MapUpdater = ({ latitude, longitude }: { latitude: number | null; longitude: number | null }) => {
    const map = useMap();
    const [prevLat, setPrevLat] = useState<number | null>(null);
    const [prevLng, setPrevLng] = useState<number | null>(null);

    // Use useCallback to avoid unnecessary rerenders when latitude and longitude don't change
    const updateMapView = useCallback(() => {
        if (latitude !== null && longitude !== null && (latitude !== prevLat || longitude !== prevLng)) {
            console.log("Updating map view", latitude, longitude);
            map.setView([latitude, longitude], map.getZoom());
            setPrevLat(latitude);
            setPrevLng(longitude);
        }
    }, [latitude, longitude, prevLat, prevLng, map]);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            updateMapView();
        }
    }, [latitude, longitude, updateMapView]);

    return null;
};

export default MapCheck;
