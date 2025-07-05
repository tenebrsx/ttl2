import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card scale-in group">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="bg-deep-copper/90 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        
        {property.featured && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="bg-muted-olive/90 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide flex items-center">
              <Heart size={12} className="mr-1 fill-current sm:w-4 sm:h-4" />
              Destacada
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            to={`/propiedad/${property.id}`}
            className="btn-primary w-full text-center block text-sm sm:text-base py-2 sm:py-3"
          >
            Explorar propiedad
          </Link>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center text-dusty-clay mb-2 sm:mb-3">
          <MapPin size={14} className="mr-2 flex-shrink-0 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm tracking-wide">{property.location}</span>
        </div>
        
        <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-semibold text-soft-charcoal mb-2 sm:mb-3 group-hover:text-deep-copper transition-colors duration-500 line-clamp-2">
          <span itemProp="name">{property.title}</span>
        </h3>
        
        <p className="text-text-gray text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed" itemProp="description">
          {property.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-dusty-clay">
            <div className="flex items-center">
              <Bed size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square size={14} className="mr-1 sm:mr-2 sm:w-4 sm:h-4" />
              <span className="font-medium">{property.area}m²</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-playfair text-xl sm:text-2xl lg:text-3xl font-bold text-deep-copper">
            {formatPrice(property.price)}
          </span>
          <Link
            to={`/propiedad/${property.id}`}
            className="text-deep-copper hover:text-accent-clay transition-colors duration-300 font-medium tracking-wide text-sm sm:text-base min-h-[44px] flex items-center"
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;