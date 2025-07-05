/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': '#F6F5F3',
        'soft-charcoal': '#3A3A3A',
        'muted-olive': '#8B956D',
        'deep-copper': '#A87449',
        'accent-clay': '#B5694F',
        'dusty-clay': '#B8A082',
        'sage': '#9CAF88',
        'cream': '#F9F7F4',
        'text-gray': '#888B91',
        'olive-gray': '#A6A49C',
        'deep-slate': '#2B2B2B',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'karla': ['Karla', 'system-ui', 'sans-serif'],
        'sans': ['Karla', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      lineHeight: {
        'relaxed': '1.6',
        'loose': '1.8',
      },
      letterSpacing: {
        'wider': '0.05em',
        'widest': '0.1em',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};