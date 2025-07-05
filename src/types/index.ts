export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'villa' | 'apartment' | 'penthouse' | 'house';
  description: string;
  images: string[];
  featured: boolean;
  region: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  propertyCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest: string;
  propertyType: string;
  location: string;
  priceRange: string;
}

export interface MapFilters {
  propertyType: string;
  location: string;
  priceRange: string;
}