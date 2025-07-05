import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, ToggleLeft, ToggleRight, Plus, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  is_sold: boolean;
  featured: boolean;
  images: string[];
  created_at: string;
}

const AllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSoldStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_sold: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      setProperties(prev => 
        prev.map(prop => 
          prop.id === id ? { ...prop, is_sold: !currentStatus } : prop
        )
      );
    } catch (error) {
      console.error('Error updating property status:', error);
      alert('Error al actualizar el estado de la propiedad');
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProperties(prev => prev.filter(prop => prop.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error al eliminar la propiedad');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || property.type === filterType;
    const matchesStatus = filterStatus === '' || 
                         (filterStatus === 'available' && !property.is_sold) ||
                         (filterStatus === 'sold' && property.is_sold);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-copper"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-soft-charcoal">Todas las Propiedades</h1>
          <p className="text-dusty-clay mt-2">Gestiona todas las propiedades del sitio</p>
        </div>
        <Link
          to="/admin/add-property"
          className="btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Agregar Propiedad
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-dusty-clay" />
            <input
              type="text"
              placeholder="Buscar propiedades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
          >
            <option value="">Todos los tipos</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartamento</option>
            <option value="penthouse">Penthouse</option>
            <option value="house">Casa</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-dusty-clay rounded-md focus:outline-none focus:border-deep-copper transition-colors duration-300"
          >
            <option value="">Todos los estados</option>
            <option value="available">Disponible</option>
            <option value="sold">Vendida</option>
          </select>

          <div className="text-sm text-dusty-clay flex items-center">
            Mostrando {filteredProperties.length} de {properties.length} propiedades
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-dusty-clay mb-4">
              {properties.length === 0 ? 'No hay propiedades registradas' : 'No se encontraron propiedades'}
            </div>
            <Link to="/admin/add-property" className="btn-primary">
              <Plus size={20} className="mr-2" />
              Agregar Primera Propiedad
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dusty-clay/20">
              <thead className="bg-cream">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Propiedad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-soft-charcoal uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-dusty-clay/20">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-cream/50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={property.images[0] || '/placeholder-property.jpg'}
                          alt={property.title}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-soft-charcoal">
                            {property.title}
                          </div>
                          {property.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-deep-copper text-white">
                              Destacada
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dusty-clay">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-soft-charcoal">
                      {formatPrice(property.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dusty-clay capitalize">
                      {property.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.is_sold 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {property.is_sold ? 'Vendida' : 'Disponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dusty-clay">
                      {formatDate(property.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/propiedad/${property.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dusty-clay hover:text-deep-copper transition-colors duration-300"
                          title="Ver propiedad"
                        >
                          <Eye size={16} />
                        </Link>
                        
                        <button
                          onClick={() => toggleSoldStatus(property.id, property.is_sold)}
                          className={`transition-colors duration-300 ${
                            property.is_sold 
                              ? 'text-red-600 hover:text-red-800' 
                              : 'text-green-600 hover:text-green-800'
                          }`}
                          title={property.is_sold ? 'Marcar como disponible' : 'Marcar como vendida'}
                        >
                          {property.is_sold ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                        </button>
                        
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="text-red-600 hover:text-red-800 transition-colors duration-300"
                          title="Eliminar propiedad"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;