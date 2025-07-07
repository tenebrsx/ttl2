import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/propiedades", label: "Propiedades" },
    { path: "/mapa", label: "Mapa" },
    { path: "/ubicaciones", label: "Ubicaciones" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-dusty-clay/10 h-16 sm:h-20"
            : "bg-transparent h-20 sm:h-24"
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center group">
              <span
                className={`font-playfair text-2xl sm:text-3xl font-bold transition-all duration-500 tracking-wide ${
                  isScrolled ? "text-soft-charcoal" : "text-white text-shadow"
                } group-hover:text-deep-copper`}
              >
                Laura Alba
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium text-sm xl:text-base transition-all duration-500 hover:text-deep-copper tracking-wide relative group ${
                    location.pathname === item.path
                      ? "text-deep-copper"
                      : isScrolled
                        ? "text-soft-charcoal"
                        : "text-white text-shadow"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-deep-copper transition-all duration-300 group-hover:w-full ${
                      location.pathname === item.path ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden transition-all duration-500 p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isScrolled
                  ? "text-soft-charcoal hover:bg-deep-copper/10"
                  : "text-white text-shadow hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 top-16 sm:top-20 z-40 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`relative bg-white/95 backdrop-blur-md border-t border-dusty-clay/10 transform transition-transform duration-300 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="container-max section-padding py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-4 font-medium text-lg transition-all duration-300 hover:text-deep-copper tracking-wide min-h-[44px] ${
                    location.pathname === item.path
                      ? "text-deep-copper"
                      : "text-soft-charcoal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
