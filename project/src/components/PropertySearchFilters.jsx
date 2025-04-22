import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllPropertyTypes, getMinMaxPrices, getMinMaxSquareFeet } from '../data/properties';

const PropertySearchFilters = ({ 
  onFilterChange, 
  initialFilters 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyTypes = getAllPropertyTypes();
  const { min: minPrice, max: maxPrice } = getMinMaxPrices();
  const { min: minSquareFeet, max: maxSquareFeet } = getMinMaxSquareFeet();

  const [filters, setFilters] = useState({
    propertyType: [],
    priceMin: minPrice,
    priceMax: maxPrice,
    bedsMin: 0,
    bathsMin: 0,
    squareFeetMin: minSquareFeet,
    squareFeetMax: maxSquareFeet,
    searchTerm: ''
  });
  
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Parse URL search params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const searchTerm = searchParams.get('search') || '';
    const propertyTypeParam = searchParams.get('propertyType');
    const propertyTypeArray = propertyTypeParam ? propertyTypeParam.split(',') : [];
    
    const updatedFilters = {
      ...filters,
      searchTerm,
      propertyType: propertyTypeArray,
      priceMin: Number(searchParams.get('priceMin')) || minPrice,
      priceMax: Number(searchParams.get('priceMax')) || maxPrice,
      bedsMin: Number(searchParams.get('bedsMin')) || 0,
      bathsMin: Number(searchParams.get('bathsMin')) || 0,
      squareFeetMin: Number(searchParams.get('squareFeetMin')) || minSquareFeet,
      squareFeetMax: Number(searchParams.get('squareFeetMax')) || maxSquareFeet
    };
    
    setFilters(updatedFilters);
    
    // Notify parent component
    onFilterChange(updatedFilters);
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const togglePropertyType = (type) => {
    const updatedTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type];
    
    setFilters({
      ...filters,
      propertyType: updatedTypes
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'searchTerm' ? value : Number(value)
    });
  };

  const applyFilters = () => {
    // Update URL with filter params
    const searchParams = new URLSearchParams();
    
    if (filters.searchTerm) searchParams.set('search', filters.searchTerm);
    if (filters.propertyType.length > 0) searchParams.set('propertyType', filters.propertyType.join(','));
    if (filters.priceMin !== minPrice) searchParams.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax !== maxPrice) searchParams.set('priceMax', filters.priceMax.toString());
    if (filters.bedsMin > 0) searchParams.set('bedsMin', filters.bedsMin.toString());
    if (filters.bathsMin > 0) searchParams.set('bathsMin', filters.bathsMin.toString());
    if (filters.squareFeetMin !== minSquareFeet) searchParams.set('squareFeetMin', filters.squareFeetMin.toString());
    if (filters.squareFeetMax !== maxSquareFeet) searchParams.set('squareFeetMax', filters.squareFeetMax.toString());
    
    navigate(`/properties?${searchParams.toString()}`);
    
    // Notify parent component
    onFilterChange(filters);
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      propertyType: [],
      priceMin: minPrice,
      priceMax: maxPrice,
      bedsMin: 0,
      bathsMin: 0,
      squareFeetMin: minSquareFeet,
      squareFeetMax: maxSquareFeet,
      searchTerm: ''
    };
    
    setFilters(defaultFilters);
    navigate('/properties');
    
    // Notify parent component
    onFilterChange(defaultFilters);
  };

  const toggleAdvancedFilters = () => {
    setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen);
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleInputChange}
            placeholder="Search by location, property name, or keyword..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
        </div>
      </form>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={toggleMobileFilters}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
        >
          <div className="flex items-center">
            <SlidersHorizontal size={18} className="mr-2" />
            <span>Filters</span>
          </div>
          {mobileFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filter Section - Shown on desktop or when mobile filters are toggled */}
      <div className={`${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {/* Property Type Filter */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Property Type</h3>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => togglePropertyType(type)}
                className={`px-3 py-1 rounded-md text-sm ${
                  filters.propertyType.includes(type)
                    ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Filters - Beds & Baths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Minimum Beds
            </label>
            <select
              name="bedsMin"
              value={filters.bedsMin}
              onChange={(e) => setFilters({...filters, bedsMin: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Minimum Baths
            </label>
            <select
              name="bathsMin"
              value={filters.bathsMin}
              onChange={(e) => setFilters({...filters, bathsMin: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>

        {/* Toggle for Advanced Filters */}
        <button
          type="button"
          onClick={toggleAdvancedFilters}
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4 transition-colors duration-200"
        >
          {isAdvancedFiltersOpen ? (
            <>
              <ChevronUp size={18} className="mr-1" />
              Less Filters
            </>
          ) : (
            <>
              <ChevronDown size={18} className="mr-1" />
              More Filters
            </>
          )}
        </button>

        {/* Advanced Filters */}
        {isAdvancedFiltersOpen && (
          <div className="space-y-4 mb-4 animate-fadeIn">
            {/* Price Range */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-gray-700 text-sm font-medium">
                  Price Range
                </label>
                <span className="text-sm text-gray-500">
                  ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="range"
                    name="priceMin"
                    min={minPrice}
                    max={maxPrice}
                    step={10000}
                    value={filters.priceMin}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Min</span>
                </div>
                <div>
                  <input
                    type="range"
                    name="priceMax"
                    min={minPrice}
                    max={maxPrice}
                    step={10000}
                    value={filters.priceMax}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Max</span>
                </div>
              </div>
            </div>

            {/* Square Feet Range */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-gray-700 text-sm font-medium">
                  Square Feet
                </label>
                <span className="text-sm text-gray-500">
                  {filters.squareFeetMin.toLocaleString()} - {filters.squareFeetMax.toLocaleString()} ft²
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="range"
                    name="squareFeetMin"
                    min={minSquareFeet}
                    max={maxSquareFeet}
                    step={100}
                    value={filters.squareFeetMin}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Min</span>
                </div>
                <div>
                  <input
                    type="range"
                    name="squareFeetMax"
                    min={minSquareFeet}
                    max={maxSquareFeet}
                    step={100}
                    value={filters.squareFeetMax}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">Max</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={applyFilters}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-300"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-300 flex items-center justify-center"
          >
            <X size={16} className="mr-1" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchFilters;