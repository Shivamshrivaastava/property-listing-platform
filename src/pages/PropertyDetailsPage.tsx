import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, MapPin, Calendar, Ruler, Bath, Bed, Heart, Mail, Phone, ArrowLeft, Share2, Printer, Building, Clock, GitCompare as Compare } from 'lucide-react';
import { getPropertyById } from '../data/properties';
import { formatPrice, formatNumber } from '../utils/formatters';
import PropertyImageGallery from '../components/PropertyImageGallery';
import PropertyFeatures from '../components/PropertyFeatures';
import PropertyMap from '../components/PropertyMap';
import ContactForm from '../components/ContactForm';
import AgentCard from '../components/AgentCard';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = getPropertyById(id || '');
  
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Check if property is in favorites
    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites && property) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(favorites.includes(property.id));
    }
    
    // Update document title
    if (property) {
      document.title = `${property.title} | HomeFinder`;
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      document.title = 'HomeFinder';
    };
  }, [property]);
  
  const handleToggleFavorite = () => {
    if (!property) return;
    
    const savedFavorites = localStorage.getItem('favoriteProperties');
    let favorites: string[] = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter(item => item !== property.id);
    } else {
      favorites.push(property.id);
    }
    
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };
  
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Home className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/properties" 
            className="inline-block px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors duration-300"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary-600 transition-colors duration-300">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/properties" className="hover:text-primary-600 transition-colors duration-300">
              Properties
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{property.title}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                  isFavorite 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className="mr-2" fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              
              <button
                className="p-2 bg-white text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300"
                aria-label="Share property"
              >
                <Share2 size={18} />
              </button>
              
              <button
                className="p-2 bg-white text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300"
                aria-label="Print property details"
              >
                <Printer size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <PropertyImageGallery images={property.images} title={property.title} />
            
            {/* Property Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-primary-600">
                    {formatPrice(property.price)}
                  </h2>
                  <p className="text-gray-500">Price</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-2">
                      <Bed size={20} />
                    </div>
                    <span className="font-medium">{property.beds}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-2">
                      <Bath size={20} />
                    </div>
                    <span className="font-medium">{property.baths}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-2">
                      <Ruler size={20} />
                    </div>
                    <span className="font-medium">{formatNumber(property.squareFeet)}</span>
                    <span className="text-sm text-gray-500">Sq Ft</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-2">
                      <Building size={20} />
                    </div>
                    <span className="font-medium">{property.yearBuilt}</span>
                    <span className="text-sm text-gray-500">Year Built</span>
                  </div>
                </div>
              </div>
              
              <hr className="my-6" />
              
              {/* Property Description */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>
            
            {/* Property Features */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <PropertyFeatures features={property.features} />
            </div>
            
            {/* Property Location */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <PropertyMap 
                latitude={property.latitude} 
                longitude={property.longitude} 
                address={`${property.address}, ${property.city}, ${property.state}`}
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Agent Contact */}
            <AgentCard agent={property.agent} />
            
            {/* Contact Form */}
            <ContactForm propertyId={property.id} agentName={property.agent.name} />
            
            {/* Additional Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Property Info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Home size={18} className="text-primary-600 mt-1 flex-shrink-0 mr-3" />
                  <div>
                    <p className="font-medium">Property Type</p>
                    <p className="text-gray-600">
                      {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="text-primary-600 mt-1 flex-shrink-0 mr-3" />
                  <div>
                    <p className="font-medium">Year Built</p>
                    <p className="text-gray-600">{property.yearBuilt}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={18} className="text-primary-600 mt-1 flex-shrink-0 mr-3" />
                  <div>
                    <p className="font-medium">Available</p>
                    <p className="text-gray-600">Immediately</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="text-primary-600 mt-1 flex-shrink-0 mr-3" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{property.city}, {property.state}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Link 
                  to="/properties" 
                  className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Listings
                </Link>
                
                <Link 
                  to={{
                    pathname: '/properties',
                    search: '?compare=' + property.id
                  }} 
                  className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  <Compare size={18} className="mr-2" />
                  Compare Similar Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;