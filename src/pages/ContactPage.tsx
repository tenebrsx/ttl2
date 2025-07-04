import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    priceRange: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      priceRange: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-cream">
      <div className="container-max section-padding py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-soft-charcoal mb-4">
            Conectemos
          </h1>
          <p className="text-dusty-clay text-lg max-w-2xl mx-auto">
            Tu hogar ideal está esperando. Cuéntame sobre tus sueños y trabajemos juntos para hacerlos realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-6">
              Hablemos
            </h2>
            <p className="text-dusty-clay mb-8 leading-relaxed">
              Prefiero las conversaciones reales a los formularios. Cada consulta es única, 
              y me gusta conocer personalmente a cada familia que confía en mí.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-deep-copper rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-soft-charcoal mb-1">WhatsApp</h3>
                  <p className="text-dusty-clay mb-2">La forma más rápida de contactarme</p>
                  <a
                    href="https://wa.me/18095551234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-deep-copper hover:underline"
                  >
                    +1 (809) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-muted-olive rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-soft-charcoal mb-1">Email</h3>
                  <p className="text-dusty-clay mb-2">Para consultas detalladas</p>
                  <a
                    href="mailto:laura@lauraalba.com"
                    className="text-deep-copper hover:underline"
                  >
                    laura@lauraalba.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-dusty-clay rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-soft-charcoal mb-1">Teléfono</h3>
                  <p className="text-dusty-clay mb-2">Llamadas directas</p>
                  <a
                    href="tel:+18095551234"
                    className="text-deep-copper hover:underline"
                  >
                    +1 (809) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-soft-charcoal mb-1">Oficina</h3>
                  <p className="text-dusty-clay mb-2">Visitas con cita previa</p>
                  <p className="text-dusty-clay">
                    Av. Winston Churchill, Santo Domingo
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-deep-copper rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-soft-charcoal mb-1">Horarios</h3>
                  <p className="text-dusty-clay">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-dusty-clay">Sábados: 9:00 AM - 2:00 PM</p>
                  <p className="text-dusty-clay">Domingos: Solo emergencias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-6">
              Cuéntame sobre tu búsqueda
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-soft-charcoal font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-soft-charcoal font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-soft-charcoal font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-soft-charcoal font-medium mb-2">
                    Tipo de propiedad
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartamento</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="house">Casa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-soft-charcoal font-medium mb-2">
                    Ubicación preferida
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Punta Cana">Punta Cana</option>
                    <option value="Santo Domingo">Santo Domingo</option>
                    <option value="Cap Cana">Cap Cana</option>
                    <option value="Puerto Plata">Puerto Plata</option>
                    <option value="Jarabacoa">Jarabacoa</option>
                    <option value="La Romana">La Romana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-soft-charcoal font-medium mb-2">
                  Rango de precio
                </label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                >
                  <option value="">Seleccionar...</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-750000">$500,000 - $750,000</option>
                  <option value="750000-1000000">$750,000 - $1,000,000</option>
                  <option value="1000000-1500000">$1,000,000 - $1,500,000</option>
                  <option value="1500000+">$1,500,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-soft-charcoal font-medium mb-2">
                  Cuéntame más sobre lo que buscas
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                  placeholder="Describe tu propiedad ideal, necesidades especiales, timeline, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;