import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, GitCompare as Compare } from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types';
import PropertyCard from '../components/PropertyCard';
import PropertyComparison from '../components/PropertyComparison';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [comparisonList, setComparisonList] = useState<Property[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);
  
  // Filter properties based on favorites
  useEffect(() => {
    const filtered = properties.filter(property => favorites.includes(property.id));
    setFavoriteProperties(filtered);
  }, [favorites]);
  
  const handleToggleFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteProperties', JSON.stringify(updatedFavorites));
  };
  
  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favoriteProperties', JSON.stringify([]));
  };
  
  const handleToggleComparison = (property: Property) => {
    setComparisonList(prev => {
      // Check if the property is already in the comparison list
      const isAlreadyAdded = prev.some(p => p.id === property.id);
      
      if (isAlreadyAdded) {
        // Remove from comparison
        return prev.filter(p => p.id !== property.id);
      } else {
        // Add to comparison (limit to 3 properties)
        if (prev.length >= 3) {
          // If already at limit, remove the first one (oldest added)
          return [...prev.slice(1), property];
        } else {
          return [...prev, property];
        }
      }
    });
    
    // Show comparison panel if adding a property
    if (!comparisonList.some(p => p.id === property.id)) {
      setShowComparison(true);
    }
  };
  
  const removeFromComparison = (id: string) => {
    setComparisonList(prev => prev.filter(p => p.id !== id));
    
    // Hide comparison panel if no properties left
    if (comparisonList.length <= 1) {
      setShowComparison(false);
    }
  };
  
  // Function to determine if a property is in the comparison list
  const isInComparison = (id: string) => {
    return comparisonList.some(p => p.id === id);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Favorite Properties
            </h1>
            <p className="text-gray-600">
              You have {favoriteProperties.length} saved properties
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            {favoriteProperties.length > 0 && (
              <>
                <button
                  onClick={clearAllFavorites}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  <Trash2 size={18} className="mr-2" />
                  Clear All
                </button>
                
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  disabled={comparisonList.length < 2}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                    comparisonList.length < 2
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <Compare size={18} className="mr-2" />
                  Compare ({comparisonList.length})
                </button>
              </>
            )}
          </div>
        </div>
        
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map(property => (
              <div key={property.id} className="relative">
                <PropertyCard 
                  property={property} 
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
                <button
                  onClick={() => handleToggleComparison(property)}
                  className={`absolute bottom-4 right-4 p-2 rounded-full ${
                    isInComparison(property.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } shadow-sm transition-colors duration-300`}
                  aria-label={isInComparison(property.id) ? 'Remove from comparison' : 'Add to comparison'}
                >
                  <Compare size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Saved Properties</h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any properties yet. Browse our listings and click the heart icon to save properties you're interested in.
            </p>
            <Link 
              to="/properties" 
              className="inline-block px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors duration-300"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </div>
      
      {/* Property Comparison Panel */}
      {showComparison && comparisonList.length >= 2 && (
        <PropertyComparison 
          properties={comparisonList} 
          onRemove={removeFromComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;