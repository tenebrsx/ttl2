import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/propiedades', label: 'Propiedades' },
    { path: '/mapa', label: 'Mapa' },
    { path: '/ubicaciones', label: 'Ubicaciones' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-dusty-clay/10' 
          : 'bg-transparent'
      }`}>
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center group">
              <span className={`font-playfair text-3xl font-bold transition-all duration-500 tracking-wide ${
                isScrolled ? 'text-soft-charcoal' : 'text-white text-shadow'
              } group-hover:text-deep-copper`}>
                Laura Alba
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-all duration-500 hover:text-deep-copper tracking-wide relative group ${
                    location.pathname === item.path
                      ? 'text-deep-copper'
                      : isScrolled
                      ? 'text-soft-charcoal'
                      : 'text-white text-shadow'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-deep-copper transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.path ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-all duration-500 p-2 rounded-lg ${
                isScrolled ? 'text-soft-charcoal hover:bg-deep-copper/10' : 'text-white text-shadow hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-dusty-clay/10">
            <div className="container-max section-padding py-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-4 font-medium transition-all duration-300 hover:text-deep-copper tracking-wide ${
                    location.pathname === item.path
                      ? 'text-deep-copper'
                      : 'text-soft-charcoal'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/18095551234"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-500 z-40 hover:scale-110 group"
      >
        <svg 
          className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690"/>
        </svg>
      </a>
    </>
  );
};

export default Navigation;