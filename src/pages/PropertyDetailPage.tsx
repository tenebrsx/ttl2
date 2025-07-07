import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Heart,
  Star,
  Camera,
  Navigation,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const property = properties.find((p) => p.id === id);
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== id &&
        (p.location === property?.location || p.type === property?.type),
    )
    .slice(0, 3);

  if (!property) {
    return (
      <div className="min-h-screen pt-20 bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold text-soft-charcoal mb-4">
            Propiedad no encontrada
          </h1>
          <Link to="/propiedades" className="btn-primary">
            Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const propertyStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://fluffy-zabaione-6d8438.netlify.app/propiedad/${property.id}`,
    image: property.images,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "DO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.coordinates.lat,
      longitude: property.coordinates.lng,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "MTK",
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    price: {
      "@type": "PriceSpecification",
      price: property.price,
      priceCurrency: "USD",
    },
    category: property.type,
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
  };

  const getLifestyleDescription = (location: string) => {
    const descriptions = {
      "Punta Cana":
        "Despierta cada mañana con el sonido de las olas y la brisa tropical acariciando tu rostro. Aquí, cada atardecer es una obra de arte pintada en el cielo.",
      "Santo Domingo":
        "Vive donde la historia colonial se encuentra con la modernidad vibrante. Cada calle cuenta una historia, cada esquina revela un nuevo descubrimiento.",
      "Cap Cana":
        "Experimenta el lujo en su máxima expresión, donde la exclusividad se combina con la belleza natural del Caribe más auténtico.",
      "Puerto Plata":
        "Entre montañas y mar, descubre un paraíso donde la naturaleza y la cultura se abrazan en perfecta armonía.",
      Jarabacoa:
        "Respira la pureza de las montañas dominicanas, donde el clima perfecto y los paisajes de ensueño crean el refugio ideal.",
      "La Romana":
        "Disfruta de la elegancia caribeña en una comunidad donde cada detalle ha sido pensado para el bienestar y la sofisticación.",
    };
    return (
      descriptions[location as keyof typeof descriptions] ||
      "Un lugar donde los sueños se hacen realidad."
    );
  };

  const getNeighborhoodHighlights = (location: string) => {
    const highlights = {
      "Punta Cana": [
        "Playa Bávaro a 5 min",
        "Aeropuerto Internacional",
        "Resorts de lujo",
        "Campo de golf",
      ],
      "Santo Domingo": [
        "Zona Colonial",
        "Malecón",
        "Centros comerciales",
        "Vida nocturna",
      ],
      "Cap Cana": [
        "Marina privada",
        "Campo de golf",
        "Playa exclusiva",
        "Restaurantes gourmet",
      ],
      "Puerto Plata": [
        "Teleférico",
        "Centro histórico",
        "Playa Dorada",
        "Montañas cercanas",
      ],
      Jarabacoa: [
        "Clima primaveral",
        "Cascadas",
        "Aventuras al aire libre",
        "Tranquilidad",
      ],
      "La Romana": [
        "Casa de Campo",
        "Altos de Chavón",
        "Marina",
        "Golf de clase mundial",
      ],
    };
    return (
      highlights[location as keyof typeof highlights] || [
        "Ubicación privilegiada",
        "Servicios cercanos",
        "Transporte",
        "Comunidad",
      ]
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-cream">
      <SEOHead
        title={`${property.title} - ${property.location} | ${formatPrice(property.price)} | Laura Alba`}
        description={`${property.description} Propiedad de ${property.bedrooms} habitaciones y ${property.bathrooms} baños en ${property.location}. ${formatPrice(property.price)}.`}
        keywords={`${property.title}, ${property.type} ${property.location}, propiedad lujo ${property.location}, ${property.bedrooms} habitaciones ${property.location}, bienes raíces ${property.region}`}
        url={`https://fluffy-zabaione-6d8438.netlify.app/propiedad/${property.id}`}
        image={property.images[0]}
        type="article"
        structuredData={propertyStructuredData}
      />
      <div className="container-max section-padding py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/propiedades"
            className="inline-flex items-center text-dusty-clay hover:text-deep-copper transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a propiedades
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isLiked
                  ? "bg-deep-copper text-white"
                  : "bg-white text-dusty-clay hover:text-deep-copper"
              }`}
            >
              <Heart size={20} className={isLiked ? "fill-current" : ""} />
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4">
              <img
                src={property.images[selectedImageIndex]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-soft-charcoal text-sm font-medium">
                  {selectedImageIndex + 1} / {property.images.length}
                </span>
              </div>
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300">
                <Camera size={20} className="text-soft-charcoal" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className={`w-full h-24 object-cover rounded cursor-pointer transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-deep-copper"
                      : "hover:opacity-80"
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div>
            <div className="flex items-center text-dusty-clay mb-2">
              <MapPin size={20} className="mr-2" />
              <span>{property.location}</span>
            </div>

            <h1 className="font-playfair text-4xl font-bold text-soft-charcoal mb-4">
              {property.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <span className="font-playfair text-3xl font-bold text-deep-copper">
                {formatPrice(property.price)}
              </span>
              <span className="bg-muted-olive text-white px-4 py-2 rounded-full text-sm">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bed size={24} className="mx-auto mb-2 text-deep-copper" />
                <p className="text-2xl font-bold text-soft-charcoal">
                  {property.bedrooms}
                </p>
                <p className="text-dusty-clay text-sm">Habitaciones</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Bath size={24} className="mx-auto mb-2 text-deep-copper" />
                <p className="text-2xl font-bold text-soft-charcoal">
                  {property.bathrooms}
                </p>
                <p className="text-dusty-clay text-sm">Baños</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Square size={24} className="mx-auto mb-2 text-deep-copper" />
                <p className="text-2xl font-bold text-soft-charcoal">
                  {property.area}
                </p>
                <p className="text-dusty-clay text-sm">m²</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => {
                  const phoneNumber = "18095551234";
                  const message = `Hola Laura, me interesa agendar una visita para la propiedad: ${property.title} en ${property.location}. ¿Podrías ayudarme con los detalles?`;
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="btn-primary flex items-center justify-center"
              >
                <Calendar size={20} className="mr-2" />
                Agendar visita
              </button>
              <Link
                to={`/mapa?property=${property.id}`}
                className="btn-secondary flex items-center justify-center"
              >
                <Navigation size={20} className="mr-2" />
                Ver en mapa
              </Link>
            </div>
          </div>
        </div>

        {/* Lifestyle Story Section */}
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-sm mb-16">
          <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-6 text-center">
            Vivir aquí es...
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-dusty-clay text-lg leading-loose mb-8 italic">
              "{getLifestyleDescription(property.location)}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {getNeighborhoodHighlights(property.location).map(
                (highlight, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-deep-copper/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-2 h-2 bg-deep-copper rounded-full"></div>
                    </div>
                    <p className="text-dusty-clay text-sm">{highlight}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Description and Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
              Una historia por contar
            </h2>
            <p className="text-dusty-clay leading-relaxed mb-6">
              {property.description}
            </p>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
                "Esta propiedad es especial porque..."
              </h3>
              <p className="text-dusty-clay italic">
                "Cada rincón de esta propiedad ha sido pensado para crear
                momentos inolvidables. Es más que un hogar; es el escenario
                donde tu familia escribirá sus mejores capítulos."
              </p>
              <div className="flex items-center mt-4">
                <img
                  src="/image.png"
                  alt="Laura Alba"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-bold text-soft-charcoal text-sm">
                    Laura Alba
                  </p>
                  <p className="text-dusty-clay text-xs">Agente inmobiliario</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
              Amenidades que enamoran
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center text-dusty-clay bg-white p-3 rounded-lg shadow-sm"
                >
                  <div className="w-2 h-2 bg-deep-copper rounded-full mr-3"></div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Interactive Map */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
                Ubicación privilegiada
              </h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapContainer
                  center={[property.coordinates.lat, property.coordinates.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  className="z-10"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      property.coordinates.lat,
                      property.coordinates.lng,
                    ]}
                    icon={divIcon({
                      html: `
                        <div style="
                          background-color: #A87449;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          border: 3px solid white;
                          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          color: white;
                          font-weight: bold;
                          font-size: 16px;
                        ">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                      `,
                      className: "custom-property-marker",
                      iconSize: point(40, 40, true),
                      iconAnchor: point(20, 20, true),
                    })}
                  >
                    <Popup>
                      <div className="p-2 text-center">
                        <h4 className="font-bold text-soft-charcoal mb-1">
                          {property.title}
                        </h4>
                        <p className="text-dusty-clay text-sm mb-2">
                          {property.location}
                        </p>
                        <p className="text-deep-copper font-bold">
                          {formatPrice(property.price)}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-8 text-center">
              Propiedades similares que podrían interesarte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((similarProperty) => (
                <PropertyCard
                  key={similarProperty.id}
                  property={similarProperty}
                />
              ))}
            </div>
          </div>
        )}

        {/* Contact Agent */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-4">
                ¿Te enamoraste de esta propiedad?
              </h3>
              <p className="text-dusty-clay mb-6 leading-relaxed">
                Estoy aquí para acompañarte en cada paso. Desde la primera
                visita hasta la entrega de llaves, mi compromiso es hacer que
                este proceso sea tan especial como el hogar que estás a punto de
                encontrar.
              </p>

              <div className="flex items-center mb-6">
                <img
                  src="/image.png"
                  alt="Laura Alba"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-soft-charcoal">Laura Alba</p>
                  <p className="text-dusty-clay text-sm">
                    Agente inmobiliario certificado
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-deep-copper fill-current mr-1"
                      />
                    ))}
                    <span className="text-dusty-clay text-xs ml-1">
                      4.9/5 • 200+ familias
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <a
                  href="https://wa.me/18095551234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors duration-300"
                >
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp
                </a>
                <a
                  href="mailto:laura@lauraalba.com"
                  className="flex items-center justify-center bg-deep-copper text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </a>
                <a
                  href="tel:+18095551234"
                  className="flex items-center justify-center bg-muted-olive text-white px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  <Phone size={16} className="mr-2" />
                  Llamar
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
                Solicitar información personalizada
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                />
                <select className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300">
                  <option value="">¿Cuándo te gustaría visitarla?</option>
                  <option value="esta-semana">Esta semana</option>
                  <option value="proximo-fin-semana">
                    Próximo fin de semana
                  </option>
                  <option value="flexible">Soy flexible</option>
                </select>
                <textarea
                  placeholder="¿Qué te gustaría saber sobre esta propiedad?"
                  rows={4}
                  className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                ></textarea>
                <button type="submit" className="btn-primary w-full">
                  <Calendar size={20} className="mr-2" />
                  Solicitar visita personalizada
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
