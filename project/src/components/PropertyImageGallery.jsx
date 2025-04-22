import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const PropertyImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <div className="mb-8" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Gallery */}
      <div className="relative rounded-lg overflow-hidden h-[400px] group cursor-pointer" onClick={toggleLightbox}>
        <img 
          src={images[currentIndex]} 
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:bg-opacity-100 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            toggleLightbox();
          }}
        >
          <Maximize2 size={18} />
        </button>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:bg-opacity-100 shadow-md focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:bg-opacity-100 shadow-md focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Current image indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 px-3 py-1 rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
              currentIndex === index ? 'ring-2 ring-primary-600' : 'hover:opacity-80'
            }`}
            onClick={() => goToImage(index)}
          >
            <img 
              src={image} 
              alt={`${title} - Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" 
          onClick={toggleLightbox}
        >
          <div className="relative max-w-6xl max-h-screen p-4">
            <img 
              src={images[currentIndex]} 
              alt={`${title} - Full Size ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-75 rounded-full text-gray-900 hover:bg-opacity-100"
              onClick={toggleLightbox}
            >
              <X size={24} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-75 rounded-full text-gray-900 hover:bg-opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-75 rounded-full text-gray-900 hover:bg-opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 px-4 py-2 rounded-md text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
