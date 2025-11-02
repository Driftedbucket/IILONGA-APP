/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'iilonga-green': {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#2E7D32', // Main green
          600: '#2C6B2F',
          700: '#1B5E20',
          800: '#145017',
          900: '#0D3811',
        },
        'iilonga-blue': {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#1976D2', // Main blue
          600: '#1565C0',
          700: '#0D47A1',
          800: '#0A3A82',
          900: '#072E6B',
        },
        'iilonga-yellow': {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEB3B',
          500: '#F9A825', // Main yellow
          600: '#F57F17',
          700: '#F57C00',
          800: '#E65100',
          900: '#BF360C',
        },
        // Light mode backgrounds
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: {
            primary: '#1E293B',
            secondary: '#64748B',
            muted: '#94A3B8',
          }
        },
        // Dark mode backgrounds
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          text: {
            primary: '#F1F5F9',
            secondary: '#CBD5E1',
            muted: '#94A3B8',
          }
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'shake': 'shake 0.5s ease-out',
        'pulse-subtle': 'pulse 3s ease-in-out infinite',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
