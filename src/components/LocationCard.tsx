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
      className="location-card block h-80 sm:h-96 scale-in group"
    >
      <div className="relative h-full">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white z-20">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center mb-2 sm:mb-3">
              <MapPin size={16} className="mr-2 flex-shrink-0 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm opacity-90 tracking-wide">{location.propertyCount} propiedades disponibles</span>
            </div>
            
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-deep-copper transition-colors duration-500">
              {location.name}
            </h3>
            
            <p className="text-xs sm:text-sm opacity-90 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3 sm:mb-4">
              {location.description}
            </p>

            <div className="flex items-center text-deep-copper font-medium tracking-wide text-sm sm:text-base">
              <span>Explorar ubicación</span>
              <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;