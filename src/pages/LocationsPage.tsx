import React from 'react';
import LocationCard from '../components/LocationCard';
import { locations } from '../data/locations';

const LocationsPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-cream">
      <div className="container-max section-padding py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-soft-charcoal mb-4">
            Ubicaciones Privilegiadas
          </h1>
          <p className="text-dusty-clay text-lg max-w-2xl mx-auto">
            Descubre los destinos más exclusivos y deseados de República Dominicana. 
            Cada ubicación ha sido seleccionada por su belleza única y potencial de inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-6 text-center">
            ¿Por qué elegir República Dominicana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-copper rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🏝️</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                Belleza Natural
              </h3>
              <p className="text-dusty-clay">
                Playas de arena blanca, montañas tropicales y una biodiversidad única en el Caribe.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted-olive rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">💰</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                Inversión Inteligente
              </h3>
              <p className="text-dusty-clay">
                Mercado inmobiliario estable con excelente potencial de revalorización y rentabilidad.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dusty-clay rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🌴</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-2">
                Estilo de Vida
              </h3>
              <p className="text-dusty-clay">
                Clima tropical, cultura vibrante y una calidad de vida excepcional durante todo el año.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;