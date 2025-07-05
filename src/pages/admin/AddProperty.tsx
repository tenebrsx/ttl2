import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Upload, X, Plus, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PropertyForm {
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  type: 'villa' | 'apartment' | 'penthouse' | 'house' | '';
  description: string;
  amenities: string[];
  region: string;
  images: string[];
  featured: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
}

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');
  const [newImage, setNewImage] = useState('');
  const [formData, setFormData] = useState<PropertyForm>({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: '',
    description: '',
    amenities: [],
    region: '',
    images: [],
    featured: false,
    coordinates: {
      lat: '',
      lng: ''
    }
  });

  const locations = [
    'Punta Cana', 'Santo Domingo', 'Cap Cana', 'Puerto Plata', 
    'Jarabacoa', 'La Romana', 'Zona Colonial', 'Bávaro'
  ];

  const regions = [
    'Este', 'Distrito Nacional', 'Norte', 'Cibao', 'Sur'
  ];

  const propertyTypes = [
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Apartamento' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'house', label: 'Casa' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PropertyForm] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        location: formData.location,
        price: parseInt(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        type: formData.type as 'villa' | 'apartment' | 'penthouse' | 'house',
        description: formData.description,
        amenities: formData.amenities,
        region: formData.region,
        images: formData.images,
        featured: formData.featured,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat) || 18.7357,
          lng: parseFloat(formData.coordinates.lng) || -70.1627
        },
        is_sold: false
      };

      const { error } = await supabase
        .from('properties')
        .insert([propertyData]);

      if (error) throw error;

      navigate('/admin/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Error al agregar la propiedad. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-playfair text-3xl font-bold text-soft-charcoal">Agregar Nueva Propiedad</h1>
        <p className="text-dusty-clay mt-2">Completa todos los campos para publicar una nueva propiedad</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Título de la propiedad *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="Ej: Villa Serena Oceanfront"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Precio (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="2500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Ubicación *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              >
                <option value="">Seleccionar ubicación</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Región *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              >
                <option value="">Seleccionar región</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Tipo de propiedad *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              >
                <option value="">Seleccionar tipo</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-deep-copper focus:ring-deep-copper border-dusty-clay rounded"
              />
              <label className="ml-2 block text-sm text-soft-charcoal">
                Marcar como propiedad destacada
              </label>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">Detalles de la Propiedad</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Habitaciones *
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Baños *
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Área (m²) *
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-soft-charcoal mb-2">
              Descripción *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              placeholder="Describe la propiedad de manera atractiva..."
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
            <MapPin className="inline mr-2" size={20} />
            Coordenadas (Opcional)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Latitud
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.lat"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="18.7357"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-soft-charcoal mb-2">
                Longitud
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.lng"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
                placeholder="-70.1627"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">Amenidades</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              className="flex-1 px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              placeholder="Agregar amenidad..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-deep-copper text-white rounded-md hover:bg-accent-clay transition-colors duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cream text-soft-charcoal"
              >
                {amenity}
                <button
                  type="button"
                  onClick={() => removeAmenity(amenity)}
                  className="ml-2 text-dusty-clay hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal mb-4">
            <Upload className="inline mr-2" size={20} />
            Imágenes
          </h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="flex-1 px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
              placeholder="URL de la imagen..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-deep-copper text-white rounded-md hover:bg-accent-clay transition-colors duration-300"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="px-6 py-3 border border-dusty-clay text-dusty-clay rounded-md hover:bg-cream transition-colors duration-300"
          >
            Cancelar
          </button>
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
                Publicar Propiedad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;