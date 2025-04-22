import React from 'react';
import { MapPin } from 'lucide-react';

const PropertyMap = ({ latitude, longitude, address }) => {
  // In a real app, you would use a map library like Leaflet or Google Maps
  // For this demo, we'll create a placeholder with the coordinates
  
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Location</h3>
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-64 bg-gray-300 flex items-center justify-center">
          <div className="absolute">
            <MapPin size={40} className="text-primary-600" />
            <div className="mt-2 bg-white px-3 py-2 rounded-lg shadow-md">
              <p className="text-gray-700 font-medium text-sm">{address}</p>
              <p className="text-gray-500 text-xs mt-1">Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}</p>
            </div>
          </div>
          <p className="text-gray-500 italic">
            Interactive map would be displayed here in a real application.
          </p>
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
