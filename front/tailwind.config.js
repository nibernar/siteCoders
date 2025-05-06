/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            dark: 'hsl(var(--primary-dark))',
            DEFAULT: 'hsl(var(--primary))',
            light: 'hsl(var(--primary-light))',
          },
          accent: {
            dark: 'hsl(var(--accent-dark))',
            DEFAULT: 'hsl(var(--accent))',
            light: 'hsl(var(--accent-light))',
          },
          text: {
            light: 'hsl(var(--text-light))',
            dark: 'hsl(var(--text-dark))',
          },
          background: {
            dark: 'hsl(var(--background-dark))',
            DEFAULT: 'hsl(var(--background))',
            light: 'hsl(var(--background-light))',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
          'scale-in': 'scaleIn 0.5s ease-out forwards',
          'slide-in-right': 'slideInRight 0.5s ease-out forwards',
          'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0)' },
            '100%': { transform: 'scale(1)' },
          },
          slideInRight: {
            '0%': { opacity: '0', transform: 'translateX(-50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          slideInLeft: {
            '0%': { opacity: '0', transform: 'translateX(50px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
        },
      },
    },
    plugins: [],
  };