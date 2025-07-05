import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import InteractiveMap from '../components/InteractiveMap';
import PropertySidebar from '../components/PropertySidebar';
import ContactSection from '../components/ContactSection';
import { properties } from '../data/properties';
import { Property, MapFilters } from '../types';

const MapPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<MapFilters>({
    propertyType: '',
    location: '',
    priceRange: ''
  });

  // Check if a specific property should be highlighted
  useEffect(() => {
    const propertyId = searchParams.get('property');
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property);
        setSidebarOpen(true);
      }
    }
  }, [searchParams]);

  const filteredProperties = properties.filter(property => {
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    if (filters.location && property.location !== filters.location) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        if (property.price < min || property.price > max) return false;
      } else {
        if (property.price < min) return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen pt-16">
      <SEOHead
        title="Mapa Interactivo de Propiedades | Laura Alba Real Estate República Dominicana"
        description="Explora propiedades de lujo en República Dominicana con nuestro mapa interactivo. Filtra por ubicación, tipo y precio. Encuentra tu propiedad ideal con ubicación exacta."
        keywords="mapa propiedades República Dominicana, ubicación exacta villas, mapa interactivo bienes raíces, filtros propiedades lujo, coordenadas casas RD"
        url="https://fluffy-zabaione-6d8438.netlify.app/mapa"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Mapa Interactivo de Propiedades",
          "description": "Mapa interactivo para explorar propiedades de lujo en República Dominicana",
          "url": "https://fluffy-zabaione-6d8438.netlify.app/mapa"
        }}
      />
      {/* Page Header */}
      <div className="bg-soft-charcoal text-white py-12">
        <div className="container-max section-padding">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Explora Propiedades en el Mapa
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Descubre la ubicación exacta de cada propiedad y explora los vecindarios más exclusivos de República Dominicana.
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative">
        <div className="flex h-[70vh]">
          {/* Map Container */}
          <div className="flex-1 relative">
            <InteractiveMap
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Property Sidebar */}
          <PropertySidebar
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>

      {/* Map Instructions */}
      <div className="bg-white py-12">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-6">
              Cómo usar el mapa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-deep-copper rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                  Filtra
                </h3>
                <p className="text-dusty-clay">
                  Usa los filtros para encontrar propiedades por tipo, ubicación y precio.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted-olive rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                  Explora
                </h3>
                <p className="text-dusty-clay">
                  Haz clic en los marcadores para ver detalles de cada propiedad.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-dusty-clay rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                  Conecta
                </h3>
                <p className="text-dusty-clay">
                  Contacta directamente para agendar una visita a la propiedad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default MapPage;