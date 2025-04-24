import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

// Fix Leaflet's default marker not displaying correctly in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude, address }) => {
  const center: LatLngExpression = [latitude, longitude];

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Location</h3>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-64">
          <MapContainer
            center={center}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={center} icon={customIcon}>
              <Popup>
                <strong>{address}</strong><br />
                Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="p-4 bg-gray-100">
          <h4 className="font-medium text-gray-800 mb-2">Nearby Amenities:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>Schools within 1 mile</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>Parks within 0.5 miles</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              <span>Grocery stores within 1 mile</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              <span>Public transit within 0.3 miles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
