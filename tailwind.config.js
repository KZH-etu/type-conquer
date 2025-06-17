/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'char-bounce': {
          '0%':   { transform: 'scale(1)' },
          '30%':  { transform: 'scale(1.4)' },
          '50%':  { transform: 'scale(0.95)' },
          '70%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'char-bounce': 'char-bounce 0.4s',
      },
    },
  },
  plugins: [],
}

