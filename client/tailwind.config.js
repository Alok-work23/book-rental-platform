/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Keyframes for the gradient animation
      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      // Animation utility that uses the keyframes
      animation: {
        'gradient-move': 'gradient-move 15s ease infinite',
      },
      // A larger background size for the gradient to move through
      backgroundSize: {
        '400%': '400% 400%',
      },
    },
  },
  // ADDED: A plugin to add 3D transform utilities
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.perspective': {
          'perspective': '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.rotate-y-180': {
          'transform': 'rotateY(180deg)',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      })
    }
  ],

  
};

