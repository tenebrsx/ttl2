import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
  showOnScroll?: boolean;
  scrollThreshold?: number;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '18095551234',
  message = 'Hola Laura! Me interesa conocer más sobre las propiedades disponibles. ¿Podrías ayudarme?',
  position = 'bottom-right',
  showOnScroll = true,
  scrollThreshold = 300
}) => {
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, scrollThreshold]);

  const handleClick = () => {
    if (isExpanded) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      setIsExpanded(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 font-karla`}>
      {/* Expanded Chat Bubble */}
      <div
        className={`mb-4 transform transition-all duration-300 ease-out ${
          isExpanded
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-sm border border-gray-100">
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Laura's info */}
          <div className="flex items-center mb-3">
            <img
              src="/image.png"
              alt="Laura Alba"
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-bold text-soft-charcoal text-sm">Laura Alba</p>
              <p className="text-xs text-gray-500">Agente inmobiliario</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">En línea</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              ¡Hola! 👋 Soy Laura Alba. ¿Te interesa alguna propiedad? Estoy aquí para ayudarte a encontrar tu hogar perfecto.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={handleClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <MessageCircle size={18} className="mr-2" />
            Escribir por WhatsApp
          </button>
        </div>

        {/* Speech bubble tail */}
        <div className="relative">
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45"></div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className={`bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isAnimating ? 'animate-pulse' : 'hover:scale-110'
        } ${isExpanded ? 'w-14 h-14' : 'w-16 h-16'}`}
        aria-label="Chat por WhatsApp"
      >
        <MessageCircle
          size={isExpanded ? 24 : 28}
          className="transition-all duration-300"
        />

        {/* Pulse animation rings */}
        {!isExpanded && (
          <>
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 animation-delay-150"></div>
          </>
        )}

        {/* Notification badge */}
        {!isExpanded && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            1
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
