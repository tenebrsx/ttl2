import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Link
      to={`/propiedades?location=${location.name}`}
      className="location-card block h-96 scale-in"
    >
      <div className="relative h-full">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-20">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center mb-3">
              <MapPin size={18} className="mr-2" />
              <span className="text-sm opacity-90 tracking-wide">{location.propertyCount} propiedades disponibles</span>
            </div>
            
            <h3 className="font-playfair text-3xl font-bold mb-4 group-hover:text-deep-copper transition-colors duration-500">
              {location.name}
            </h3>
            
            <p className="text-sm opacity-90 line-clamp-3 leading-relaxed mb-4">
              {location.description}
            </p>

            <div className="flex items-center text-deep-copper font-medium tracking-wide">
              <span>Explorar ubicación</span>
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;