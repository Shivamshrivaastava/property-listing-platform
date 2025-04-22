import React from 'react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  // Take only the first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties that stand out for their 
            location, features, or value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/properties" 
            className="inline-block px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;