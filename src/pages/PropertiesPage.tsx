import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GridIcon, List, Map, ChevronLeft, ChevronRight, GitCompare as Compare } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import PropertySearchFilters from '../components/PropertySearchFilters';
import PropertyComparison from '../components/PropertyComparison';
import { FilterOptions, Property, ViewMode, SortOption } from '../types';

const PropertiesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<Property[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  const propertiesPerPage = 6;
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProperties');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
  }, [favorites]);
  
  const handleFilterChange = (filters: FilterOptions) => {
    let results = [...properties];
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      results = results.filter(property => 
        property.title.toLowerCase().includes(searchTermLower) ||
        property.description.toLowerCase().includes(searchTermLower) ||
        property.address.toLowerCase().includes(searchTermLower) ||
        property.city.toLowerCase().includes(searchTermLower) ||
        property.state.toLowerCase().includes(searchTermLower) ||
        property.zipCode.includes(searchTermLower)
      );
    }
    
    // Filter by property type
    if (filters.propertyType.length > 0) {
      results = results.filter(property => 
        filters.propertyType.includes(property.propertyType)
      );
    }
    
    // Filter by price range
    results = results.filter(property => 
      property.price >= filters.priceMin && property.price <= filters.priceMax
    );
    
    // Filter by beds and baths
    if (filters.bedsMin > 0) {
      results = results.filter(property => property.beds >= filters.bedsMin);
    }
    
    if (filters.bathsMin > 0) {
      results = results.filter(property => property.baths >= filters.bathsMin);
    }
    
    // Filter by square feet
    results = results.filter(property => 
      property.squareFeet >= filters.squareFeetMin && property.squareFeet <= filters.squareFeetMax
    );
    
    // Sort results
    const sortedResults = sortProperties(results, sortOption);
    
    setFilteredProperties(sortedResults);
    setCurrentPage(1);
  };
  
  const sortProperties = (properties: Property[], sortBy: SortOption): Property[] => {
    const propertiesToSort = [...properties];
    
    switch (sortBy) {
      case 'price-asc':
        return propertiesToSort.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return propertiesToSort.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        // In a real app, you would sort by date added
        // For this demo, we'll just return as is
        return propertiesToSort;
    }
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value as SortOption;
    setSortOption(newSortOption);
    
    // Re-sort the filtered properties
    const sortedProperties = sortProperties(filteredProperties, newSortOption);
    setFilteredProperties(sortedProperties);
  };
  
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };
  
  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
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
  
  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Function to determine if a property is in the comparison list
  const isInComparison = (id: string) => {
    return comparisonList.some(p => p.id === id);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Properties</h1>
        
        {/* Search Filters */}
        <PropertySearchFilters onFilterChange={handleFilterChange} />
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <p className="text-gray-600 mb-3 sm:mb-0">
            <span className="font-medium">{filteredProperties.length}</span> properties found
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Sort By */}
            <div className="w-full sm:w-auto">
              <select 
                value={sortOption}
                onChange={handleSortChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => handleViewModeChange('grid')}
                aria-label="Grid view"
              >
                <GridIcon size={18} />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => handleViewModeChange('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'map' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => handleViewModeChange('map')}
                aria-label="Map view"
              >
                <Map size={18} />
              </button>
            </div>
            
            {/* Compare Button */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              disabled={comparisonList.length < 2}
              className={`flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                comparisonList.length < 2
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <Compare size={18} className="mr-1" />
              Compare ({comparisonList.length})
            </button>
          </div>
        </div>
        
        {/* Property Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProperties.map(property => (
              <div key={property.id} className="relative">
                <PropertyCard 
                  property={property} 
                  isFavorite={favorites.includes(property.id)}
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
        )}
        
        {/* Property List */}
        {viewMode === 'list' && (
          <div className="space-y-6 mb-8">
            {currentProperties.map(property => (
              <div 
                key={property.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleToggleFavorite(property.id)}
                      className={`p-2 rounded-full ${
                        favorites.includes(property.id) 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-white text-gray-500 hover:text-primary-600'
                      } transition-colors duration-300 shadow-sm`}
                      aria-label={favorites.includes(property.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill={favorites.includes(property.id) ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 flex-grow flex flex-col md:flex-row">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-sm">
                        {property.city}, {property.state}
                      </span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                      {property.description.substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex flex-col justify-between md:w-48 md:ml-4 mt-4 md:mt-0">
                    <div>
                      <p className="text-2xl font-bold text-primary-600 mb-2">
                        ${property.price.toLocaleString()}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-gray-500 mr-1"
                          >
                            <path d="M2 22v-5h5" />
                            <path d="M2 17v-5h10" />
                            <path d="M2 7a5 5 0 0 1 9-2" />
                            <path d="M22 22v-5h-5" />
                            <path d="M22 17v-5H12" />
                            <path d="M22 7a5 5 0 0 0-9-2" />
                          </svg>
                          <span className="text-sm font-medium">{property.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-gray-500 mr-1"
                          >
                            <path d="M9 6H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1" />
                            <path d="M9 6v11" />
                            <path d="M14 10h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-5" />
                            <path d="M9 3v3" />
                            <path d="M14 3v7" />
                          </svg>
                          <span className="text-sm font-medium">{property.baths}</span>
                        </div>
                        <div className="flex items-center">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-gray-500 mr-1"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                          </svg>
                          <span className="text-sm font-medium">{property.squareFeet.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a 
                        href={`/property/${property.id}`} 
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors duration-300 flex-1 text-center"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleToggleComparison(property)}
                        className={`p-2 rounded-md ${
                          isInComparison(property.id)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors duration-300`}
                        aria-label={isInComparison(property.id) ? 'Remove from comparison' : 'Add to comparison'}
                      >
                        <Compare size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-gray-200 rounded-lg overflow-hidden h-[70vh] flex items-center justify-center mb-8">
            <div className="text-center p-6">
              <Map size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Map View</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                In a real application, an interactive map would be displayed here, showing the locations of all properties with clickable markers.
              </p>
            </div>
          </div>
        )}
        
        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center mb-8">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mx-auto text-gray-400 mb-4"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-4">
              No properties match your current search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => navigate('/properties')}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`w-10 h-10 rounded-md ${
                  currentPage === page 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
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

export default PropertiesPage;