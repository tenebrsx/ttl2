// SEO utility functions

export const generatePropertyTitle = (property: any): string => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return `${property.title} - ${property.location} | ${formatPrice(property.price)} | Laura Alba`;
};

export const generatePropertyDescription = (property: any): string => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return `${property.description} Propiedad de ${property.bedrooms} habitaciones y ${property.bathrooms} baños en ${property.location}. ${formatPrice(property.price)}.`;
};

export const generatePropertyKeywords = (property: any): string => {
  return `${property.title}, ${property.type} ${property.location}, propiedad lujo ${property.location}, ${property.bedrooms} habitaciones ${property.location}, bienes raíces ${property.region}`;
};

export const generateLocationKeywords = (location: string): string => {
  const locationKeywords = {
    'Punta Cana': 'Punta Cana propiedades lujo, villas Bávaro, resorts exclusivos, playa Caribe',
    'Santo Domingo': 'Santo Domingo bienes raíces, Zona Colonial, Malecón, penthouses capital',
    'Cap Cana': 'Cap Cana exclusivo, marina privada, golf lujo, propiedades premium',
    'Puerto Plata': 'Puerto Plata villas, costa norte, montañas mar, Playa Dorada',
    'Jarabacoa': 'Jarabacoa montañas, clima primaveral, cascadas, naturaleza',
    'La Romana': 'La Romana golf, Casa de Campo, Altos de Chavón, marina'
  };

  return locationKeywords[location as keyof typeof locationKeywords] || `${location} propiedades lujo`;
};

// Image optimization
export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    params.append('fit', 'crop');
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  return url;
};

// Lazy loading image component
export const createLazyImage = (src: string, alt: string, className?: string) => {
  return {
    src,
    alt,
    loading: 'lazy' as const,
    className: `${className || ''} transition-opacity duration-300`,
    onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.classList.add('loaded');
    }
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};