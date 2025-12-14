/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'boba-pink': '#FFE5E8',
        'boba-cream': '#FFF8F0',
        'boba-rose': '#FFB3BA',
        'boba-dark': '#8B4A5C',
        'boba-brown': '#D4A574',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'confetti-fall': 'confetti-fall 2s ease-out forwards',
        'pearl-float': 'pearl-float 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'pearl-float': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.7' },
          '50%': { transform: 'translateY(-5px)', opacity: '0.9' },
        },
      },
      backgroundImage: {
        'notebook-lines': 'repeating-linear-gradient(transparent, transparent 31px, #e0e0e0 31px, #e0e0e0 32px)',
        'boba-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg opacity=\'0.1\'%3E%3Cpath d=\'M30 15 L35 25 L45 25 L38 32 L40 42 L30 37 L20 42 L22 32 L15 25 L25 25 Z\' fill=\'%23FFB3BA\'/%3E%3Ccircle cx=\'25\' cy=\'28\' r=\'2\' fill=\'%233C2413\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\' fill=\'%233C2413\'/%3E%3Ccircle cx=\'35\' cy=\'28\' r=\'2\' fill=\'%233C2413\'/%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}

