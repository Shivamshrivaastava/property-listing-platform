import React from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice, formatNumber } from '../utils/formatters';

const PropertyComparison = ({ 
  properties, 
  onRemove, 
  onClose 
}) => {
  if (properties.length === 0) {
    return null;
  }
  
  // Get all unique features across all properties
  const allFeatures = [...new Set(properties.flatMap((p) => p.features))].sort();

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg rounded-t-xl z-40 max-h-[80vh] overflow-auto">
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Compare Properties ({properties.length})</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close comparison"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-white z-10 min-w-[150px]">
                Property
              </th>
              {properties.map((property) => (
                <th key={property.id} className="px-6 py-3 text-center min-w-[250px]">
                  <div className="relative">
                    <button
                      onClick={() => onRemove(property.id)}
                      className="absolute -top-1 right-0 text-gray-400 hover:text-red-500"
                      aria-label={`Remove ${property.title} from comparison`}
                    >
                      <X size={16} />
                    </button>
                    <div className="h-24 mb-2">
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="h-full mx-auto object-cover rounded-md"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {property.title}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {property.city}, {property.state}
                    </div>
                    <div className="text-lg font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Basic Info */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Property Type
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Year Built
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {property.yearBuilt}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Bedrooms
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {property.beds}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Bathrooms
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {property.baths}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white">
                Square Feet
              </td>
              {properties.map((property) => (
                <td key={property.id} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                  {formatNumber(property.squareFeet)}
                </td>
              ))}
            </tr>
            
            {/* Features */}
            <tr>
              <td colSpan={properties.length + 1} className="px-6 py-4 bg-gray-50 text-sm font-medium text-gray-900 sticky left-0">
                Features & Amenities
              </td>
            </tr>
            
            {allFeatures.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-inherit">
                  {feature}
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="px-6 py-3 text-center">
                    {property.features.includes(feature) ? (
                      <CheckCircle size={18} className="text-green-500 mx-auto" />
                    ) : (
                      <XCircle size={18} className="text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyComparison;
