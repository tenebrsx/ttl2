import React, { useState } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { ContactFormData } from '../types';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: '',
    propertyType: '',
    location: '',
    priceRange: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev: Partial<ContactFormData>) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyInterest: '',
        propertyType: '',
        location: '',
        priceRange: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full bg-cream py-20">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-12 rounded-lg shadow-sm">
              <CheckCircle size={64} className="text-deep-copper mx-auto mb-6" />
              <h2 className="font-playfair text-3xl font-bold text-soft-charcoal mb-4">
                ¡Mensaje enviado con éxito!
              </h2>
              <p className="text-dusty-clay text-lg mb-8">
                Gracias por contactarnos. Laura se pondrá en contacto contigo dentro de las próximas 24 horas.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Enviar otro mensaje
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-cream py-20">
      <div className="container-max section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-soft-charcoal mb-4">
              Conectemos
            </h2>
            <p className="text-dusty-clay text-lg max-w-2xl mx-auto">
              Tu hogar ideal está esperando. Cuéntame sobre tus sueños y trabajemos juntos para hacerlos realidad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-sm h-fit">
                <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-deep-copper rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soft-charcoal mb-1">WhatsApp</h4>
                      <p className="text-dusty-clay mb-2 text-sm">Respuesta inmediata</p>
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
                      <h4 className="font-bold text-soft-charcoal mb-1">Email</h4>
                      <p className="text-dusty-clay mb-2 text-sm">Para consultas detalladas</p>
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
                      <h4 className="font-bold text-soft-charcoal mb-1">Teléfono</h4>
                      <p className="text-dusty-clay mb-2 text-sm">Llamadas directas</p>
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
                      <h4 className="font-bold text-soft-charcoal mb-1">Oficina</h4>
                      <p className="text-dusty-clay mb-2 text-sm">Visitas con cita previa</p>
                      <p className="text-dusty-clay text-sm">
                        Av. Winston Churchill, Santo Domingo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-deep-copper rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soft-charcoal mb-1">Horarios</h4>
                      <div className="text-dusty-clay text-sm space-y-1">
                        <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                        <p>Sábados: 9:00 AM - 2:00 PM</p>
                        <p>Domingos: Solo emergencias</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="font-playfair text-2xl font-bold text-soft-charcoal mb-6">
                  Cuéntame sobre tu búsqueda
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-soft-charcoal font-medium mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none transition-colors duration-300 ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-dusty-clay focus:border-deep-copper'
                        }`}
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
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
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none transition-colors duration-300 ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-dusty-clay focus:border-deep-copper'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
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
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none transition-colors duration-300 ${
                        errors.phone 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-dusty-clay focus:border-deep-copper'
                      }`}
                      placeholder="+1 (809) 555-1234"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Property Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  </div>

                  <div>
                    <label className="block text-soft-charcoal font-medium mb-2">
                      Propiedad de interés específica
                    </label>
                    <input
                      type="text"
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                      placeholder="Ej: Villa Serena Oceanfront, o deja en blanco"
                    />
                  </div>

                  <div>
                    <label className="block text-soft-charcoal font-medium mb-2">
                      Cuéntame más sobre lo que buscas *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none transition-colors duration-300 ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-dusty-clay focus:border-deep-copper'
                      }`}
                      placeholder="Describe tu propiedad ideal, necesidades especiales, timeline, etc."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary flex items-center justify-center ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;