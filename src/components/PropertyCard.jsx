import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { formatPrice, formatNumber, truncateText } from '../utils/formatters';


const PropertyCard= ({ 
  property, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <Link 
      to={`/property/${property.id}`} 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden group">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-3">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full ${
              isFavorite 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-500 hover:text-primary-600'
            } transition-colors duration-300 shadow-sm`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 m-3">
          <span className="px-2 py-1 bg-primary-600 text-white text-sm font-medium rounded">
            {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {truncateText(property.title, 40)}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 flex-grow">
          {truncateText(property.description, 100)}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center">
            <Bed size={16} className="text-gray-500 mr-1" />
            <span className="text-sm font-medium">{property.beds} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="text-gray-500 mr-1" />
            <span className="text-sm font-medium">{property.baths} Baths</span>
          </div>
          <div className="flex items-center">
            <Square size={16} className="text-gray-500 mr-1" />
            <span className="text-sm font-medium">{formatNumber(property.squareFeet)} ft²</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-xl font-bold text-primary-600">
            {formatPrice(property.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;