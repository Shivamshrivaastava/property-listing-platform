import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import { MapPin, Home, DollarSign, FileSearch } from 'lucide-react';

const HomePage= () => {
  return (
    <div>
      <HeroSection />
      
      <FeaturedProperties />
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding your dream home has never been easier. Follow these simple steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Locations</h3>
              <p className="text-gray-600">
                Explore properties in your desired neighborhoods and find the perfect location.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Home size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Properties</h3>
              <p className="text-gray-600">
                Browse through detailed listings with high-quality photos and virtual tours.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <FileSearch size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Options</h3>
              <p className="text-gray-600">
                Use our comparison tool to evaluate different properties side by side.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <DollarSign size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make an Offer</h3>
              <p className="text-gray-600">
                Contact the listing agent directly and schedule a viewing or make an offer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from homeowners who found their perfect property through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">James Davis</h4>
                  <p className="text-sm text-gray-500">Seattle, WA</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The comparison tool made it so easy to evaluate different properties. We found our dream home in just two weeks of searching!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <p className="text-sm text-gray-500">Portland, OR</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The detailed property descriptions and high-quality photos gave us a great sense of each home before we even visited. It saved us so much time!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Denver, CO</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The advanced filtering options helped us narrow down properties that matched exactly what we were looking for. The process was smooth from start to finish."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-100">
            Start browsing thousands of properties across the country and discover the perfect place to call home.
          </p>
          <a 
            href="/properties" 
            className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            Browse Properties
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;