/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nature-inspired travel theme
        'soft-sand': '#FFF9F0',
        'natural-blue': '#3C8DAD',
        'gentle-olive': '#7D9773',
        'warm-orange': '#FFA552',
        'muted-blue': '#7BA7BC',
        'deep-charcoal': '#2B2B2B',
        'cool-gray': '#888888',
        
        // Color variations
        'natural-blue-light': '#5BA3C4',
        'natural-blue-dark': '#2A6B85',
        'warm-orange-light': '#FFB670',
        'warm-orange-dark': '#E6943A',
        'gentle-olive-light': '#94B088',
        'gentle-olive-dark': '#6A8260',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'warm': '0 8px 30px rgba(255, 165, 82, 0.15)',
        'blue': '0 8px 30px rgba(60, 141, 173, 0.15)',
      }
    },
  },
  plugins: [],
}