import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, Heart, Play } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PropertyCard from '../components/PropertyCard';
import LocationCard from '../components/LocationCard';
import TestimonialCard from '../components/TestimonialCard';
import { properties } from '../data/properties';
import { locations } from '../data/locations';
import { testimonials } from '../data/testimonials';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuredProperties = properties.filter(p => p.featured);
  const featuredLocations = locations.slice(0, 3);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Laura Alba - Propiedades de Lujo en República Dominicana | Inicio"
        description="Descubre propiedades exclusivas en República Dominicana con Laura Alba. Villas, penthouses y casas de lujo en Punta Cana, Santo Domingo, Cap Cana y más. Experiencia personalizada en bienes raíces premium."
        keywords="propiedades lujo República Dominicana, bienes raíces Punta Cana, villas Santo Domingo, penthouses Cap Cana, Laura Alba agente inmobiliario, casas lujo Caribe, inversión inmobiliaria RD"
        url="https://fluffy-zabaione-6d8438.netlify.app/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Laura Alba Real Estate - Inicio",
          "description": "Página principal de Laura Alba Real Estate, especializada en propiedades de lujo en República Dominicana",
          "url": "https://fluffy-zabaione-6d8438.netlify.app/",
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Laura Alba",
            "description": "Agente inmobiliario especializada en propiedades de lujo"
          }
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-0">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury Villa"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white section-padding max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 hero-text leading-tight">
            Aquí es donde
            <br />
            <span className="text-deep-copper">tu historia comienza</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto opacity-90 hero-subtitle leading-relaxed sm:leading-loose px-4">
            Propiedades seleccionadas con intención. Experiencias que transforman espacios en hogares donde tu vida florecerá.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center hero-cta px-4">
            <Link to="/propiedades" className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] flex items-center justify-center">
              Explorar Propiedades
            </Link>
            <Link to="/nosotros" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-soft-charcoal text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] flex items-center justify-center">
              Conocer a Laura
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-cream">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-charcoal mb-6 fade-in">
              Más que propiedades,
              <br />
              <span className="text-deep-copper">experiencias de vida</span>
            </h2>
            <p className="text-text-gray text-xl max-w-3xl mx-auto leading-loose slide-up">
              Cada hogar cuenta una historia única. Mi misión es encontrar aquella que resuene profundamente con la tuya, 
              creando conexiones que van más allá de los metros cuadrados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center scale-in">
              <div className="w-20 h-20 bg-deep-copper rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
                Intención
              </h3>
              <p className="text-text-gray leading-relaxed">
                Cada propiedad es seleccionada con propósito. No se trata de cantidad, 
                sino de encontrar espacios que verdaderamente resuenen con tus sueños más profundos.
              </p>
            </div>
            <div className="text-center scale-in">
              <div className="w-20 h-20 bg-muted-olive rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
                Conexión
              </h3>
              <p className="text-text-gray leading-relaxed">
                La confianza es la base de todo. Trabajo contigo como si fueras familia, 
                porque entiendo que estás tomando una de las decisiones más importantes de tu vida.
              </p>
            </div>
            <div className="text-center scale-in">
              <div className="w-20 h-20 bg-dusty-clay rounded-full flex items-center justify-center mx-auto mb-6">
                <Play size={32} className="text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
                Excelencia
              </h3>
              <p className="text-text-gray leading-relaxed">
                Cada detalle importa. Desde la primera consulta hasta la entrega de llaves, 
                mi compromiso es ofrecerte una experiencia que supere todas tus expectativas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-charcoal mb-6">
              Propiedades Destacadas
            </h2>
            <p className="text-text-gray text-xl max-w-3xl mx-auto leading-loose">
              Una selección cuidadosa de propiedades excepcionales que definen el lujo, la elegancia y el arte de vivir bien.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {featuredProperties.map((property, index) => (
              <div key={property.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/propiedades" className="btn-primary inline-flex items-center text-lg px-12 py-5">
              Ver todas las propiedades
              <ArrowRight size={24} className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-24 bg-cream">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-charcoal mb-6">
              Ubicaciones Privilegiadas
            </h2>
            <p className="text-text-gray text-xl max-w-3xl mx-auto leading-loose">
              Descubre los destinos más exclusivos y deseados de República Dominicana, 
              donde cada amanecer es una promesa de vida extraordinaria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {featuredLocations.map((location, index) => (
              <div key={location.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <LocationCard location={location} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/ubicaciones" className="btn-secondary inline-flex items-center text-lg px-12 py-5">
              Explorar todas las ubicaciones
              <MapPin size={24} className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-charcoal mb-8">
                Más que una agente,
                <br />
                <span className="text-deep-copper">tu guía de confianza</span>
              </h2>
              <p className="text-text-gray text-lg mb-8 leading-loose">
                Cada propiedad cuenta una historia. Mi misión es encontrar aquella que resuene con la tuya. 
                Con más de una década de experiencia, he aprendido que comprar una casa es mucho más que 
                una transacción: es encontrar el lugar donde tu vida florecerá en toda su plenitud.
              </p>
              <div className="flex items-center mb-10 space-x-12">
                <div className="flex items-center">
                  <div className="flex text-deep-copper mr-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-soft-charcoal text-lg">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Heart className="text-deep-copper fill-current mr-3" size={24} />
                  <span className="font-semibold text-soft-charcoal text-lg">200+ Familias</span>
                </div>
              </div>
              <Link to="/nosotros" className="btn-primary text-lg px-12 py-5">
                Conoce mi historia
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <img
                  src="/image.png"
                  alt="Laura Alba"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-8 -right-8 bg-deep-copper text-white p-8 rounded-2xl shadow-xl">
                  <p className="font-playfair text-4xl font-bold mb-2">10+</p>
                  <p className="text-sm tracking-wide">Años de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream">
        <div className="container-max section-padding">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-soft-charcoal mb-6">
              Historias que Inspiran
            </h2>
            <p className="text-text-gray text-xl max-w-3xl mx-auto leading-loose">
              Cada familia que he ayudado a encontrar su hogar es parte de mi propia historia. 
              Sus palabras son el testimonio de una misión cumplida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 0.2}s` }} className="scale-in">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-soft-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-soft-charcoal via-deep-slate to-soft-charcoal"></div>
        <div className="container-max section-padding text-center relative z-10">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-8">
            Tu hogar perfecto espera.
            <br />
            <span className="text-deep-copper">¿Lo descubrimos juntos?</span>
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-loose">
            Comienza tu búsqueda hoy. Estoy aquí para guiarte en cada paso del camino hacia el hogar de tus sueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contacto" className="btn-primary text-lg px-12 py-5">
              Solicitar una consulta
            </Link>
            <a
              href="https://wa.me/18095551234"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white text-white hover:bg-white hover:text-soft-charcoal text-lg px-12 py-5"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;