import React, { useState, useEffect } from 'react';
import { Building, DollarSign, Eye, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  totalValue: number;
  recentProperties: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    totalValue: 0,
    recentProperties: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (properties) {
        const totalProperties = properties.length;
        const availableProperties = properties.filter(p => !p.is_sold).length;
        const soldProperties = properties.filter(p => p.is_sold).length;
        const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
        const recentProperties = properties.slice(0, 5);

        setStats({
          totalProperties,
          availableProperties,
          soldProperties,
          totalValue,
          recentProperties
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-copper"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-soft-charcoal">Dashboard</h1>
        <p className="text-dusty-clay mt-2">Resumen general de propiedades</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-deep-copper/10 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-deep-copper" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-dusty-clay">Total Propiedades</p>
              <p className="text-2xl font-bold text-soft-charcoal">{stats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-dusty-clay">Disponibles</p>
              <p className="text-2xl font-bold text-soft-charcoal">{stats.availableProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-dusty-clay">Vendidas</p>
              <p className="text-2xl font-bold text-soft-charcoal">{stats.soldProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-muted-olive/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-muted-olive" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-dusty-clay">Valor Total</p>
              <p className="text-2xl font-bold text-soft-charcoal">{formatPrice(stats.totalValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-dusty-clay/20">
          <h2 className="font-playfair text-xl font-bold text-soft-charcoal">Propiedades Recientes</h2>
        </div>
        <div className="p-6">
          {stats.recentProperties.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-dusty-clay mx-auto mb-4" />
              <p className="text-dusty-clay">No hay propiedades registradas</p>
              <p className="text-sm text-dusty-clay mt-2">
                Comienza agregando tu primera propiedad
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border border-dusty-clay/20 rounded-lg hover:bg-cream/50 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <img
                      src={property.images[0] || '/placeholder-property.jpg'}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-soft-charcoal">{property.title}</h3>
                      <div className="flex items-center text-sm text-dusty-clay mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{property.location}</span>
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(property.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-deep-copper">{formatPrice(property.price)}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      property.is_sold 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {property.is_sold ? 'Vendida' : 'Disponible'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;