
import { Award, Heart, Users, Clock } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';
import { testimonials } from '../data/testimonials';
import lauraAlba from '../data/laura alba.jpeg';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-cream">
      <div className="container-max section-padding py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="order-2 lg:order-1">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-soft-charcoal mb-6">
              Hola, soy
              <br />
              <span className="text-deep-copper">Laura Alba</span>
            </h1>
            <p className="text-dusty-clay text-lg mb-6 leading-relaxed">
              Más que una agente inmobiliaria, soy una curadora de experiencias. Durante los últimos 
              10 años, he tenido el privilegio de ayudar a más de 200 familias a encontrar no solo 
              una casa, sino el lugar donde sus historias cobran vida.
            </p>
            <p className="text-dusty-clay text-lg mb-8 leading-relaxed">
              Mi filosofía es simple: cada propiedad tiene un alma, y cada familia tiene una historia 
              única. Mi trabajo es encontrar esa conexión perfecta que trasciende los metros cuadrados 
              y se convierte en un hogar verdadero.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <Award className="text-deep-copper mr-3" size={24} />
                <div>
                  <p className="font-bold text-soft-charcoal">Certificada</p>
                  <p className="text-dusty-clay text-sm">Asociación Inmobiliaria</p>
                </div>
              </div>
              <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                <Heart className="text-deep-copper mr-3" size={24} />
                <div>
                  <p className="font-bold text-soft-charcoal">4.9/5</p>
                  <p className="text-dusty-clay text-sm">Satisfacción clientes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <img
              src={lauraAlba}
              alt="Laura Alba"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <Users className="text-deep-copper mx-auto mb-4" size={48} />
            <p className="font-playfair text-3xl font-bold text-soft-charcoal mb-2">200+</p>
            <p className="text-dusty-clay">Familias satisfechas</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <Clock className="text-deep-copper mx-auto mb-4" size={48} />
            <p className="font-playfair text-3xl font-bold text-soft-charcoal mb-2">10+</p>
            <p className="text-dusty-clay">Años de experiencia</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <Award className="text-deep-copper mx-auto mb-4" size={48} />
            <p className="font-playfair text-3xl font-bold text-soft-charcoal mb-2">15+</p>
            <p className="text-dusty-clay">Premios recibidos</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-sm">
            <Heart className="text-deep-copper mx-auto mb-4" size={48} />
            <p className="font-playfair text-3xl font-bold text-soft-charcoal mb-2">98%</p>
            <p className="text-dusty-clay">Índice de recomendación</p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-sm mb-20">
          <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-8 text-center">
            Mi Filosofía
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-copper rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">🎯</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-3">
                Intención
              </h3>
              <p className="text-dusty-clay">
                Cada propiedad es seleccionada con propósito. No se trata de cantidad, 
                sino de encontrar opciones que verdaderamente resuenen con tus sueños.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted-olive rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">👥</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-3">
                Conexión
              </h3>
              <p className="text-dusty-clay">
                La confianza es la base de todo. Trabajo contigo como si fueras familia, 
                porque entiendo que estás tomando una de las decisiones más importantes de tu vida.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-dusty-clay rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✨</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-soft-charcoal mb-3">
                Excelencia
              </h3>
              <p className="text-dusty-clay">
                Cada detalle importa. Desde la primera consulta hasta la entrega de llaves, 
                mi compromiso es ofrecerte una experiencia excepcional.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-8 text-center">
            Lo que dicen mis clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-soft-charcoal text-white p-8 lg:p-12 rounded-lg text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            ¿Listo para encontrar tu hogar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comencemos esta aventura juntos. Estoy aquí para escucharte y guiarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="btn-primary"
            >
              Agendar una consulta
            </a>
            <a
              href="https://wa.me/18095551234"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white text-white hover:bg-white hover:text-soft-charcoal"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;