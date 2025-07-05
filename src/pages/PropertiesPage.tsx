import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import { properties } from '../data/properties';

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    search: '',
    location: searchParams.get('location') || '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  useEffect(() => {
    let filtered = properties;

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(property => property.location === filters.location);
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      if (filters.bedrooms === '5+') {
        filtered = filtered.filter(property => property.bedrooms >= 5);
      } else {
        filtered = filtered.filter(property => property.bedrooms === parseInt(filters.bedrooms));
      }
    }

    setFilteredProperties(filtered);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen pt-20 bg-cream">
      <SEOHead
        title="Propiedades de Lujo en República Dominicana | Laura Alba Real Estate"
        description="Explora nuestra selección exclusiva de villas, penthouses, apartamentos y casas de lujo en Punta Cana, Santo Domingo, Cap Cana y más ubicaciones premium en República Dominicana."
        keywords="propiedades venta República Dominicana, villas lujo Punta Cana, penthouses Santo Domingo, apartamentos Cap Cana, casas lujo Puerto Plata, bienes raíces premium RD"
        url="https://fluffy-zabaione-6d8438.netlify.app/propiedades"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Propiedades de Lujo",
          "description": "Colección de propiedades de lujo en República Dominicana",
          "url": "https://fluffy-zabaione-6d8438.netlify.app/propiedades"
        }}
      />
      <div className="container-max section-padding py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-soft-charcoal mb-4">
            Propiedades Disponibles
          </h1>
          <p className="text-dusty-clay text-lg max-w-2xl mx-auto">
            Explora nuestra selección cuidadosamente curada de propiedades excepcionales.
          </p>
        </div>

        <PropertyFilter filters={filters} onFilterChange={handleFilterChange} />

        <div className="mb-6 text-dusty-clay">
          Mostrando {filteredProperties.length} de {properties.length} propiedades
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-dusty-clay text-lg">
              No se encontraron propiedades con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;