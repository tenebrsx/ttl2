import React from 'react';
import { Search, Filter } from 'lucide-react';

interface PropertyFilterProps {
  filters: {
    search: string;
    location: string;
    type: string;
    minPrice: string;
    maxPrice: string;
    bedrooms: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ filters, onFilterChange }) => {
  const locations = ['Todos', 'Punta Cana', 'Santo Domingo', 'Cap Cana', 'Puerto Plata', 'Jarabacoa', 'La Romana'];
  const types = ['Todos', 'villa', 'apartment', 'penthouse', 'house'];
  const bedroomOptions = ['Todos', '1', '2', '3', '4', '5+'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex items-center mb-6">
        <Filter size={20} className="mr-2 text-deep-copper" />
        <h3 className="font-playfair text-xl font-semibold text-soft-charcoal">
          Filtrar Propiedades
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-dusty-clay" />
          <input
            type="text"
            placeholder="Buscar propiedades..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
          />
        </div>
        
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          {locations.map((location) => (
            <option key={location} value={location === 'Todos' ? '' : location}>
              {location}
            </option>
          ))}
        </select>
        
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          {types.map((type) => (
            <option key={type} value={type === 'Todos' ? '' : type}>
              {type === 'Todos' ? 'Todos los tipos' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        
        <input
          type="number"
          placeholder="Precio mínimo"
          value={filters.minPrice}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        />
        
        <input
          type="number"
          placeholder="Precio máximo"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        />
        
        <select
          value={filters.bedrooms}
          onChange={(e) => onFilterChange('bedrooms', e.target.value)}
          className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          {bedroomOptions.map((bedroom) => (
            <option key={bedroom} value={bedroom === 'Todos' ? '' : bedroom}>
              {bedroom === 'Todos' ? 'Habitaciones' : `${bedroom} hab`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertyFilter;