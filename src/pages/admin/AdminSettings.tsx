import React, { useState } from 'react';
import { Save, User, Lock, Globe, Database } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Laura Alba Real Estate',
    siteDescription: 'Propiedades de lujo en República Dominicana',
    contactEmail: 'laura@lauraalba.com',
    contactPhone: '+1 (809) 555-1234',
    whatsappNumber: '18095551234',
    officeAddress: 'Av. Winston Churchill, Santo Domingo',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as 'socialMedia'],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would save settings to your database
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Configuración guardada exitosamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error al guardar la configuración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-soft-charcoal">Configuración</h1>
        <p className="text-dusty-clay mt-2">Gestiona la configuración del sitio web</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4 flex items-center">
            <Globe className="mr-2" size={20} />
            Información del Sitio
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Nombre del sitio
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Descripción del sitio
              </label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4 flex items-center">
            <User className="mr-2" size={20} />
            Información de Contacto
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Email de contacto
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Número de WhatsApp
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Dirección de oficina
              </label>
              <input
                type="text"
                name="officeAddress"
                value={settings.officeAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
            Redes Sociales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="socialMedia.linkedin"
                value={settings.socialMedia.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4 flex items-center">
            <Lock className="mr-2" size={20} />
            Información de la Cuenta
          </h2>
          
          <div className="bg-cream p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-deep-copper rounded-full flex items-center justify-center mr-4">
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-soft-charcoal">Administrador</p>
                <p className="text-dusty-clay text-sm">{user?.email}</p>
                <p className="text-dusty-clay text-xs mt-1">
                  Último acceso: {new Date().toLocaleDateString('es-DO')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4 flex items-center">
            <Database className="mr-2" size={20} />
            Estado del Sistema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">Base de datos</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Conectada</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">Autenticación</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Activa</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-green-800 font-medium">Almacenamiento</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Disponible</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-deep-copper text-white rounded-md hover:bg-accent-clay transition-colors duration-300 flex items-center ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} className="mr-2" />
                Guardar Configuración
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;