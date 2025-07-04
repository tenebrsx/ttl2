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
    <div className="property-card scale-in">
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4">
          <span className="bg-deep-copper/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>
        
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-muted-olive/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium tracking-wide flex items-center">
              <Heart size={14} className="mr-1 fill-current" />
              Destacada
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            to={`/propiedad/${property.id}`}
            className="btn-primary w-full text-center block"
          >
            Explorar propiedad
          </Link>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center text-dusty-clay mb-3">
          <MapPin size={16} className="mr-2" />
          <span className="text-sm tracking-wide">{property.location}</span>
        </div>
        
        <h3 className="font-playfair text-2xl font-semibold text-soft-charcoal mb-3 group-hover:text-deep-copper transition-colors duration-500">
          {property.title}
        </h3>
        
        <p className="text-text-gray text-sm mb-6 line-clamp-2 leading-relaxed">
          {property.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6 text-sm text-dusty-clay">
            <div className="flex items-center">
              <Bed size={16} className="mr-2" />
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath size={16} className="mr-2" />
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square size={16} className="mr-2" />
              <span className="font-medium">{property.area}m²</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-playfair text-3xl font-bold text-deep-copper">
            {formatPrice(property.price)}
          </span>
          <Link
            to={`/propiedad/${property.id}`}
            className="text-deep-copper hover:text-accent-clay transition-colors duration-300 font-medium tracking-wide"
          >
            Ver detalles →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;