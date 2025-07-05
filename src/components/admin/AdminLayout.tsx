import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Building, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Agregar Propiedad', href: '/admin/add-property', icon: Plus },
    { name: 'Todas las Propiedades', href: '/admin/properties', icon: Building },
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-dusty-clay/20">
            <h2 className="font-playfair text-xl font-bold text-soft-charcoal">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-dusty-clay hover:text-deep-copper hover:bg-cream transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'bg-deep-copper text-white'
                      : 'text-dusty-clay hover:text-deep-copper hover:bg-cream'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white shadow-lg">
          <div className="flex items-center px-4 py-6 border-b border-dusty-clay/20">
            <h2 className="font-playfair text-xl font-bold text-soft-charcoal">Admin Panel</h2>
          </div>
          <nav className="mt-4 flex-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'bg-deep-copper text-white'
                      : 'text-dusty-clay hover:text-deep-copper hover:bg-cream'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-dusty-clay/20 p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-deep-copper rounded-full flex items-center justify-center mr-3">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-soft-charcoal">Admin</p>
                <p className="text-xs text-dusty-clay">{user?.username}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm text-dusty-clay hover:text-deep-copper hover:bg-cream rounded-md transition-colors duration-300"
            >
              <LogOut size={16} className="mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-dusty-clay/20">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-dusty-clay hover:text-deep-copper hover:bg-cream transition-colors duration-300"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-dusty-clay hover:text-deep-copper transition-colors duration-300"
              >
                Ver sitio web →
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;