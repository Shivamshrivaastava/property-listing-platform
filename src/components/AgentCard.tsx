import React from 'react';
import { Phone, Mail } from 'lucide-react';

interface AgentCardProps {
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <div className="flex-shrink-0">
        <img 
          src={agent.image} 
          alt={agent.name} 
          className="w-20 h-20 rounded-full object-cover border-2 border-primary-100"
        />
      </div>
      
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
        <p className="text-gray-500 text-sm mb-3">Real Estate Agent</p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center sm:justify-start">
            <Phone size={16} className="text-primary-600 mr-2" />
            <a 
              href={`tel:${agent.phone.replace(/[^\d]/g, '')}`} 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-300"
            >
              {agent.phone}
            </a>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start">
            <Mail size={16} className="text-primary-600 mr-2" />
            <a 
              href={`mailto:${agent.email}`} 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-300"
            >
              {agent.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;