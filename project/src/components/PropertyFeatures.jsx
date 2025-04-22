import React from 'react';
import { CheckCircle } from 'lucide-react';

const PropertyFeatures = ({ features }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center p-2 bg-gray-50 rounded-md"
          >
            <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
