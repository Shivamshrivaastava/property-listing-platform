import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="text-primary-400" size={24} />
              <span className="text-xl font-bold">HomeFinder</span>
            </div>
            <p className="text-gray-400 mb-4">
              Find your dream home with our comprehensive property listing platform.
              Browse through thousands of listings and connect with top real estate agents.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/properties">Properties</FooterLink>
              <FooterLink to="/favorites">Favorites</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Property Types</h3>
            <ul className="space-y-2">
              <FooterLink to="/properties?type=house">Houses</FooterLink>
              <FooterLink to="/properties?type=apartment">Apartments</FooterLink>
              <FooterLink to="/properties?type=condo">Condos</FooterLink>
              <FooterLink to="/properties?type=townhouse">Townhouses</FooterLink>
              <FooterLink to="/properties?type=land">Land</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary-400 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Real Estate Blvd, Seattle, WA 98101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-primary-400 flex-shrink-0" size={18} />
                <span className="text-gray-400">info@homefinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} HomeFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};



const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);



const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    className="bg-gray-800 hover:bg-primary-600 text-white p-2 rounded-full transition-colors duration-300"
    target="_blank" 
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

export default Footer;