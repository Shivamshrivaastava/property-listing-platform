import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom marker if needed

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Contact Us</h1>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Have questions about a property or need assistance with your search? 
            Get in touch with our team and we'll be happy to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Our Office</h3>
                    <p className="text-gray-600 mt-1">
                      123 Real Estate Blvd<br />
                      Seattle, WA 98101<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600 mt-1">
                      <a 
                        href="tel:+15551234567" 
                        className="hover:text-primary-600 transition-colors duration-300"
                      >
                        (555) 123-4567
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      <a 
                        href="tel:+18009876543" 
                        className="hover:text-primary-600 transition-colors duration-300"
                      >
                        (800) 987-6543
                      </a> (Toll Free)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a 
                        href="mailto:info@homefinder.com" 
                        className="hover:text-primary-600 transition-colors duration-300"
                      >
                        info@homefinder.com
                      </a>
                    </p>
                    <p className="text-gray-600 mt-1">
                      <a 
                        href="mailto:support@homefinder.com" 
                        className="hover:text-primary-600 transition-colors duration-300"
                      >
                        support@homefinder.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <Clock size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Our Location</h2>
            
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <MapContainer center={[47.6062, -122.3321]} zoom={13} className="w-full h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[47.6062, -122.3321]}>
                  <Popup>
                    <span>123 Real Estate Blvd, Seattle, WA</span>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  How do I schedule a property viewing?
                </h3>
                <p className="text-gray-600">
                  You can schedule a viewing by contacting the listing agent directly from the property details page, 
                  or by reaching out to our general office line at (555) 123-4567.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  Do you handle rental properties?
                </h3>
                <p className="text-gray-600">
                  Yes, we handle both sales and rentals. You can use our search filters to narrow down 
                  properties by type, including rentals.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  How often are new properties added?
                </h3>
                <p className="text-gray-600">
                  We update our listings daily. New properties are typically added within 24 hours of becoming available.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg text-gray-900 mb-2">
                  Can I list my property on your platform?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Contact our office for details on listing your property with us. We offer 
                  various packages to help market and sell your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
