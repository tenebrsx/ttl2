import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Laura Alba - Propiedades de Lujo en República Dominicana",
  description = "Descubre propiedades exclusivas en República Dominicana con Laura Alba. Villas, penthouses y casas de lujo en Punta Cana, Santo Domingo, Cap Cana y más.",
  keywords = "propiedades lujo República Dominicana, bienes raíces Punta Cana, villas Santo Domingo, penthouses Cap Cana, Laura Alba agente inmobiliario",
  image = "https://fluffy-zabaione-6d8438.netlify.app/og-image.jpg",
  url = "https://fluffy-zabaione-6d8438.netlify.app",
  type = "website",
  structuredData
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;