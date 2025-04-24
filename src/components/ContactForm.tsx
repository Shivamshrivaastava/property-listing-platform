import React, { useState } from 'react';
import { Mail, User, Phone, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  propertyId?: string;
  agentName?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ propertyId, agentName }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: agentName 
      ? `I'm interested in learning more about this property. Please contact me at your earliest convenience.` 
      : ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">
        {propertyId ? `Contact ${agentName || 'Agent'}` : 'Get In Touch'}
      </h3>
      
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 mb-4">
          <h4 className="font-medium mb-2">Thank you for your message!</h4>
          <p className="text-sm">
            We have received your inquiry and will get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="johndoe@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="(555) 123-4567"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare size={16} className="text-gray-400" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                placeholder="I'm interested in this property..."
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;