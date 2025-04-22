import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home as HomeIcon } from 'lucide-react';
import { getAllCities } from '../data/properties';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();
  const cities = getAllCities();

  const handleSearch = (e) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append('search', searchTerm);
    if (selectedCity) searchParams.append('city', selectedCity);
    
    navigate(`/properties?${searchParams.toString()}`);
  };

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-center">
            <HomeIcon className="text-primary-400" size={40} />
            <h1 className="text-4xl md:text-6xl font-bold text-white ml-2">
              HomeFinder
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
            Find Your Dream Home Today
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Browse thousands of properties across the country. 
            Use our advanced search to find the perfect place for you.
          </p>

          {/* Search Form */}
          <form 
            className="bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center"
            onSubmit={handleSearch}
          >
            <div className="flex-1 w-full md:w-auto mb-4 md:mb-0 md:mr-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by location, property type, or keyword"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-auto mb-4 md:mb-0 md:mr-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="text-gray-400" size={20} />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Any City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;