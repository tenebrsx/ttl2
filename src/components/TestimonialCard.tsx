import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-deep-copper to-muted-olive transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <Quote size={32} className="text-deep-copper/20 mb-6" />
        
        <div className="flex items-center mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={20} className="text-deep-copper fill-current mr-1" />
          ))}
        </div>
        
        <p className="text-text-gray mb-8 italic text-lg leading-loose">
          "{testimonial.text}"
        </p>
        
        <div className="border-t border-dusty-clay/20 pt-6">
          <p className="font-playfair text-xl font-semibold text-soft-charcoal mb-1">{testimonial.name}</p>
          <p className="text-dusty-clay tracking-wide">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;