import React from 'react';
import { Property } from '../types';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Eye, X } from 'lucide-react';

interface PropertySidebarProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertySidebar: React.FC<PropertySidebarProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-24 right-4 z-50 bg-deep-copper text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X size={20} /> : <MapPin size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-full lg:w-96 bg-white shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6 border-b border-dusty-clay/20">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-2xl font-bold text-soft-charcoal">
              Propiedades
            </h2>
            <span className="text-dusty-clay text-sm">
              {properties.length} encontradas
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all duration-300
                ${selectedProperty?.id === property.id 
                  ? 'border-deep-copper bg-deep-copper/5' 
                  : 'border-dusty-clay/20 hover:border-deep-copper/50 hover:shadow-md'
                }
              `}
              onClick={() => onPropertySelect(property)}
            >
              <div className="flex space-x-3">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center text-dusty-clay mb-1">
                    <MapPin size={12} className="mr-1" />
                    <span className="text-xs">{property.location}</span>
                  </div>
                  
                  <h3 className="font-playfair text-sm font-semibold text-soft-charcoal mb-2 truncate">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-xs text-dusty-clay mb-2">
                    <div className="flex items-center">
                      <Bed size={10} className="mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={10} className="mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square size={10} className="mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-playfair text-sm font-bold text-deep-copper">
                      {formatPrice(property.price)}
                    </span>
                    <Link
                      to={`/propiedad/${property.id}`}
                      className="flex items-center text-deep-copper hover:text-deep-copper/80 transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye size={12} className="mr-1" />
                      <span className="text-xs">Ver</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default PropertySidebar;