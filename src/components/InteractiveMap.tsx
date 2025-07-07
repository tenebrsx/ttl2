import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Property, MapFilters } from "../types";
import { Link } from "react-router-dom";
import { Bed, Bath, Square, MapPin, Eye } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect: (property: Property | null) => void;
  filters: MapFilters;
  onFilterChange: (filters: MapFilters) => void;
}

// Custom marker icons
const createCustomIcon = (type: string, isSelected: boolean = false) => {
  const colors = {
    villa: "#A87449",
    apartment: "#8B956D",
    penthouse: "#B8A082",
    house: "#9CAF88",
  };

  const color = colors[type as keyof typeof colors] || "#A87449";
  const size = isSelected ? 40 : 30;

  return divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${size > 30 ? "14px" : "12px"};
        transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
        transition: all 0.3s ease;
      ">
        ${type.charAt(0).toUpperCase()}
      </div>
    `,
    className: "custom-marker",
    iconSize: point(size, size, true),
    iconAnchor: point(size / 2, size / 2, true),
  });
};

const createClusterIcon = (cluster: { getChildCount: () => number }) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 40 : count < 100 ? 50 : 60;

  return divIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, #A87449, #8B956D);
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${size > 50 ? "16px" : "14px"};
      ">
        ${count}
      </div>
    `,
    className: "custom-cluster",
    iconSize: point(size, size, true),
  });
};

const MapController: React.FC<{ selectedProperty: Property | null }> = ({
  selectedProperty,
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedProperty) {
      map.setView(
        [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng],
        14,
        {
          animate: true,
          duration: 1,
        },
      );
    }
  }, [selectedProperty, map]);

  return null;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
  filters,
  onFilterChange,
}) => {
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);

  useEffect(() => {
    let filtered = properties;

    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.type === filters.propertyType);
    }

    if (filters.location) {
      filtered = filtered.filter((p) => p.location === filters.location);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        } else {
          return p.price >= min;
        }
      });
    }

    setFilteredProperties(filtered);
  }, [properties, filters]);

  const locations = Array.from(new Set(properties.map((p) => p.location)));
  const propertyTypes = Array.from(new Set(properties.map((p) => p.type)));

  return (
    <div className="w-full h-full flex flex-col">
      {/* Map Filters */}
      <div className="bg-white p-4 border-b border-dusty-clay/20 flex flex-wrap gap-4">
        <select
          value={filters.propertyType}
          onChange={(e) =>
            onFilterChange({ ...filters, propertyType: e.target.value })
          }
          className="px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          <option value="">Todos los tipos</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) =>
            onFilterChange({ ...filters, location: e.target.value })
          }
          className="px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          <option value="">Todas las ubicaciones</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          value={filters.priceRange}
          onChange={(e) =>
            onFilterChange({ ...filters, priceRange: e.target.value })
          }
          className="px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
        >
          <option value="">Todos los precios</option>
          <option value="0-500000">Hasta $500,000</option>
          <option value="500000-1000000">$500,000 - $1,000,000</option>
          <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
          <option value="2000000">Más de $2,000,000</option>
        </select>

        <div className="text-dusty-clay text-sm flex items-center">
          Mostrando {filteredProperties.length} propiedades
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[18.7357, -70.1627]} // Dominican Republic center
          zoom={8}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController selectedProperty={selectedProperty || null} />

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterIcon}
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
          >
            {filteredProperties.map((property) => (
              <Marker
                key={property.id}
                position={[property.coordinates.lat, property.coordinates.lng]}
                icon={createCustomIcon(
                  property.type,
                  selectedProperty?.id === property.id,
                )}
                eventHandlers={{
                  click: () => onPropertySelect(property),
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup className="custom-popup" closeButton={false}>
                  <div className="p-2 min-w-[280px]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />

                    <div className="flex items-center text-dusty-clay mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-xs">{property.location}</span>
                    </div>

                    <h3 className="font-playfair text-lg font-semibold text-soft-charcoal mb-2">
                      {property.title}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3 text-xs text-dusty-clay">
                        <div className="flex items-center">
                          <Bed size={12} className="mr-1" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath size={12} className="mr-1" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Square size={12} className="mr-1" />
                          <span>{property.area}m²</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-xl font-bold text-deep-copper">
                        {formatPrice(property.price)}
                      </span>
                      <Link
                        to={`/propiedad/${property.id}`}
                        className="flex items-center bg-deep-copper text-white px-3 py-1 rounded text-xs hover:bg-opacity-90 transition-colors duration-300"
                      >
                        <Eye size={12} className="mr-1" />
                        Ver más
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
