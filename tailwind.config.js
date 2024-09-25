// tailwind.config.js

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Blue 600
          dark: '#1E40AF',    // Blue 800
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald 500
          dark: '#065F46',    // Emerald 800
        },
        background: '#1F2937', // Gray 800
      },
    },
  },
  plugins: [],
};
